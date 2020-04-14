import { Field, ObjectType, ID } from '@nestjs/graphql';
import { type } from 'os';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  lastname: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  email: string;
}

@ObjectType()
export class AuthPayload {
  @Field(type => User, { nullable: false })
  user: User;

  @Field({ nullable: false })
  token: string;
}
