import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import Stylesheet from 'reactjs-stylesheet';
import { TextInput } from '../../../components/TextInput';
import { UserService } from '../../../services/user';

export const LoginRegister = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
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
   * Handlers user login registration.
   * @param action - action to perform i.e. login or register
   */
  const handleLoginRegister = async (
    action: 'login' | 'register',
  ): Promise<void> => {
    setLoading(true);
    await UserService[action](email, password, dispatch);
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {loading && (
        <CircularProgress className="position-absolute" style={styles.loader} />
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
            onClick={async () => await handleLoginRegister('login')}
          >
            Login
          </Button>
          <Button
            className="bg-secondary ml-2 primary"
            style={{ opacity: valid ? 1 : 0.5 }}
            variant="contained"
            disabled={!valid}
            onClick={async () => await handleLoginRegister('register')}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

const styles = Stylesheet.create({
  loader: {
    marginTop: -25,
  },
});
