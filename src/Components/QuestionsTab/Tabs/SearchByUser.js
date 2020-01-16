import React, { Component } from 'react';
import {Card, CardDeck, CardBody, CardTitle, CardText} from "reactstrap";
import {FaUser} from "react-icons/fa";
import {users} from "../../../const/users";
import filterResults from "../Helper/filterResults";
import SearchInput from "../Helper/SearchInput";

const center_text = {
    display: 'flex',
    justifyContent: 'center'
};

const User = ({name, surname, level}) => (
    <Card style={{ width: '10rem', fontSize:"13px" }}>
        <CardBody>
            <CardTitle style = {center_text}><FaUser/> </CardTitle>
            <CardText style = {center_text}>
                {name +" " + surname}
            </CardText>
            <footer style = {center_text}>
                {"Level: " +level}
            </footer>
        </CardBody>
    </Card>
);

const UserList = ({userData}) => (
            <CardDeck style = {{marginLeft: "100px", marginRight: "100px", marginTop: "30px"}}>
                {

                    userData.map((item => {
                        return <User name={item.name} surname={item.surname} level = {item.level}/>
                    }))
                }
            </CardDeck>
);

class SearchByUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredResults: filterResults("", 20, users),
            overlayClicked: "nothing"
        };
    }

    handleSearchChange = event => {
        this.setState({
            filteredResults: filterResults(event.target.value, 20, users)
        });
    };
    render(){
        return(
            <div>
                <SearchInput textChange={this.handleSearchChange} text={"Search for a User"}/>
                <UserList userData = {this.state.filteredResults} />
            </div>
        )
    }
}

export default SearchByUser