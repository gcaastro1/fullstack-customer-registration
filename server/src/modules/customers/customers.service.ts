import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}
  async create(data: CreateCustomerDto) {
    const customer = await this.customersRepository.create(data);
    return customer;
  }

  async findAll() {
    const customers = await this.customersRepository.findAll();
    return customers;
  }

  async findOne(id: string) {
    const findCustomer = await this.customersRepository.findOne(id);

    if (!findCustomer) {
      throw new NotFoundException('customer not found.');
    }

    return findCustomer;
  }

  async findByEmail(email: string) {
    const customer: Customer = await this.customersRepository.findByEmail(
      email,
    );

    return customer;
  }

  async update(id: string, data: UpdateCustomerDto) {
    const customer = await this.customersRepository.update(id, data);

    return customer;
  }

  async remove(id: string) {
    const findCustomer = await this.customersRepository.findOne(id);

    if (!findCustomer) {
      throw new NotFoundException('customer not found');
    }

    await this.customersRepository.delete(id);

    return;
  }
}
