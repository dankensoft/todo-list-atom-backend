"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firestore_1 = require("../firestore");
class UserRepository {
    async findByEmail(email) {
        const snapshot = await firestore_1.usersRef.where('email', '==', email).limit(1).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return Object.assign({ id: doc.id }, doc.data());
    }
    async create(dto) {
        const now = new Date().toISOString();
        const docRef = await firestore_1.usersRef.add(Object.assign(Object.assign({}, dto), { createdAt: now }));
        return { id: docRef.id, email: dto.email, createdAt: now };
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map