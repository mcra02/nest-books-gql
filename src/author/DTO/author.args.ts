import { Field, ArgsType, ID } from '@nestjs/graphql';

@ArgsType()
export class GetAuthorArgs {
  @Field(type => ID, { nullable: false })
  id: number;
}
