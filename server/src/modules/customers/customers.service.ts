import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
// import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from 'src/database/prisma.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  // constructor(private customersRepository: CustomersRepository) {}
  async create(data: CreateCustomerDto, email: string) {
    /*  const customer = await this.customersRepository.create(data);
    return customer; */
    const findCustomer: Customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (findCustomer) {
      throw new ConflictException('email already exists.');
    }

    const customer = new Customer();
    const date = Date.now();
    Object.assign(customer, {
      ...data,
      createdAt: new Date(date),
    });

    const newUser = await this.prisma.customer.create({
      data: { ...customer },
    });
    return newUser;
  }

  async findAll() {
    const customers: Customer[] = await this.prisma.customer.findMany({
      include: {
        contacts: true,
      },
    }); //await this.customersRepository.findAll();
    return customers;
  }

  async findOne(id: string) {
    // const findCustomer = await this.customersRepository.findOne(id);
    const findCustomer: Customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });

    if (!findCustomer) {
      throw new NotFoundException('customer not found.');
    }

    return findCustomer;
  }

  async update(id: string, data: UpdateCustomerDto) {
    const findCustomer = await this.prisma.customer.findUnique({
      where: { id },
    });

    //await this.customersRepository.findOne(id);

    if (!findCustomer) {
      throw new NotFoundException('customer not found.');
    }

    const customer: Customer = await this.prisma.customer.update({
      where: { id },
      data: { ...data },
    });

    // const customer = await this.customersRepository.update(
    // id,
    // updateCustomerDto,
    // );

    return customer;
  }

  async remove(id: string) {
    // const findCustomer = await this.customersRepository.findOne(id);

    /* if (!findCustomer) {
      throw new NotFoundException('customer not found');
    }

    await this.customersRepository.delete(id); */
    const findCustomer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!findCustomer) {
      throw new NotFoundException('customer not found.');
    }

    await this.prisma.customer.delete({
      where: { id },
    });

    return;
  }
}
