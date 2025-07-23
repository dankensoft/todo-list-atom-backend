"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const user_repository_1 = require("../infrastructure/repositories/user.repository");
const userRepo = new user_repository_1.UserRepository();
class UserUseCase {
    async findOrCreateUser(email) {
        let user = await userRepo.findByEmail(email);
        if (!user)
            user = await userRepo.create({ email });
        return user;
    }
}
exports.UserUseCase = UserUseCase;
//# sourceMappingURL=user.usecase.js.map