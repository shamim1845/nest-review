import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports:[CategoryModule],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}
