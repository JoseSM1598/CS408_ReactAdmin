import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import AnswerObject from "./AnswerObject";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default class OverlayComponent extends PureComponent {
  static propTypes = {
    spaceObject: PropTypes.object,
    overlayAnswers: PropTypes.array
  };

  componentDidMount() {
    console.log(this.props.overlayAnswers);
  }

  render() {
    return (
      <div class="overlay-component">
        <div class="overlay-name">
          <Typography variant="h4" color="textPrimary" component="p">
            <b>{this.props.spaceObject.getName()}</b>
          </Typography>
          <Typography variant="h5" color="textPrimary" component="p">
            <b>Space ID: </b>
            <i>{this.props.spaceObject.getSpaceId()}</i>
          </Typography>
          <Typography variant="h5" color="textPrimary" component="p">
            <b>Coordinates: </b>
            <i>
              {this.props.spaceObject
                .getCoordinates()
                .getLatitude()
                .toString() +
                ", " +
                this.props.spaceObject
                  .getCoordinates()
                  .getLongitude()
                  .toString()}
            </i>
          </Typography>
        </div>
        <div class="overlay-answers">
          <Typography variant="h5" color="textPrimary" component="p">
            <b>Recent Answers</b>
          </Typography>
          {this.props.overlayAnswers.map(item => (
            <AnswerObject item={item} />
          ))}
        </div>
      </div>
    );
  }
}
