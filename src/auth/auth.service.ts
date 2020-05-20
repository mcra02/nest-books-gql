import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validatePassword(requestPassword, password) {
    return await bcrypt.compare(requestPassword, password);
  }

  async generateToken(user) {
    return await this.jwt.sign(user);
  }

  async decodeToken(token) {
    return await this.jwt.decode(token);
  }
}
