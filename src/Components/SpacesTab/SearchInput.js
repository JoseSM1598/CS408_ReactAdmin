import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";

export default class SearchInput extends PureComponent {
  static propTypes = {
    textChange: PropTypes.func
  };

  handleChange = event => {
    this.props.textChange(event);
  };

  keyPress = event => {
    if (event.keyCode == 13) {
      this.props.pressKey(event);
    }
  };

  render() {
    return (
      <div class="space-search">
        <Input
          onChange={this.handleChange}
          placeholder="Search for a Space"
          onKeyDown={this.keyPress}
        />
      </div>
    );
  }
}
