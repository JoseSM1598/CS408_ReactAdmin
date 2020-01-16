import React, { Component } from "react";
import Questions from "./Questions";
import { CardColumns, Table } from "reactstrap";

class QuestionList extends Component {
    render(){
        return(

            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Photo</th>
                        <th>Space</th>
                        <th>Question</th>
                        <th>Time</th>
                        <th>Modify?</th>
                    </tr>

                </thead>
                <tbody>
                        {this.props.QList.map((item => {
                            return <Questions user={item.getUser()}
                                              question={item.getQuestion()}
                                              space={item.getSpace()}/>
                        }))
                    }

                </tbody>
            </Table>


        )
    }
}

export default QuestionList;

{/*<CardColumns style = {{marginLeft: "100px", marginRight: "100px", marginTop: "30px"}}>*/}
{/*    {*/}

{/*        this.props.QList.map((item => {*/}
{/*            return <Questions user={item.getUser()}*/}
{/*                              question={item.getQuestion()}*/}
{/*                              space = {item.getSpace()}/>*/}
{/*        }))*/}
{/*    }*/}
{/*</CardColumns>*/}