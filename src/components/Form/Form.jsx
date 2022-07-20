import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import regex from '../../Utils/regex';
import './form.css';

const Form = () => {
  //const rememberMe = localStorage.getItem('email');
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    email: '',
    password: '',
    checked: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      navigate('/User');
    }
  }, [auth.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([user.email, user.password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }
    if (!regex(user.email)) {
      setAlert({
        msg: 'Not valid email format',
        error: true,
      });
      return;
    }
    setAlert({});
    dispatch(login(user));
  };

  const { msg } = alert;

  return (
    <form onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={user.checked}
          onChange={(e) => setUser({ ...user, checked: !user.checked })}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">
        {auth.loginStatus === 'pending' ? 'Submitting...' : 'Sign In'}
      </button>
      {auth.loginStatus === 'rejected' ? (
        <p className="error-msg">{auth.loginError}</p>
      ) : null}
    </form>
  );
};

export default Form;
