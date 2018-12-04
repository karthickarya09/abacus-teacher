import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {this.props.chipData.map(data => {
          let icon = null;

          return (
            <Chip
              key={data.competency}
              icon={icon}
              label={data.competency}
              onClick={this.props.selectChip(data)}
              className={classes.chip}
              color={(data.selected?'primary':'default')}
            />
          );
        })}
      </Paper>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
