import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default class SpaceSubNavBar extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    searchBy: PropTypes.string
  };

  sendSelectedTab = (event, newValue) => {
    this.props.handleClick(newValue);
  };

  render() {
    return (
      <Paper>
        <Tabs
          value={this.props.searchBy}
          onChange={this.sendSelectedTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value="searchbyname" label="Search By Name" />
          {/* <Tab value="searchbyID" label="Search By ID" /> */}
          <Tab value="searchbylocation" label="Search By Location" />
        </Tabs>
      </Paper>
    );
  }
}
