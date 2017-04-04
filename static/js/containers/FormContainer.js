/**
 * Created by ko on 21.03.17.
 */
import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import SingleInput from '../components/SingleInput';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Websocket from 'react-websocket';
import data from '../fake_db.json';

class FormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
      boxLength: '',
      boxWidth: '',
      boxHeight: '',
      cardboardOptions: [],
      barrierOptions: [],
      fefcoOptions: [],
      linerOptions: [],
      printOptions: [],
      laminatOptions: [],
      quantity: '50',
      cardboardSelection: '',
      barrierSelection: '',
      fefcoSelection: '',
      linerSelection: '',
      printSelection: '',
      laminatSelection: ''
		};

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleBoxLengthChange = this.handleBoxLengthChange.bind(this);
    this.handleBoxWidthChange = this.handleBoxWidthChange.bind(this);
    this.handleBoxHeightChange = this.handleBoxHeightChange.bind(this);
		this.handleCardboardSelect = this.handleCardboardSelect.bind(this);
		this.handleBarrierSelect = this.handleBarrierSelect.bind(this);
		this.handleFefcoSelect = this.handleFefcoSelect.bind(this);
		this.handleLinerSelect = this.handleLinerSelect.bind(this);
    this.handlePrintSelect = this.handlePrintSelect.bind(this);
    this.handleLaminatSelect = this.handleLaminatSelect.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);


	}

	componentDidMount() {
				this.setState({
          boxLength: data.boxLength,
          boxWidth: data.boxWidth,
          boxHeight: data.boxHeight,
          cardboardOptions: data.cardboardOptions,
          //cardboardSelection: '',
          barrierOptions: data.barrierOptions,
          //barrierSelection: '',
          fefcoOptions: data.fefcoOptions,
         // fefcoSelection: '',
          linerOptions: data.linerOptions,
         // linerSelection: '',
          printOptions: data.printOptions,
         // printSelection: '',
          laminatOptions: data.laminatOptions,
         // laminatSelection: '',
          quantity: '50'
				});
			};

  handleData(data) {
    //receives messages from the connected websocket
    let result = JSON.parse(data);
    if (result.job_status == 'completed')
    this.setState({calculation: result.job_result})
    console.log("Received message data  ", result);
  }

  sendSocketMessage(message){
    // sends message to channels back-end
    const socket = this.refs.socket;
    socket.state.ws.send(JSON.stringify(message));
    console.log('Send this in a POST request:', message);
  }

	handleBoxLengthChange(e) {
		this.setState({ boxLength: e.target.value }, () => console.log('boxLength: ', this.state.boxLength));
	}
	handleBoxWidthChange(e) {
    this.setState({ boxWidth: e.target.value }, () => console.log('boxWidth: ', this.state.boxWidth));
  }
  handleBoxHeightChange(e) {
    this.setState({boxHeight: e.target.value}, () => console.log('boxHeight: ', this.state.boxHeight));
  }
	handleQuantityChange(e) {
		this.setState({ quantity: e.target.value }, () => console.log('quantity ', this.state.quantity));
	}

	handleCardboardSelect(e) {
		this.setState({ cardboardSelection: e.target.value }, () => console.log('cardboard ', this.state.cardboardSelection));
	}

	handleBarrierSelect(e) {
    this.setState({barrierSelection: e.target.value }, () => console.log('barrier: ', this.state.barrierSelection));
  }

  handleFefcoSelect(e) {
    this.setState({ fefcoSelection: e.target.value}, () => console.log('fefco: ', this.state.fefcoSelection));
  }

  handleLinerSelect(e) {
    this.setState({linerSelection: e.target.value }, () => console.log('linear: ', this.state.linerSelection));
  }

  handlePrintSelect(e) {
    this.setState({printSelection: e.target.value }, () => console.log('print: ', this.state.printSelection));
  }

  handleLaminatSelect(e) {
    this.setState({laminatSelection: e.target.value}, () => console.log('laminat: ', this.state.laminatSelection));
  }

	handlePetSelection(e) {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.selectedPets.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.selectedPets.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.selectedPets, newSelection];
		}
		this.setState({ selectedPets: newSelectionArray }, () => console.log('pet selection', this.state.selectedPets));
	}
	handleSiblingsSelection(e) {
		this.setState({ siblingSelection: [e.target.value] }, () => console.log('siblingz', this.state.siblingSelection));
	}
	handleDescriptionChange(e) {
		// const textArray = e.target.value.split('').filter(x => x !== 'e');
		// console.log('string split into array of letters',textArray);
		// const filteredText = textArray.join('');
		// this.setState({ description: filteredText }, () => console.log('description', this.state.description));
		this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
	}
	handleClearForm(e) {
		e.preventDefault();
		this.setState({
      boxLength: 0,
      boxWidth: 0,
      boxHeight: 0,
      cardboardSelection: '',
      barrierSelection: '',
      fefcoSelection: '',
      linerSelection: '',
      printSelection: '',
      laminatSelection: '',
      quantity: '50'
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();

		const formPayload = {
      boxLength: this.state.boxLength,
      boxWidth: this.state.boxWidth,
      boxHeight: this.state.boxHeight,
      quantity: this.state.quantity,
      cardboardSelection: this.state.cardboardSelection,
      barrierSelection: this.state.barrierSelection,
      fefcoSelection: this.state.fefcoSelection,
      linerSelection: this.state.linerSelection,
      printSelection: this.state.printSelection,
      laminatSelection: this.state.laminatSelection
    };

    let msg = { action: "start_sec3",
                formPayLoad: formPayload
    };

    this.sendSocketMessage(msg);
		//console.log('Send this in a POST request:', formPayload);
		//this.handleClearForm(e);
	}

	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h3>FEFCO Calculator</h3>
        <Websocket ref="socket" url={this.props.socket} onMessage={this.handleData.bind(this)}/>
        <Select
					name={'fefcoType'}
					placeholder={'Wybierz rodzaj pudełka'}
					controlFunc={this.handleFefcoSelect}
					options={this.state.fefcoOptions}
					selectedOption={this.state.fefcoSelection} />
        <SingleInput
					inputType={'number'}
					title={'Długość pudełka'}
					name={'boxLength'}
					controlFunc={this.handleBoxLengthChange}
					content={this.state.boxLength}
					placeholder={''} />
        <SingleInput
					inputType={'number'}
					title={'Szerokość pudełka'}
					name={'boxWidth'}
					controlFunc={this.handleBoxWidthChange}
					content={this.state.boxWidth}
					placeholder={''} />
        <SingleInput
					inputType={'number'}
					title={'Wysokość pudełka'}
					name={'boxHeight'}
					controlFunc={this.handleBoxHeightChange}
					content={this.state.boxHeight}
					placeholder={''} />
				<Select
					name={'cardboardType'}
					placeholder={'Wybierz rodzaj mikrofali'}
					controlFunc={this.handleCardboardSelect}
					options={this.state.cardboardOptions}
					selectedOption={this.state.cardboardSelection} />
        <Select
					name={'barrierType'}
					placeholder={'Wybierz rodzaj bariery'}
					controlFunc={this.handleBarrierSelect}
					options={this.state.barrierOptions}
					selectedOption={this.state.barrierSelection} />
        <Select
					name={'linerType'}
					placeholder={'Wybierz rodzaj linera'}
					controlFunc={this.handleLinerSelect}
					options={this.state.linerOptions}
					selectedOption={this.state.linerSelection} />
        <Select
					name={'printType'}
					placeholder={'Wybierz rodzaj druku'}
					controlFunc={this.handlePrintSelect}
					options={this.state.printOptions}
					selectedOption={this.state.printSelection} />
        <Select
					name={'laminatType'}
					placeholder={'Wybierz uszlachetnienie linera'}
					controlFunc={this.handleLaminatSelect}
					options={this.state.laminatOptions}
					selectedOption={this.state.laminatSelection} />
				<SingleInput
					inputType={'number'}
					title={'Nakład'}
					name={'quantity'}
					controlFunc={this.handleQuantityChange}
					content={this.state.quantity}
					placeholder={'Enter number of boxes'} />

          Koszt: {this.state.calculation}<br/>
				<input
					type="submit"
					className="btn btn-primary float-right"
					value="Submit"/>
				<button
					className="btn btn-link float-left"
					onClick={this.handleClearForm}>Wyczyść kalkulator</button>
			</form>

		);
	}
}

export default FormContainer;
