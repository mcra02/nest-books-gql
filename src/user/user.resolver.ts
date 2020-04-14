import {
  Resolver,
  Query,
  Args,
  Context,
  Mutation,
  Parent,
} from '@nestjs/graphql';
import { User, AuthPayload } from './models/user.model';
import { getUserArgs } from './DTO/user.args';
import { signUpInput, loginInput } from './DTO/user.input';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/app.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userSevice: UserService) {}

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
  async signUp(@Args('data') data: signUpInput, @Context() { prisma }) {
    return await this.userSevice.signUp({ data }, prisma);
  }

  @Mutation(returns => AuthPayload)
  async login(@Args('data') data: loginInput, @Context() { prisma }) {
    return await this.userSevice.login(data, prisma);
  }
}
