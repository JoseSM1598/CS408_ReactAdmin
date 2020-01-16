import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography";
import OutsideAlerterSpaces from "../SpacesTab/OutsideAlerterSpaces";
import OverlayComponent from "../SpacesTab/OverlayComponent";
import PropTypes from "prop-types";

export default class SpacesOverlay extends PureComponent {
  static propTypes = {
    overlaySpaceObject: PropTypes.object,
    closeClick: PropTypes.func,
    overlayAnswers: PropTypes.array
  };

  render() {
    return (
      <div>
        <div class="overlay space-overlay" id="space-overlay">
          <OutsideAlerterSpaces closeClick={this.props.closeClick}>
            <OverlayComponent
              spaceObject={this.props.overlaySpaceObject}
              overlayAnswers={this.props.overlayAnswers}
            />
          </OutsideAlerterSpaces>
        </div>
        <div class="gray-overlay space-overlay" id="space-gray-overlay" />
      </div>
    );
  }
}
