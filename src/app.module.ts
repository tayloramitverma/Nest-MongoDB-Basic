import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { EmployeeModule } from './employee/employee.module';
import { AuthMiddleware } from './middleware/auth';
import { HttpExceptionFilter } from './exception';
import { APP_FILTER } from '@nestjs/core';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [
    EmployeeModule,
    PostModule,
    CatModule,
    MongooseModule.forRoot(
      'mongodb+srv://taylor:OmEXJGM5nKNulRRQ@cluster0.cch4p.mongodb.net/myNest?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user');
  }
}
