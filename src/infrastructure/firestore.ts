import { db } from '../config/firebase';
export const usersRef = db.collection('users');
export const tasksRef = db.collection('tasks');
