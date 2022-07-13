import React from 'react';
import Account from '../components/Account/Account';
import Heading from '../components/Heading/Heading';

function User() {
  return (
    <main className="main bg-dark">
      <Heading />
      <h2 className="sr-only">Accounts</h2>
      <Account />
    </main>
  );
}

export default User;
