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

    render() {
        return (
            <div class="space-search">
                <Input onChange={this.handleChange} placeholder={this.props.text} />
            </div>
        );
    }
}
