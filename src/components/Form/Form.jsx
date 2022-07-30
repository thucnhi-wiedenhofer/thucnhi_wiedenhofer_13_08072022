import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import regex from '../../Utils/regex';
import './form.css';

const Form = () => {
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    password: '',
    checked: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // if user's connected, direct user to User page
  useEffect(() => {
    if (auth.token) {
      navigate('/User');
    }
  }, [auth.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check no empty fields:
    if ([user.email, user.password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }
    //check email is valid:
    if (!regex(user.email)) {
      setAlert({
        msg: 'Not valid email format',
        error: true,
      });
      return;
    }
    setAlert({});
    //dispath login action:
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
      {auth.status === '400' ? <p className="error">{auth.message}</p> : null}
    </form>
  );
};

export default Form;
