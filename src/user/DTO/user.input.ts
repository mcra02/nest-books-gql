import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { IsEmail, Min, Max } from 'class-validator';

@InputType()
export class signUpInput {
  @Min(3)
  @Field({ nullable: false })
  name: string;

  @Min(3)
  @Field({ nullable: false })
  lastname: string;

  @Min(6)
  @Max(15)
  @Field({ nullable: false })
  password: string;

  @IsEmail()
  @Field({ nullable: false })
  email: string;
}

@InputType()
export class UpdateUserInput extends PartialType(signUpInput) {
  @Field(type => ID, { nullable: false })
  id: string;
}

@InputType()
export class loginInput {
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @Min(6)
  @Max(15)
  @Field({ nullable: false })
  password: string;
}
