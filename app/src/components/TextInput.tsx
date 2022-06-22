import React, { HTMLInputTypeAttribute } from 'react';
import Stylesheet from 'reactjs-stylesheet';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
}

export const TextInput = ({
  value,
  onChange,
  type,
  placeholder,
  description,
}: IProps): React.ReactElement => {
  return (
    <div style={styles.container}>
      <input
        className="bg-secondary"
        style={styles.textInput}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-muted" style={styles.description}>
        {description}
      </span>
    </div>
  );
};

const styles = Stylesheet.create({
  container: {
    width: '100%',
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },

  textInput: {
    borderWidth: 0,
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  description: {
    fontSize: 12,
  },
});
