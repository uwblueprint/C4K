import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import './CensusDivisionInfo.css'

class CensusDivisionInfo extends Component {
  renderRows() {
    const data = this.props.censusDivisionData[this.props.selected] || {}
    return Object.keys(data).map((key, index) => {
      const val = data[key]
      return (
        <TableRow key={ index }>
          <TableCell>{ key }</TableCell>
          <TableCell>{ val }</TableCell>
        </TableRow>
      )
    })
  }
  render() {
    if (this.props.selected) {
      return (
        <Paper className='censusDivisionInfoGroup'>
          <Table>
            <TableBody>
              { this.renderRows() }
            </TableBody>
          </Table>
        </Paper>
      )
    } else {
      return null
    }
  }
}

export default CensusDivisionInfo
