import { Module } from '@nestjs/common';
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

@Module({
  imports: [UserModule, ProductModule, EmployeeModule, CategoryModule, CustomerModule, MynameModule, AdminModule, ExceptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
