import { Injectable } from '@nestjs/common';
import { isBook } from './book.utils';
import { isAuthor } from 'src/author/author.utils';
import { isUser } from 'src/user/user.utils';

@Injectable()
export class BookService {
  async getBook(id, prisma) {
    const book = await isBook(id, prisma);
    if (!book) {
      throw new Error('Books is not exists!');
    }
    return book;
  }

  async createBook(data, prisma, pubsub) {
    const { register_by, writted_by, ...rest } = data;

    const author = await isAuthor(writted_by, prisma);

    if (!author) {
      throw new Error('Relation writted_by is not exists!');
    }

    const user = await isUser(register_by, prisma);

    if (!user) {
      throw new Error('Relation register_by is not exists!');
    }

    const bookCreated = await prisma.books.create({
      data: {
        ...rest,
        users: {
          connect: {
            id: Number(register_by),
          },
        },
        authors: {
          connect: {
            id: Number(writted_by),
          },
        },
      },
    });

    pubsub.publish('books', {
      booksSubscription: {
        mutation: 'CREATED',
        data: bookCreated,
      },
    });

    return bookCreated;
  }

  async updateBook(id, data, prisma, pubsub) {
    const { register_by, writted_by, ...rest } = data;

    const book = await isBook(id, prisma);

    if (!book) {
      throw new Error('Book is not exists!');
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

    if (writted_by) {
      const author = await isAuthor(writted_by, prisma);

      if (!author) {
        throw new Error('Relation writted_by is not exists!');
      }

      rest.authors = {
        connect: {
          id: Number(writted_by),
        },
      };
    }

    const bookUpdated = prisma.books.update({
      where: {
        id: Number(id),
      },
      data: {
        ...rest,
      },
    });

    pubsub.publish('books', {
      booksSubscription: {
        mutation: 'UPDATED',
        data: bookUpdated,
      },
    });

    return bookUpdated;
  }

  async deleteBook(id, prisma, pubsub) {
    const book = await isBook(id, prisma);

    if (!book) {
      throw new Error('Book is not exists!');
    }

    const bookDeleted = await prisma.books.delete({
      where: {
        id: Number(id),
      },
    });

    pubsub.publish('books', {
      booksSubscription: {
        mutation: 'DELETED',
        data: bookDeleted,
      },
    });

    return bookDeleted;
  }

  async writtedByField(parent, prisma) {
    const { id } = parent;
    return await prisma.books
      .findOne({
        where: {
          id,
        },
      })
      .authors();
  }

  async registerByField(parent, prisma) {
    const { id } = parent;
    return await prisma.books
      .findOne({
        where: {
          id,
        },
      })
      .users();
  }
}
