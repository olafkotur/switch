import { Button, InputAdornment, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React from 'react'
import Stylesheet from 'reactjs-stylesheet'

interface Props {
  value: string
  isValid: boolean
  handleUpdate: (value: string) => Promise<void>
  handleConfirm: () => Promise<void>
}

export const SearchBar = ({
  value,
  isValid,
  handleUpdate,
  handleConfirm,
}: Props): React.ReactElement => {
  return (
    <div style={styles.container}>
      <TextField
        variant="standard"
        style={styles.input}
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
          startAdornment: (
            <InputAdornment position="start" className="pl-3">
              <div className="primary pt-1 pb-1 pr-3 border-right">
                <Search color="inherit" fontSize="large" />
              </div>
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={async (e) => await handleUpdate(e.target.value)}
      />
      <Button
        className="primary mr-3"
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    height: 70,
    width: '100%',
    background: '#56585c',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: '75%',
    width: '95%',
    justifyContent: 'center',
  },
})
