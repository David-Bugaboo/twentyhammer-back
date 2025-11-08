import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { QueriesController } from './queries.controller';
import { PrismaService } from 'prisma/services/prisma.service';
import { QueriesRepository } from './repositories/queries.repository';
import { QueriesPrismaRepository } from './repositories/prisma/queries.prisma.repository';

@Module({
  controllers: [QueriesController],
  providers: [
    PrismaService,
    QueriesService,
    { provide: QueriesRepository, useClass: QueriesPrismaRepository },
  ],
  exports: [],
})
export class QueriesModule {}
