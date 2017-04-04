from __future__ import absolute_import
import time
import datetime
import json
import logging
from pudla.celery import app
from .models import Job
from channels import Channel
import random
from subprocess import Popen, PIPE


log = logging.getLogger(__name__)


@app.task
def sec3(job_id, reply_channel):
    # time sleep represent some long running process
    time.sleep(random.randint(1, 10))
    # Load job data from database
    job = Job.objects.get(pk=job_id)
    data = job.data
    log.info("Running job_name=%s", job.id)
    args = [
        'gnome-calculator',
        #'-s', '2 * 55,5'
        '-s', data.get('boxLength') + '*' + data.get('boxHeight'),
    ]
    p = Popen(args, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    (out, err) = p.communicate('')
    value = out.decode()
    log.info("output ", value)
    job.result = value
    job.status = "completed"
    job.completed = datetime.datetime.now()
    job.save()

    # Send status update back to browser client
    if reply_channel is not None:
        Channel(reply_channel).send({
            "text": json.dumps({
                "action": "completed",
                "job_id": job.id,
                "job_result": job.result,
                "job_status": job.status,
            })
        })
