import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { UpdateCustomerDto } from '../../dto/update-customer.dto';
import { Customer } from '../../entities/customer.entity';
import { CustomersRepository } from '../customers.repository';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

export class CustomersPrismaRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer();
    const date = Date.now();
    Object.assign(customer, {
      ...data,
      createdAt: new Date(date),
    });

    const newUser = await this.prisma.customer.create({
      data: { ...customer },
    });

    return plainToInstance(Customer, newUser);
  }

  async findAll(): Promise<Customer[]> {
    const customers: Customer[] = await this.prisma.customer.findMany();

    return plainToInstance(Customer, customers);
  }

  async findOne(id: string): Promise<Customer> {
    const customer: Customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    return plainToInstance(Customer, customer);
  }

  async update(id: string, data: UpdateCustomerDto): Promise<Customer> {
    const customer: Customer = await this.prisma.customer.update({
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
