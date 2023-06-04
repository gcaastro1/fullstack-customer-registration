import { Injectable } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '@prisma/client';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateAccount(customerEmail: string, customerPassword: string) {
    const customer = await this.customersService.findByEmail(customerEmail);

    if (customer) {
      const passwordMatch = await compare(customerPassword, customer.password);
      if (passwordMatch) {
        return { email: customer.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const customer = await this.customersService.findByEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: customer.id }),
    };
  }
}
