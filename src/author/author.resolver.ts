import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Query } from '@nestjs/graphql';
import { Author } from './models/author.model';
import { getAuthorArgs } from './DTO/author.args';
import { createAuthorInput, updateAuthorInput } from './DTO/author.input';

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => Author)
  async author(
    @Args() { id }: getAuthorArgs,
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
    @Args('data') data: createAuthorInput,
    @Context() { prisma },
  ) {
    return await this.authorService.createAuthor(data, prisma);
  }

  @Mutation(returns => Author)
  async updateAuthor(
    @Args() { id }: getAuthorArgs,
    @Args('data') data: updateAuthorInput,
    @Context() { prisma },
  ) {
    return await this.authorService.updateAuthor(id, data, prisma);
  }

  @Mutation(returns => Author)
  async deleteAuthor(@Args() { id }: getAuthorArgs, @Context() { prisma }) {
    return await this.authorService.deleteAuthor(id, prisma);
  }
}
