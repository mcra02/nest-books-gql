import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { GqlAuthGuard } from './gql.guard';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';

const context = {
  prisma: new PrismaService(),
  pubsub: new PubSub(),
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: './src/Schema.graphql',
      context: Request => {
        const headers = Request.req.headers;
        return {
          ...Request,
          ...context,
          headers,
        };
      },
    }),
    UserModule,
    AuthModule,
    AuthorModule,
    BookModule,
  ],
  providers: [GqlAuthGuard],
})
export class AppModule {}
