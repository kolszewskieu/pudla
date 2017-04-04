import json
import logging
from channels import Channel
from channels.sessions import channel_session
from .models import Job
from .tasks import sec3
from pudla.celery import app

log = logging.getLogger(__name__)


@channel_session
def ws_connect(message):
    message.reply_channel.send({
        "text": json.dumps({
            "action": "reply_channel",
            "reply_channel": message.reply_channel.name,
        })
    })


@channel_session
def ws_receive(message):
    try:
        data = json.loads(message['text'])
    except ValueError:
        log.debug("ws message isn't json text=%s", message['text'])
        return

    if data:
        reply_channel = message.reply_channel.name
        if data['action'] == "start_sec3":
            start_sec3(data, reply_channel)


def start_sec3(data, reply_channel):
    job = Job(
        data=data['formPayLoad'],
        status="started",
    )
    job.save()
    log.info("job Name=%s", data)
    # Start long running Celery task
    sec3_task = sec3.delay(job.id, reply_channel)

    # Store the celery task id into the database if we wanted to
    # do things like cancel the task in the future
    job.celery_id = sec3_task.id
    job.save()

    # Tell client task has been started
    Channel(reply_channel).send({
        "text": json.dumps({
            "action": "started",
            "job_id": job.id,
            "job_data": job.data,
            "job_status": job.status,
        })
    })
