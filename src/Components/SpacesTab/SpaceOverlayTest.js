import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default class SpaceOverlayTest extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldName: "",
      textFieldLat: 0,
      textFieldLong: 0
    };
  }

  setOpen = bool => {
    this.setState({ open: bool }); //NEED SETSTATE TO RERENDER COMPONENT
  };

  handleClickOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  render() {
    return (
      <div>
        <div class="add-space-button">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={this.handleClickOpen}
          >
            Add a Space
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a Space</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a Space, please fill out the necessary fields below.
            </DialogContentText>
            <TextField
              onChange={e => this.setState({ textFieldName: e.target.value })}
              autoFocus
              margin="dense"
              id="name"
              label="Space Name"
              type="text"
              fullWidth
            />
            <TextField
              onChange={e => this.setState({ textFieldLat: e.target.value })}
              margin="dense"
              id="name"
              label="Latitude Coordinates"
              type="number"
              fullWidth
            />
            <TextField
              onChange={e => this.setState({ textFieldLong: e.target.value })}
              margin="dense"
              id="name"
              label="Longitude Coordinates"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
