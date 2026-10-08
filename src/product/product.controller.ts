import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @UseGuards(AuthGuard)
    @Get()
    getProducts(){
        return this.productService.getAllProducts();
    }

    @Get(":id")
    getProduct(@Param("id") id: string){
        return this.productService.getProduct(+id);
    }
}
