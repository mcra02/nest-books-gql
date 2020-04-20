import { Injectable } from '@nestjs/common';
import { isUser } from '../user/user.utils';
import { isAuthor } from './author.utils';

@Injectable()
export class AuthorService {
  async getAuthor(id, prisma) {
    const author = await isAuthor(id, prisma);
    if (!author) {
      throw new Error('Author is not exists!');
    }
    return author;
  }

  async createAuthor(data, prisma, pubsub) {
    const { register_by, ...rest } = data;

    const user = await isUser(register_by, prisma);

    if (!user) {
      throw new Error('Relation register_by is not exists!');
    }

    const authorCreated = await prisma.authors.create({
      data: {
        ...rest,
        users: {
          connect: {
            id: Number(register_by),
          },
        },
      },
    });

    pubsub.publish('authors', {
      authorsSubscription: {
        mutation: 'CREATED',
        data: authorCreated,
      },
    });

    return authorCreated;
  }

  async updateAuthor(id, data, prisma, pubsub) {
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

    pubsub.publish('authors', {
      authorsSubscription: {
        mutation: 'UPDATED',
        data: authorUpdated,
      },
    });

    return authorUpdated;
  }

  async deleteAuthor(id, prisma, pubsub) {
    const author = await isAuthor(id, prisma);

    if (!author) {
      throw new Error('Author is not exists!');
    }

    const authorDeleted = await prisma.authors.delete({
      where: {
        id: Number(id),
      },
    });

    pubsub.publish('authors', {
      authorsSubscription: {
        mutation: 'DELETED',
        data: authorDeleted,
      },
    });

    return authorDeleted;
  }

  async registerByField(parent, prisma) {
    const { id } = parent;
    return await prisma.authors
      .findOne({
        where: {
          id,
        },
      })
      .users();
  }
}
