import {
  Resolver,
  Query,
  Args,
  Context,
  Mutation,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Book, BookSubscriptionPayload } from './models/book.model';
import { BookService } from './book.service';
import { GetBookArgs } from './DTO/book.args';
import { UpdateBookInput, CreateBookInput } from './DTO/book.input';
import {} from '@nestjs/passport';
import { GqlAuthGuard } from 'src/gql.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(of => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => Book)
  async book(@Args() { id }: GetBookArgs, @Context() { prisma }) {
    return await this.bookService.getBook(id, prisma);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Book])
  async books(@Context() { prisma }) {
    return await prisma.books.findMany();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Book)
  async createBook(
    @Args('data') data: CreateBookInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.bookService.createBook(data, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Book)
  async updateBook(
    @Args() { id }: GetBookArgs,
    @Args('data') data: UpdateBookInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.bookService.updateBook(id, data, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Book)
  async deleteBook(@Args() { id }: GetBookArgs, @Context() { prisma, pubsub }) {
    return this.bookService.deleteBook(id, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => BookSubscriptionPayload)
  booksSubscription(@Context() { pubsub }) {
    return pubsub.asyncIterator('books');
  }

  @ResolveField()
  async writted_by(@Parent() book: Book, @Context() { prisma }) {
    return await this.bookService.writtedByField(book, prisma);
  }

  @ResolveField()
  async register_by(@Parent() book: Book, @Context() { prisma }) {
    return await this.bookService.registerByField(book, prisma);
  }
}
