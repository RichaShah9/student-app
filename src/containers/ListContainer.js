import React, {Component} from 'react';
import {ListGroupItem,ListGroup,Panel, Button, ButtonToolbar} from 'react-bootstrap';

import { hobbies } from './FormContainer';

export default class ListContainer extends Component{

    render(){
        const {studentInfo} = this.props;
		let $imagePreview = null;
        
        const listgroupInstance = (          
            studentInfo.map((studentInfo, index) => (
                <div key={index} className="row">
                    <Panel  header="STUDENT DATA" bsStyle="primary">
                        {
                            {$imagePreview} = (<img src={studentInfo.formPayload.imagePreviewUrl} alt="not available" />)
                        }
                        {$imagePreview}
                        <ListGroup>
                            <ListGroupItem header="Student Name">{studentInfo.formPayload.studentName}</ListGroupItem>
                            <ListGroupItem header="Email Address" href="#">{studentInfo.formPayload.emailAddress}</ListGroupItem>
                            <ListGroupItem header="Hobbies" >{
                                studentInfo.formPayload.selectedHobbies.map(hid => (
                                <li key={hid}>{hobbies[hid]}</li>
                                ))}
                            </ListGroupItem>
                            <ListGroupItem header="Gender" >{studentInfo.formPayload.selectedGender}</ListGroupItem>
                            <ListGroupItem header="Address" >{studentInfo.formPayload.address}</ListGroupItem>
                            <ListGroupItem header="Country" >{studentInfo.formPayload.selectedCountry}</ListGroupItem>
                        </ListGroup>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={() => {this.props.onDelete(studentInfo.formPayload.id)}}> Remove </Button>
                            <Button bsStyle="primary" onClick={() => {this.props.onUpdate(studentInfo.formPayload.id)}}> Update </Button>
                        </ButtonToolbar>
                    </Panel>
                </div>
            ))
        );
        return(
            <div>
                {listgroupInstance}
            </div>
        );
    }
}