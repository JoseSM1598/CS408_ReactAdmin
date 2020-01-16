import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SpaceObject from "./SpaceObject";

export default class SpaceResults extends PureComponent {
  static propTypes = {
    spaceData: PropTypes.array,
    spaceClick: PropTypes.func
  };

  sendSpaceObject = spaceObject => {
    //passes space object up to SpacesTab
    this.props.spaceClick(spaceObject);
  };

  render() {
    return (
      <div class="space-results">
        {this.props.spaceData.map(item => (
          <SpaceObject
            item={item}
            spaceClick={this.sendSpaceObject}
            id={item.getSpaceId()}
            name={item.getName()}
            coordinates={item.getCoordinates()}
          />
        ))}
      </div>
    );
  }
}
