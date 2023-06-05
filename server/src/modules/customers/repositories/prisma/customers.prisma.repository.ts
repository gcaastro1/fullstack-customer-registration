import { PrismaService } from 'src/database/prisma.service';
import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomersRepository } from '../customers.repository';
import { plainToInstance } from 'class-transformer';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CustomersPrismaRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCustomerDto): Promise<Customer> {
    const findCustomer = await this.findByEmail(data.email);

    if (findCustomer) throw new ConflictException('email already exists.');

    const customer = new Customer();
    const date = Date.now();
    Object.assign(customer, {
      ...data,
      createdAt: new Date(date),
    });

    const newCustomer = await this.prisma.customer.create({
      data: { ...customer },
    });

    return plainToInstance(Customer, newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    return plainToInstance(Customer, customers);
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });

    return plainToInstance(Customer, customer);
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return customer;
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    if (data.email) {
      const findCustomer = await this.prisma.customer.findUnique({
        where: { id },
      });
      if (findCustomer.email === data.email) {
        if (id == findCustomer.id) delete data.email;
        else if (findCustomer) {
          console.log(findCustomer);
          console.log(id);
          throw new ConflictException('email already exists.');
        }
      }
    }
    const customer = await this.prisma.customer.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Customer, customer);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: { id },
    });
  }
}
