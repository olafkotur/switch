import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { IServiceDetails } from '../../typings/d';

interface IProps {
  data: IServiceDetails;
}

export default class SearchResult extends React.Component<IProps> {
  render() {
    return (
      <Box className="m-3">
        <Paper className="d-flex justify-content-center align-items-center" style={{ width: 100, height: 100, backgroundColor: 'red' }}>
          {this.props.data.name}
        </Paper>
      </Box>
    );
  }
}
