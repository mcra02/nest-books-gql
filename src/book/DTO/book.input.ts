import { InputType, PartialType, Field, Int, Float, ID } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Author } from 'src/author/models/author.model';
import { User } from 'src/user/models/user.model';

@InputType()
export class CreateBookInput {
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

  @Field(type => ID, { nullable: false })
  register_by: number;

  @Field(type => ID, { nullable: false })
  writted_by: number;
}

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {}
