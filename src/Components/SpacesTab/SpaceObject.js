import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as apis from "../../proto/apis_pb";

export default class SpaceObject extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    spaceClick: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    coordinates: PropTypes.object
  };

  sendSpaceObject = () => {
    //passes space object up to SpaceResults
    this.props.spaceClick(this.props.item);
  };

  render() {
    return (
      <div class="space-object">
        <Card>
          <CardActionArea onClick={this.sendSpaceObject}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ID: {this.props.id}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Coordinates:{" "}
                {this.props.coordinates.getLatitude().toString() +
                  this.props.coordinates.getLongitude().toString()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}
