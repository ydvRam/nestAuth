import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {

  users: User[] = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

}