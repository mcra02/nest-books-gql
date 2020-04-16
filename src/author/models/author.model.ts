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
