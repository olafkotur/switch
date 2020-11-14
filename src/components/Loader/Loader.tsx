import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default class Loader extends React.Component {
  render() {
    return (
      <div className="vh-100" style={{ marginTop: '50vh' }}>
        <div className="d-flex justify-content-center">
          <h1 className="secondary mr-2">s</h1>
          <h1 className="primary mr-2">w</h1>
          <h1 className="primary mr-2">i</h1>
          <h1 className="primary mr-2">t</h1>
          <h1 className="tertiary mr-2">c</h1>
          <h1 className="quaternary mr-2">h</h1>
        </div>
        <div className="d-flex justify-content-center">
          <CircularProgress />
        </div>
      </div>
    );
  }
}
