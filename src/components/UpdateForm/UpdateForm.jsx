import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import { update } from '../../store/accountSlice';
import { useNavigate } from 'react-router-dom';
import './updateForm.css';

function UpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({});
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const [user, setUser] = useState({
    token: auth.token,
    firstName: account.firstName,
    lastName: account.lastName,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([user.firstName, user.lastName].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }
    setAlert({});
    if (auth.token) {
      dispatch(update(user));
    }
  };
  const { msg } = alert;

  const cancel = () => {
    navigate('/User');
  };

  return (
    <form>
      {msg && <Alert alert={alert} />}
      <div className="input-wrapper">
        <input
          type="text"
          value={user.firstName}
          onChange={(e) =>
            setUser({ ...user, firstName: e.target.value.trim() })
          }
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          value={user.lastName}
          onChange={(e) =>
            setUser({ ...user, lastName: e.target.value.trim() })
          }
        />
      </div>
      <button className="green-button" onClick={handleSubmit}>
        Save
      </button>
      <button className="green-button" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
}

export default UpdateForm;
