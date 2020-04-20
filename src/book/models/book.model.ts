import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { User } from 'src/user/models/user.model';
import { Author } from 'src/author/models/author.model';

@ObjectType()
export class Book {
  @MinLength(3)
  @Field({ nullable: false })
  title: string;

  @MinLength(3)
  @Field({ nullable: true })
  description: string;

  @Field(type => Float, { nullable: false })
  price: number;

  @Field(type => Int, { nullable: false })
  quantity: number;

  @Field(type => User, { nullable: false })
  register_by: User;

  @Field(type => Author, { nullable: false })
  writted_by: Author;
}

@ObjectType()
export class BookSubscriptionPayload {
  @Field()
  mutation: string;

  @Field(type => Book)
  data: Book;
}
