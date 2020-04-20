import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Author {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  country: string;

  @Field(type => User, { nullable: false })
  register_by: User;
}

@ObjectType()
export class AuthorSubscriptionPayload {
  @Field()
  mutation: string;

  @Field(type => Author)
  data: Author;
}
