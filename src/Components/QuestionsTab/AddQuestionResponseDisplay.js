import React from 'react'
import Button from '@material-ui/core/Button';
import { FaTintSlash } from 'react-icons/fa';

class AddQuestionResponseDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:"",
        }
    }
    componentDidMount(){
        this.getBody();
    }
    getBody(){
        this.props.response.text()
            .then(
                res=>{this.setState({text: res})}
            )
    }

    render(){
        const isSuccess = (this.props.response.status == 200)
        if(isSuccess){
            return(
                <div id = "add-question-response">
                    <p>Your question has been successfully added!</p>
                    <Button 
                        variant = "contained"
                        color = "default"//so when passing function prop no paren, but need paren in final step
                        onClick = {()=> this.props.onClick()}>
                        Okay
                    </Button>
                </div>
            )
        }
        else{
            return(
                
                <div id = "add-question-response">
                    <p>There was something wrong with your question. Check the error below.</p>
                    <p>Status code: {this.props.response.status}</p>
                    <p>Body: {this.state.text}</p>
                    <Button 
                        variant = "contained"
                        color = "default"
                        onClick = {()=> this.props.onClick()}>
                        Okay
                    </Button>
                </div>
            )
        }
        
    }
}

export default AddQuestionResponseDisplay;