import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#eeeeee",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function CustomizedTable(props) {
  const { classes, data} = props;
  const rows = data
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>S.No</CustomTableCell>  
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell numeric>Date Created</CustomTableCell>
            <CustomTableCell numeric>Last Modified</CustomTableCell>
            <CustomTableCell numeric>Edit/Delete</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">{row.id}</CustomTableCell>
                <CustomTableCell>
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.dateCreated}</CustomTableCell>
                <CustomTableCell numeric>{row.lastModified}</CustomTableCell>
                <CustomTableCell numeric><IconButton><EditIcon className={classes.icon} button /></IconButton> <IconButton><DeleteIcon className={classes.icon} /></IconButton></CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);