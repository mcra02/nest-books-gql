import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { User } from 'src/user/models/user.model';

@InputType()
export class createAuthorInput {
  @MinLength(3)
  @Field({ nullable: false })
  name: string;

  @MinLength(3)
  @Field({ nullable: false })
  country: string;

  @Field(type => ID, { nullable: false })
  register_by: User;
}

@InputType()
export class updateAuthorInput extends PartialType(createAuthorInput) {}
