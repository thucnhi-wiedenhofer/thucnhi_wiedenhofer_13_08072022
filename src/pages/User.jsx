import React from 'react';
import Account from '../components/Account/Account';
import Heading from '../components/Heading/Heading';
import { getUser } from '../store/accountSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import UpdateForm from '../components/UpdateForm/UpdateForm';

function User() {
  const auth = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const token = auth.token;
  const editName = account.editName;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(token));
  }, [token, dispatch]);
  if (token !== null) {
    return (
      <main className="main bg-dark">
        {editName ? <UpdateForm /> : <Heading />}
        <h2 className="sr-only">Accounts</h2>
        <Account />
      </main>
    );
  }
}
export default User;
