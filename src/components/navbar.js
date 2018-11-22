import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Sidebar from './sidebar'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
    
    toggleDrawer = ( e =>{
        this.setState({showSidebar: (!this.state.showSidebar)}) 
    })

    state = {
        showSidebar : false
    }

    render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="top">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              onClick={this.toggleDrawer}
              color="inherit"
              aria-label="Menu"
            >
                <MenuIcon />
                <Drawer open={this.state.showSidebar} onClose={this.toggleDrawer}>
                        <Sidebar/>
                </Drawer>
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Abacus
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
