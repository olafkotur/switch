import React from 'react';
import { Button } from '@material-ui/core';
import { IMenuItem, Icon } from '../../typings/user';
import './suggestion.css';

interface IProps extends IMenuItem {
  handleSuggestion: (url: string, icon: Icon) => Promise<void>;
}

const Suggestion = ({
  url,
  icon,
  handleSuggestion,
}: IProps): React.ReactElement => {
  return (
    <Button className="p-3" onClick={() => handleSuggestion(url, icon)}>
      <img src={icon} className="suggestion-image" />
    </Button>
  );
};

export default Suggestion;
