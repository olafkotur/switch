import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import './searchBar.css';

interface IProps {
  value: string;
  handleUpdate: (value: string) => void;
}

export default class SearchBar extends React.Component<IProps> {
  render() {
    return (
      <div className="search-bar">
        <TextField
          variant="standard"
          className="search-bar-input"
          placeholder="https://notion.so"
          inputProps={{
            style: {
              fontSize: 18,
              fontFamily: 'monospace',
              color: '#fff',
              fontWeight: 'lighter',
              marginLeft: 10,
            },
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <InputAdornment position="start">
              <div className="primary pt-1 pb-1 pr-3 border-right">
                <Search color="inherit" fontSize="large" />
              </div>
            </InputAdornment>,
          }}
          value={this.props.value}
          onChange={e => this.props.handleUpdate(e.target.value)}
        />
      </div>
    );
  }
}
