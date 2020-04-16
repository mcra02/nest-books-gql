import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(type => ID, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  country: string;

  @Field(type => Int, { nullable: false })
  register_by: number;
}

@ObjectType()
export class AuthorSubscriptionPayload {
  @Field()
  mutation: string;

  @Field(type => Author)
  data: Author;
}
