import { db } from './firebase';

// User API

export const doCreateUser = (id, firstName, lastName, email) =>
  db.ref(`users/${id}`).set({
    firstName,
    lastName,
    email,
    roles: 'user'
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...