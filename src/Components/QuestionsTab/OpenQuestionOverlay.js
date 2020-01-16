import React from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


class OpenQuestionOverlay extends React.Component{

    handleClick(){
        var overlay = document.getElementById("question-overlay");
        overlay.style.display = "block";
        var gray_overlay = document.getElementById("question-gray-overlay");
        gray_overlay.style.display = "block";
    }

    render(){
        return(
            //couldn't figure out how to add margin, so just put it in app.css
            <div id = "add-question-button">
                <Button
                    variant = "contained"
                    color = "default"
                    startIcon = {<AddIcon/>}
                    onClick = {()=> this.handleClick()}>
                    Add Question
                </Button>
            </div>
        )
    }
}

export default OpenQuestionOverlay