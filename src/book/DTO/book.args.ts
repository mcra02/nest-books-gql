import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class GetBookArgs {
  @Field(type => ID, { nullable: false })
  id: number;
}
