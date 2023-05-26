import { customers } from 'src/database/db';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomersRepository } from './customers.repository';

export class CustomersInMemoryRepository implements CustomersRepository {
  create(data: CreateCustomerDto): Customer | Promise<Customer> {
    const newCustomer = new Customer();
    const date = Date.now();

    Object.assign(newCustomer, {
      ...data,
      createdAt: new Date(date),
    });
    customers.push(newCustomer);
    return newCustomer;
  }

  findAll(): Customer[] | Promise<Customer[]> {
    return customers;
  }

  findOne(id: string): Customer | Promise<Customer> {
    const customer = customers.find((customer) => customer.id === id);
    return customer;
  }

  update(id: string, data: UpdateCustomerDto): Customer | Promise<Customer> {
    const customerIndex = customers.findIndex((customer) => customer.id === id);
    customers[customerIndex] = { ...customers[customerIndex], ...data };
    return customers[customerIndex];
  }

  delete(id: string): void | Promise<void> {
    const customerIndex = customers.findIndex((customer) => customer.id === id);
    customers.splice(customerIndex, 1);
  }
}
