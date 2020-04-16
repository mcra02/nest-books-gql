import { Field, ArgsType, ID } from '@nestjs/graphql';
import { type } from 'os';

@ArgsType()
export class getAuthorArgs {
  @Field(type => ID, { nullable: false })
  id: number;
}
