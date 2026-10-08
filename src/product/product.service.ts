import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(private readonly categoryService: CategoryService) {}

    private products = [
        {id:1, name:"Laptop",price:1000},
        {id:2, name:"Mouse",price:200},
        {id:3, name:"KeyBoard",price:300}
    ]


    getAllProducts(){
        return this.products.map(p =>({
            ...p,
            category : this.categoryService.findOne(p.id)
        }));
    }

    getProduct(id: number){
        return this.products.find(product => product.id === id);
    }
    
}
