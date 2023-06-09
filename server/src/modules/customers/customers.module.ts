import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CustomersRepository } from './repositories/customers.repository';
import { CustomersPrismaRepository } from './repositories/prisma/customers.prisma.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    PrismaService,
    { provide: CustomersRepository, useClass: CustomersPrismaRepository },
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
