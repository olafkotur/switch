import React from 'react';
import { IMenuItem } from '../../typings/d';

interface IProps {
  items: IMenuItem[];
}

export default class Search extends React.Component<IProps> {

  render() {
    return (
      <div>
        Search
      </div>
    );
  }
}
