import React from 'react'
import {ProfileViewGetAllUsersResponse,
        ProfileViewGetUserResponse,
        GetAllQuestionsResponse,
        GetAllAnswersResponse,
        GetAllAnswersRequest,
        GetAllQuestionsRequest,
        } from '../../proto/apis_pb'
import createHistory from 'history/createBrowserHistory'
import Grid from '@material-ui/core/Grid';
import UsersTableView from './UsersTableView'
import UserProfileView from './UserProfileView'

const history = createHistory()

class UsersContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            users : [], //list of users to be displayed on right side
            currentProfile : null, // holds value of user profile to be displayed on left.
            userDataDictionary: [], //data for table on right
            questions: [], //stores all questions
            answers: [] //stores all answers
        };
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.fetchAnswers = this.fetchAnswers.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    //changes profile view to appropriate user when clicking on an element of the table
    handleListClick(event, rowData){
        //find returns value of first element in provided array that satisfies provided testing function
        let x = this.state.users.find((element)=>{
            return (element.getUser().getUserId() == rowData.userId)
        })
        this.setState({currentProfile: x})
    }
    
    fetchQuestions(){
        fetch("https://zoro.ourspace.dev/admin/get_all_questions",{
            method: "post",
            headers: {
                'Authorization': "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
            },
        })
            .then(res =>res.arrayBuffer())
            .then(buf =>GetAllQuestionsResponse.deserializeBinary(buf))
            .then(response =>response.getCustomquestionsList())
            .then(QuestionsList=>{
                console.log(QuestionsList)
                this.setState({questions: QuestionsList})
            })
    }
    fetchAnswers(){
        fetch("https://zoro.ourspace.dev/admin/get_all_answers",{
            method: "post",
            headers: {
                'Authorization': "Bearer 5401aa1394c126b762f691cf0f2d0cf6"
            },
            body: new GetAllAnswersRequest()
        })
            .then(res => {
                return res.arrayBuffer();
            })
            .then(buf =>{
                return GetAllAnswersResponse.deserializeBinary(buf)
            })
            .then(response=>{
                return response.getAnswersList()
            })
            .then(AnswersList=>{
                this.setState({answers: AnswersList})
            })
    }

    fetchUsers() {
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
                this.setState({ users: UsersList });
            });
    }
    componentDidMount(){
        console.log("component mounted")
        this.fetchUsers();
        this.fetchAnswers();
        this.fetchQuestions();
    }

    render() {
        
        return (
            // <div class = "right-container">
            //     {/* so assuming we have an array of users, we create a table out of them, envisioning that the whole table just takes up the page.
            //         Or maybe right side can be table and left side can be detailed profile view*/}
                
            // </div>
            <div style={{ height: '100%'}}>
                <Grid style={{ height: '100%'}} container spacing = {0}>
                    <Grid style={{ height: '100%'}}item xs = {6}>
                        <UserProfileView user = {this.state.currentProfile}/>
                    </Grid>
                    <Grid style={{ height: '100%'}} item xs = {6}>
                        <div style={{ borderLeft: "1px solid gray"}} class = "right-container">
                            <UsersTableView 
                                onClick = {this.handleListClick} 
                                data = {this.state.userDataDictionary}
                                answers = {this.state.answers}
                                questions = {this.state.questions}/>
                        </div>
                    </Grid>
                </Grid>
            </div>

        )
    }

}

export default UsersContainer