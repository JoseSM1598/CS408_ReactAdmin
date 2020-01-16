import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class AnswerObject extends PureComponent {
  static propTypes = {
    item: PropTypes.object
  };

  render() {
    var answerText;
    if (this.props.item.getAnswerText().length > 0) {
      answerText = this.props.item.getAnswerText();
    } else {
      answerText = <i>unanswered</i>;
    }
    return (
      <div>
        <Card class="exp">
          <CardActionArea onClick={this.sendSpaceObject}>
            <CardContent>
              <Typography variant="h6" component="h6">
                {answerText}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                created at: {this.props.item.getCreatedAt()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                answered by:{" "}
                {this.props.item.getAnsweredBy().getFirstName() +
                  " " +
                  this.props.item.getAnsweredBy().getLastName()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}
