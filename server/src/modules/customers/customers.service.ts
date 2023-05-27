import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersRepository.create(createCustomerDto);
    return customer;
  }

  async findAll() {
    const customers = await this.customersRepository.findAll();
    return customers;
  }

  async findOne(id: string) {
    const findCustomer = await this.customersRepository.findOne(id);

    if (!findCustomer) {
      throw new NotFoundException('customer not found');
    }

    return findCustomer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const findCustomer = await this.customersRepository.findOne(id);

    if (!findCustomer) {
      throw new NotFoundException('customer not found');
    }

    const customer = await this.customersRepository.update(
      id,
      updateCustomerDto,
    );

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
