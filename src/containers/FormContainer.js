import React, {Component} from 'react';
import FieldGroup from '../components/FieldGroup';
import { Button, ButtonToolbar, FormControl, FormGroup,ControlLabel,Checkbox,ToggleButton,ToggleButtonGroup,HelpBlock, Panel } from 'react-bootstrap';
import ListContainer from './ListContainer';

export const hobbies = ['Art and Craft','Games','Singing','Dancing'];

class FormContainer extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id : 1,
			counter:2,
			studentName: '',
			emailAddress: '',
			hobbies: ['Art and Craft','Games','Singing','Dancing'],
			selectedHobbies: [],
			selectedGender:'',
			address: '',
			selectedCountry:'',
			form:{},
			file: '',
			imagePreviewUrl: '',
			items:[]
		};
		this._handleImageChange = this._handleImageChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
  }
    handleClearForm(e) {
		e.preventDefault();
		this.setState({
			studentName: '',
			emailAddress: '',
			selectedHobbies: [],
			selectedGender: '',
			address: '',
			selectedCountry:'',
		});
		this.inputPhoto.value = '';
	}
	
	handleFormSubmit(e) {
		e.preventDefault();

		this.setState((prevState, props) => {
			return { counter: prevState.counter + 1 }
		  });
		this.setState({id : this.state.counter});

		if(this.state.studentName.length < 5){
			alert('Name must have more than 4 characters')
		}
		else if(this.state.studentName === this.state.emailAddress){
			alert("Name and Email id can't be same");
		}
		else
		{
			const formPayload = {
				id:this.state.id,
				studentName: this.state.studentName,
				emailAddress: this.state.emailAddress,
				address: this.state.address,
				selectedHobbies: this.state.selectedHobbies,
				selectedGender: this.state.selectedGender,
				selectedCountry: this.state.selectedCountry,
				imagePreviewUrl: this.state.imagePreviewUrl,
			};	
	
			console.log('Student Details:', formPayload);
			this.setState({
				form:formPayload
			})
	
			const { items } = this.state;
			items.push({formPayload});
			this.setState((prevState, props) => {
				return { items };
			})
			console.log('items: ',items);
	
			this.handleClearForm(e);	
		}
	}	

	getValidationState() {
		const length = this.state.studentName.length;
		if (length > 6) return 'success';
		else if (length > 4) return 'warning';
		else if (length > 0) return 'error';
		return null;
		}
	
	getValidation(){
		if(this.state.emailAddress.length > 0){
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailAddress))  
			{  
				return 'success'; 
			} 
			else return 'error'; 	
		}
	}

	handleHobbie(id) {
		const { selectedHobbies } = this.state;
		const target = selectedHobbies.findIndex(h => h === id);
		if (target === -1) {
			selectedHobbies.push(id);
		} else {
			selectedHobbies.splice(target, 1);
		}
		this.setState({ selectedHobbies });
	}

	getHobbie(id) {
		const { selectedHobbies } = this.state;
		const findIndex = selectedHobbies.findIndex(h => h === id);
		if (findIndex !== -1) {
			return true;
		}
		return false;
	}

	handleGender = (value) => {
		console.log(value);
		this.setState({selectedGender : value})
	}

	getSelectedCountry(e){
		console.log('[getSelectedCountry]', this.inputEl.value )
		this.setState({ selectedCountry: this.inputEl.value });
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
		this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}
		reader.readAsDataURL(file)
	}

	render(){
		const wellStyles = { maxWidth: 200, margin: '0 auto 10px' };
		const onChange = (e) => {
			this.setState({ [e.target.name]: e.target.value });
			console.log('name:' , this.state)
		};

		const formInstance = (
			<form onSubmit={this.handleFormSubmit}>
			  
				<FormGroup
					controlId="formStudentName"
					validationState={this.getValidationState()}>
				<ControlLabel>Full Name</ControlLabel>
				<FormControl
					id="formStudentName"
					type="text"
					name="studentName"
					placeholder="Enter first name and last name"
					value={this.state.studentName}
					onChange={(e) => onChange(e)} 
					required="true" />
				<FormControl.Feedback />
          		<HelpBlock>Name must be minimum 4 characters.</HelpBlock>
        		</FormGroup>

				<FormGroup
					controlId="formEmail"
					validationState={this.getValidation()}>
          		<ControlLabel>Email Address</ControlLabel>
          		<FormControl
					type="email"
					placeholder="Enter email" 
					name="emailAddress"
					value={this.state.emailAddress}
					onChange={(e) => onChange(e)} />
 	            <FormControl.Feedback />
        		</FormGroup>

				<FieldGroup
					id="formControlsFile"
					type="file"
					label="Photo"
					help="Upload jpg, png format only."
					inputRef={ el => this.inputPhoto=el }
					onChange={this._handleImageChange} />
					
			  	<FormGroup>
				<ControlLabel>Hobbies : </ControlLabel>
					{
						this.state.hobbies.map((hobbie, index) => (
							<Checkbox key={index} inline checked={this.getHobbie(index)} onChange={(e) => this.handleHobbie(index,e)}>				  
								{hobbie}
							</Checkbox>				
						))
					}
				</FormGroup>

				<FormGroup>
					<ControlLabel>Gender : </ControlLabel>
					<ToggleButtonGroup
						type="radio"
						name="selectedGender"
						value={this.state.value}
						onChange={this.handleGender}>
						<ToggleButton value='Male'>Male</ToggleButton>
						<ToggleButton value='Female'>Female</ToggleButton>
					</ToggleButtonGroup>
				</FormGroup>

			  	<FormGroup controlId="formControlsTextarea" rows="5">
					<ControlLabel>Address</ControlLabel>
					<FormControl componentClass="textarea" 
					placeholder="Permanent Address" 
					name="address"
					onChange={(e) => onChange(e)} 
					value={this.state.address}/>
			  	</FormGroup>
		  ​
				<FormGroup controlId="formControlsSelect">
				<ControlLabel>Country</ControlLabel>
				<FormControl componentClass="select" 
					placeholder="country" 
					name="selectedCountry" 
					value={this.state.selectedCountry}
					onChange={this.getSelectedCountry.bind(this)}
					inputRef={ el => this.inputEl=el }>
						<option value="">Select</option>
						<option value="India">India</option>
						<option value="France">France</option>
						<option value="United States">United States</option>
						<option value="Canada">Canada</option>
				</FormControl>
			  	</FormGroup>
			  		  ​	  ​
			  	<FormGroup>
				<ControlLabel>Contact Us</ControlLabel>
				<FormControl.Static>
					children.foundation@gmail.com
				</FormControl.Static>
			  	</FormGroup>
		  ​
				<FormGroup>									
		   		<ButtonToolbar style={wellStyles}>
			 		<Button bsStyle="primary" type="submit"> Submit </Button>
					<Button bsStyle="primary"
						onClick={this.handleClearForm}>Clear form</Button>
				</ButtonToolbar>
				</FormGroup>
			</form>
		);
		
		const { form } = this.state;
		
		return (
			<div>
				<div>
					<Panel header='Student Admission Form'>
						{formInstance}
					</Panel>
				</div>
				{
					Object.keys(form).length > 0 &&
						<ListContainer studentInfo={this.state.items}
							onDelete={(id) => {              
								const { items } = this.state;
								const target = items.findIndex(e => e.id === id);
								items.splice(target, 1);
								this.setState((prevState, props) => {
								return { items };
							})}}
							onUpdate={(id) => {              
								const { items } = this.state;
								const target = items.findIndex(e => e.id === id);
								document.getElementById('formStudentName').value=this.state.studentName ; 
								this.setState((prevState, props) => {
								return { items };
							})}}			
					/>
				}
			</div>		
		);
    }
}
export default FormContainer;
