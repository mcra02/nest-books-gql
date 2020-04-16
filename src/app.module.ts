import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { GqlAuthGuard } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

const context = {
  prisma: new PrismaService(),
};

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/Schema.graphql',
      context: Request => {
        return {
          ...Request,
          ...context,
        };
      },
    }),
    UserModule,
    AuthModule,
    AuthorModule,
  ],
  providers: [GqlAuthGuard],
})
export class AppModule {}
