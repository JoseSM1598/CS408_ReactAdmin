import React, { useState } from 'react';
import {Button, Modal, ModalBody, Form, ModalHeader, Input, FormGroup, Label} from "reactstrap";
import * as apis from '../../proto/apis_pb'
const {AnswerCustomQuestionRequest, AnswerCustomQuestionResponse} = apis;


const imgStyle = {
    height: '47px',
    width: '47px',
};


const Questions = ({user, question, space}) => {

    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        //setCloseAll(false);
    };

    const makeAnswerRequest = () => {
        console.log(question.getCustomQuestionId());
        console.log(space.getSpaceId());
        console.log(user.getUserId());
        console.log(typeof inputValue);
        const req = new AnswerCustomQuestionRequest();
        req.setUserId("glCu19fzIvXsEMoL2L4A");
        req.setCustomQuestionId(question.getCustomQuestionId());
        //req.setSpaceId(space.getSpaceId());
        req.setAnswer(inputValue);
        return req;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        fetch('https://zoro.ourspace.dev/common/answer_custom', {
            method: 'post',
            headers: {
                'Authorization': "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
            },
            body: makeAnswerRequest().serializeBinary(),
        }).then(res => res.arrayBuffer())
            .then(buf => AnswerCustomQuestionResponse.deserializeBinary(buf))
            .then(response => console.log(response));
    };

    const handleOnChange = (data) => {
        setInputValue(data);
    };

    return <tr>
            <th scope = "row"> {user.getFirstName()}</th>
            <td><img src={user.getPhotoUrl()} style={imgStyle}/></td>
            <td>{space.getName()}</td>
            <td>{question.getQuestionText()}</td>
            <td>{new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',}
                    ).format(question.getCreatedAt())}</td>
            <td><Button onClick={toggle}>Manage</Button></td>

        {/*Define Modal */}
        <Modal isOpen={modal} toggle={toggle} style = {{width:"350px"}}>
            <ModalHeader toggle={toggle}>What do you want to do?</ModalHeader>
            <ModalBody>
                <div> Answer Question <Button color="success" onClick={toggleNested}> Answer</Button></div>
                <br/>
                {/*<div> Delete Question <Button color="danger"> Delete</Button></div>*/}
                <Modal isOpen={nestedModal} toggle={toggleNested}>
                    <Form onSubmit={onFormSubmit}>
                        <FormGroup>
                            <Label for="questionAnswer">Your Answer</Label>
                            <Input onChange= {(e) => handleOnChange(`${e.target.value}`)} type="textarea" name="answer" id = "questionAnswer"/>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Modal>
            </ModalBody>
        </Modal>
    </tr>

};

{/*<Card style={{width: '10.5rem', fontSize: "13px"}}>*/}
{/*    <CardBody>*/}
{/*        /!*<Card.Title><FaUser/> {name} </Card.Title>*!/*/}
{/*        <CardTitle> <img src={user.getPhotoUrl()} style={imgStyle}/> {user.getFirstName()}</CardTitle>*/}
{/*        <CardText>*/}
{/*            {question.getQuestionText()}*/}
{/*        </CardText>*/}
{/*        <hr/>*/}
{/*        <CardText>Space: {space.getName()}</CardText>*/}
{/*        <hr/>*/}
{/*        <CardText>Created at: {new Intl.DateTimeFormat('en-US', {*/}
{/*            year: 'numeric',*/}
{/*            month: '2-digit',*/}
{/*            day: '2-digit',*/}
{/*            hour: '2-digit',*/}
{/*            minute: '2-digit',*/}
{/*            second: '2-digit'*/}
{/*        }).format(question.getCreatedAt())}</CardText>*/}
{/*        <Button onClick={toggle}>Manage</Button>*/}
{/*    </CardBody>*/}
{/*</Card>*/}
export default Questions