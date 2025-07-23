import { usersRef } from '../firestore';
import { CreateUserDTO } from '../../domain/dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const now = new Date().toISOString();
    const docRef = await usersRef.add({ ...dto, createdAt: now });
    return { id: docRef.id, email: dto.email, createdAt: now };
  }
}
