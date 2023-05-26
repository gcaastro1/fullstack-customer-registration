import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.customersRepository.create(createCustomerDto);
  }

  findAll() {
    return this.customersRepository.findAll();
  }

  findOne(id: string) {
    return this.customersRepository.findOne(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepository.update(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customersRepository.delete(id);
  }
}
