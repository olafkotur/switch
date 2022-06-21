import { Button } from '@material-ui/core';
import React from 'react';
import { Icon, IMenuItem } from '../../typings/d';
import './suggestion.css';

interface IProps extends IMenuItem {
  handleSuggestion: (url: string, icon: Icon) => Promise<void>;
}

export const Suggestion = ({
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
