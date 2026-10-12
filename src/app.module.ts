import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { MynameModule } from './myname/myname.module';
import { AdminModule } from './admin/admin.module';
import { ExceptionModule } from './exception/exception.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_DATABASE_URL,
      }),
    }),

    UserModule,
    ProductModule,
    EmployeeModule,
    CategoryModule,
    CustomerModule,
    MynameModule,
    AdminModule,
    ExceptionModule,
    DatabaseModule,
    EnvModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
