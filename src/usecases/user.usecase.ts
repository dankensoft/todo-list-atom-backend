import { UserRepository } from '../infrastructure/repositories/user.repository';

const userRepo = new UserRepository();

export class UserUseCase {
  async findOrCreateUser(email: string) {
    let user = await userRepo.findByEmail(email);
    if (!user) user = await userRepo.create({ email });
    return user;
  }
}
