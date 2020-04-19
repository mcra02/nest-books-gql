import {
  Resolver,
  Args,
  Context,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Query } from '@nestjs/graphql';
import { Author, AuthorSubscriptionPayload } from './models/author.model';
import { GetAuthorArgs } from './DTO/author.args';
import { CreateAuthorInput, UpdateAuthorInput } from './DTO/author.input';

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => Author)
  async author(
    @Args() { id }: GetAuthorArgs,
    @Context() { prisma },
  ): Promise<Author> {
    return await this.authorService.getAuthor(id, prisma);
  }

  @Query(returns => [Author])
  async authors(@Context() { prisma }): Promise<Author[]> {
    return await prisma.authors.findMany();
  }

  @Mutation(returns => Author)
  async createAuthor(
    @Args('data') data: CreateAuthorInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.createAuthor(data, prisma, pubsub);
  }

  @Mutation(returns => Author)
  async updateAuthor(
    @Args() { id }: GetAuthorArgs,
    @Args('data') data: UpdateAuthorInput,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.updateAuthor(id, data, prisma, pubsub);
  }

  @Mutation(returns => Author)
  async deleteAuthor(
    @Args() { id }: GetAuthorArgs,
    @Context() { prisma, pubsub },
  ) {
    return await this.authorService.deleteAuthor(id, prisma, pubsub);
  }

  @Subscription(returns => AuthorSubscriptionPayload)
  authorsSubscription(@Context() { pubsub }) {
    return pubsub.asyncIterator('authors');
  }
}
