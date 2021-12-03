import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { TextInput } from '../../components/TextInput/TextInput';
import { UserService } from '../../services/user';
import { setDialog, setError } from '../../redux/interface';
import { useDispatch } from 'react-redux';
import './styles.css';
import Loader from '../../components/Loader/Loader';
import { setAuth } from '../../redux/user';

export const LoginRegister = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('olafkotur@gmail.com');
  const [password, setPassword] = React.useState<string>('Poly0981123!');
  const [valid, setValid] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const validEmail = email.includes('@') && email.includes('.');
    const validPassword = RegExp(
      '(?=^.{8,}$)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
    ).test(password);

    setValid(validEmail && validPassword);
  }, [email, password]);

  /**
   * Clears current dialog from the screen.
   */
  const clearDialog = (): void => {
    dispatch(setDialog(null));
  };

  /**
   * Handles user login with given credentials.
   */
  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    const result = await UserService.login(email, password);
    if (result.code !== 200) {
      setLoading(false);
      dispatch(setError(result.message || 'Unexpected error occurred'));
      return;
    }

    // login was successful
    setLoading(false);
    dispatch(setAuth(true));
    clearDialog();
  };

  /**
   * Handles user registration with given credentials.
   */
  const handleRegister = async (): Promise<void> => {
    setLoading(true);
    const result = await UserService.createUser(email, password);
    if (result.code !== 201) {
      setLoading(false);
      dispatch(setError(result.message || 'Unexpected error occurred'));
      return;
    }

    // registration was successful
    setLoading(false);
    dispatch(setAuth(true));
    clearDialog();
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {loading && (
        <CircularProgress className="position-absolute setting-loader" />
      )}
      <div className="p-1" style={loading ? { opacity: 0.2 } : {}}>
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e)}
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          description="Must contain at least 8 characters, one lowercase and uppercase letter, one special character"
          onChange={(e) => setPassword(e)}
        />

        <div className="d-flex justify-content-center">
          <Button
            className="bg-tertiary mr-2 primary"
            style={{ opacity: valid ? 1 : 0.5 }}
            variant="contained"
            disabled={!valid}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            className="bg-secondary ml-2 primary"
            style={{ opacity: valid ? 1 : 0.5 }}
            variant="contained"
            disabled={!valid}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};
