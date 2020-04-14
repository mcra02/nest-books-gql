import { Field, ArgsType, ID } from '@nestjs/graphql';

@ArgsType()
export class getUserArgs {
  @Field(type => ID, { nullable: false })
  id: number;
}
