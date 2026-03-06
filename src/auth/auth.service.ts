import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  // track login attempts
  loginAttempts = new Map();

  // session tracking
  sessions = new Map();

  async login(email: string) {

    const user = this.userService.findByEmail(email);

    if (!user) return "User not found";

    const attempts = this.loginAttempts.get(email) || { count: 0, lockUntil: 0 };

    if (attempts.lockUntil > Date.now()) {
      return "Account locked for 10 minutes";
    }

    attempts.count++;

    if (attempts.count >= 3) {

      attempts.lockUntil = Date.now() + 10 * 60 * 1000;

      this.loginAttempts.set(email, attempts);

      return "Account locked after 3 attempts";

    }

    const activeSessions = this.sessions.get(email) || 0;

    if (activeSessions >= 2) {
      return "Session limit reached";
    }

    this.sessions.set(email, activeSessions + 1);

    attempts.count = 0;
    this.loginAttempts.set(email, attempts);

    const token = jwt.sign(
      { email: user.email, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );

    return { token };

  }

}