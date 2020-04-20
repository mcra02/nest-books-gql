import {
  Resolver,
  Args,
  Context,
  Mutation,
  Subscription,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Query } from '@nestjs/graphql';
import { Author, AuthorSubscriptionPayload } from './models/author.model';
import { GetAuthorArgs } from './DTO/author.args';
import { CreateAuthorInput, UpdateAuthorInput } from './DTO/author.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/app.service';

@Resolver(of => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => Author)
  async author(@Args() { id }: GetAuthorArgs, @Context() { prisma }) {
    return await this.authorService.getAuthor(id, prisma);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Author])
  async authors(@Context() { prisma }) {
    return await prisma.authors.findMany();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Author)
  async createAuthor(
    @Args('data') data: CreateAuthorInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.createAuthor(data, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Author)
  async updateAuthor(
    @Args() { id }: GetAuthorArgs,
    @Args('data') data: UpdateAuthorInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.updateAuthor(id, data, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Author)
  async deleteAuthor(
    @Args() { id }: GetAuthorArgs,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.deleteAuthor(id, prisma, pubsub);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => AuthorSubscriptionPayload)
  authorsSubscription(@Context() { pubsub }) {
    return pubsub.asyncIterator('authors');
  }

  @ResolveField()
  async register_by(@Parent() author: Author, @Context() { prisma }) {
    return await this.authorService.registerByField(author, prisma);
  }
}
