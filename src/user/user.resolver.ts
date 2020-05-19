import {
  Resolver,
  Query,
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { User, AuthPayload } from './models/user.model';
import { getUserArgs } from './DTO/user.args';
import { SignUpInput, LoginInput } from './DTO/user.input';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/app.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userSevice: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async me(@Context() { prisma, headers }): Promise<User> {
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    return await this.userSevice.getMe(token, prisma);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async user(
    @Args() { id }: getUserArgs,
    @Context() { prisma },
  ): Promise<User> {
    return await this.userSevice.getUser(id, prisma);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [User])
  async users(@Context() { prisma }): Promise<User[]> {
    return await prisma.users.findMany();
  }

  @Mutation(returns => AuthPayload)
  async signUp(@Args('data') data: SignUpInput, @Context() { prisma }) {
    return await this.userSevice.signUp({ data }, prisma);
  }

  @Mutation(returns => AuthPayload)
  async signIn(@Args('data') data: LoginInput, @Context() { prisma }) {
    return await this.userSevice.login(data, prisma);
  }
}
