import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { prismaVersion } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  async getMe(token: any, prisma) {
    const decode = await this.authService.decodeToken(token);
    if (!decode) {
      throw new Error('This token is invalid');
    }
    const user = await prisma.users.findOne({
      where: {
        email: decode['email'],
      },
    });
    return user;
  }

  async getUser(id: any, prisma) {
    if (!id) {
      throw new Error('This id is required!');
    }

    const user = await prisma.users.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      throw new Error('User does not exist!');
    }

    return user;
  }

  async signUp({ data }, prisma) {
    const email = data.email;
    const isUser = await prisma.users.findOne({
      where: {
        email,
      },
    });

    if (isUser) {
      throw new Error('Email is already in use!');
    }

    const password = await this.authService.hashPassword(data.password);

    const user = await prisma.users.create({
      data: {
        ...data,
        password,
      },
    });

    return {
      user,
      token: this.authService.generateToken(user.email),
    };
  }

  async login(data, prisma) {
    const user = await prisma.users.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('Email or password incorrect!');
    }

    const isValidPassword = await this.authService.validatePassword(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new Error('Email or password incorrect!');
    }

    return {
      user,
      token: this.authService.generateToken(user.email),
    };
  }
}
