import React, { PureComponent } from "react";
import { Router, Route, Switch } from "react-router";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MapContainer from "../MapComponentv2";
import TransactionList from "./TransactionList";
import { Col, Row } from "reactstrap";
import "../../App.css";
import { flexbox } from "@material-ui/system";
import {ProfileViewGetAllUsersResponse, GetAllTransactionsResponse, GetAllTransactionsRequest} from '../../proto/apis_pb';

// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
Date.dateDiff = function(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();	
    var diff = todate.getTime() - fromdate.getTime();	
    var divideBy = { w:604800000, 
                    d:86400000, 
                    h:3600000, 
                    n:60000, 
                    s:1000 };	
    
    return (diff/divideBy[datepart]).toFixed(3);
}

var whoWhatEnum = {
    PERSON : 0,
    QUESTION_ANSWER: 1,
}

class TransactionsContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        transactionDataDictionary: [],
        transactions: [],
        userDataDictionary: [],
        users: [],
        };
    }

    getAllTransactions(){
        return new GetAllTransactionsRequest();
    }

    fetchUsers() {
        console.log("in fetch users")
        fetch("https://zoro.ourspace.dev/profile_view/get_all_users", {
            method: "post",
            headers: {
                'Authorization': "Bearer " + process.env.REACT_APP_ZORO_KEY
            },
            //body: not necessary because this doesn't take in a response.
        })
            .then(res => {
                return res.arrayBuffer()//need return unless only one line in curly brackets
            })
            .then(buf => {
                return ProfileViewGetAllUsersResponse.deserializeBinary(buf)
            })
            .then(response => {
                return response.getUsersList()
            })
            .then(UsersList => {//list of ProfileViewGetUserResponse
                UsersList.map(user=>{
                    let x = user.getUser()
                    this.state.userDataDictionary.push({
                        userId: x.getUserId(),
                        firstName: x.getFirstName(),
                        lastName: x.getLastName(),
                    })
                })
                console.log(this.state.userDataDictionary)
                this.setState({ users: UsersList });
            });
    }

    convertToEpoch(time_buffer){
            var timeUpdated = new Intl.DateTimeFormat('en-US', {
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',}
                ).format(time_buffer)
        return timeUpdated;
    };

    setTimeAgo(time_buffer){
        var today = new Date()
        var timeUpdated = this.convertToEpoch(time_buffer)
        var updatedAgo = Date.dateDiff('h', timeUpdated, today)
        return updatedAgo + " hours ago";   
    };

    setTransactionType(type_buffer){
        if (type_buffer == 1){
            return "Answered Question";
        }
        else if(type_buffer == 0){
            return "Asked Question";
        }
    };

    setTransactionStatus(status_buffer){
        if(status_buffer == 0){
            return "APPROVED"
        }
        else if(status_buffer == 1){
            return "UNDER REVIEW"
        }
        else{
            return "CANCELLED"
        }
    };

    findUser(rowData){
        let x = this.state.users.find((element)=>{
            return (element.getUser().getUserId() == rowData.userId)
        })
    }
    

    findWhoAndWhat(type_buffer, subject_buffer, initiator_buffer, which_one){
        var ret = ''
        switch(which_one){
            case whoWhatEnum.PERSON:
                if(type_buffer == 0){
                    return initiator_buffer
                }
                else if (type_buffer == 1){
                    return subject_buffer;
                }
                break;
            case whoWhatEnum.QUESTION_ANSWER:
                if(type_buffer == 0){
                    return subject_buffer
                }
                else if (type_buffer == 1){
                    return initiator_buffer;
                }
                break;
        }
    }

    

    mapTransactionsToState(transaction_list){
        transaction_list.map(transaction=>{//TransactionsList.map(transaction=>{
            
            this.state.transactionDataDictionary.push({
                id: transaction.getId(),
                status: this.setTransactionStatus(transaction.getStatus()),
                
                
                 
                transactionType: this.setTransactionType(transaction.getType()), 

                person: this.findWhoAndWhat(transaction.getType(), transaction.getSubject(), transaction.getInitiator(), whoWhatEnum.PERSON),
                
                timeUpdated: this.convertToEpoch(transaction.getTimeUpdated()),
                question_answer: this.findWhoAndWhat(transaction.getType(), transaction.getSubject(), transaction.getInitiator(), whoWhatEnum.QUESTION_ANSWER),
                
            })
        })
        this.setState({transactions: transaction_list}) //this.setState({transactions: TransactionsList})
    };

    fetchTransactions() {
        fetch( "https://zoro.ourspace.dev/admin/get_all_transactions", {
            method: 'post',
            headers: {
                Authorization: "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
            },
            body: this.getAllTransactions()
           
        })
        .then(res => {
            return res.arrayBuffer()}//need return unless only one line in curly brackets
        )
        .then(buf => {
            console.log(buf) 
            if(buf == null){
               throw new Error("buffer received was null");
            }
        
    
            return GetAllTransactionsResponse.deserializeBinary(buf)}
        )
        .then(response => {
            return response.getTransactionsList()
        })
        .then(TransactionsList => {//list of ProfileViewGetUserResponse
            
            this.mapTransactionsToState(TransactionsList)
 
            console.log(this.state.transactionDataDictionary)
            //console.log(TransactionsList)
            
        });
    }

    componentDidMount(){
        console.log("component mounted")
        //this.fetchUsers();
        this.fetchTransactions();
    }

    render() {
        return (
        <div style={{height: "100vh",}}>
            {/* <Col style={{ height: "92vh" }} xs={6}>
            {" "}
            <MapContainer spaceData={[]} QList={[]} />{" "}
            </Col> */}

            <div style={{ height: "92vh",fontFamily: "Roboto", fontSize: "13px", overflow: "scroll"}} >
                <TransactionList data = {this.state.transactionDataDictionary}/>
            </div>

        </div>
        );
    }
}

export default TransactionsContainer;
