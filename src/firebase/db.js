import { db } from './firebase';

// User API

export const doCreateUser = (id, first_name, last_name, email) =>
  db.ref(`users/${id}`).set({
    first_name,
    last_name,
    email,
    roles: 'user'
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...