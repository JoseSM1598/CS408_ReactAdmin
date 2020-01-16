import React from 'react'

class UserProfileView extends React.Component{

    render(){
        if (this.props.user == null){
            return(
                <div id = "profile-view">
                    Please select a profile to view.
                </div>
            )
        }
        else{
            return(
                <div id = "profile-view">
                    <div id = "profile-image">
                        <img src = {this.props.user.getUser().getPhotoUrl()}/>
                    </div>
                    <div>
                         {this.props.user.getUser().getFirstName()} {this.props.user.getUser().getLastName()}
                    </div>
                    <div>
                        User ID: {this.props.user.getUser().getUserId()}
                    </div>
                </div>
            )
        }
    }


}


export default UserProfileView