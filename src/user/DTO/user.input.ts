import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { IsEmail, Min, Max, MinLength, MaxLength } from 'class-validator';

@InputType()
export class signUpInput {
  @MinLength(3)
  @Field({ nullable: false })
  name: string;

  @MinLength(3)
  @Field({ nullable: false })
  lastname: string;

  @MinLength(6)
  @MaxLength(15)
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
