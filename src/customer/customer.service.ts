import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  private customers: ICustomer[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
  ];

  create(createCustomerDto: CreateCustomerDto) {
    const id = this.customers[this.customers.length - 1].id + 1;
    const customer: ICustomer = {
      id,
      ...createCustomerDto,
    };
    this.customers.push(customer);
    return customer;
  }

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = this.findOne(id);

    Object.assign(customer, updateCustomerDto);

    return customer;
  }

  remove(id: number) {
    const customer = this.findOne(id);
    this.customers = this.customers.filter((customer) => customer.id !== id);
    return customer;
  }
}
