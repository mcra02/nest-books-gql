import { Injectable } from '@nestjs/common';
import { isUser } from '../user/user.utils';
import { isAuthor } from './author.utils';

@Injectable()
export class AuthorService {
  async getAuthor(id, prisma) {
    const author = await isAuthor(id, prisma);
    console.log(author);
    if (!author) {
      throw new Error('Author is not exists!');
    }
    return await author;
  }

  async createAuthor(data, prisma) {
    const { register_by, ...rest } = data;

    const user = await isUser(register_by, prisma);

    if (!user) {
      throw new Error('Relation register_by is not exists!');
    }

    const author = await prisma.authors.create({
      data: {
        ...rest,
        users: {
          connect: {
            id: Number(register_by),
          },
        },
      },
    });

    return author;
  }

  async updateAuthor(id, data, prisma) {
    const { register_by, ...rest } = data;

    const author = await isAuthor(id, prisma);

    if (!author) {
      throw new Error('Author is not exists!');
    }

    if (register_by) {
      const user = await isUser(register_by, prisma);
      if (!user) {
        throw new Error('Relation register_by is not exists!');
      }
      rest.users = {
        connect: {
          id: Number(register_by),
        },
      };
    }
    const authorUpdated = prisma.authors.update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
      },
    });

    return authorUpdated;
  }

  async deleteAuthor(id, prisma) {
    const author = await isAuthor(id, prisma);

    if (!author) {
      throw new Error('Author is not exists!');
    }

    const authorDeleted = await prisma.authors.delete({
      where: {
        id: Number(id),
      },
    });
    return authorDeleted;
  }
}
