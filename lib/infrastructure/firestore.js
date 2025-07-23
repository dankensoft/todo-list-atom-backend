"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRef = exports.usersRef = void 0;
const firebase_1 = require("../config/firebase");
exports.usersRef = firebase_1.db.collection('users');
exports.tasksRef = firebase_1.db.collection('tasks');
//# sourceMappingURL=firestore.js.map