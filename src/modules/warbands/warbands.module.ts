import { Module } from '@nestjs/common';
import { WarbandsService } from './warbands.service';
import { WarbandsController } from './warbands.controller';
import { PrismaService } from 'prisma/services/prisma.service';
import { WarbandsRepository } from './repositories/warbands.repositories';
import { WarbandPrismaRepository } from './repositories/prisma/warband.prisma.repository';
import { QueriesService } from '../queries/queries.service';
import { QueriesRepository } from '../queries/repositories/queries.repository';
import { QueriesPrismaRepository } from '../queries/repositories/prisma/queries.prisma.repository';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';



@Module({
  controllers: [WarbandsController],
  providers: [
    PrismaService,
    WarbandsService,
    { provide: WarbandsRepository, useClass: WarbandPrismaRepository },
    QueriesService,
    { provide: QueriesRepository, useClass: QueriesPrismaRepository },
    BussinessRulesService,
  ],
})
export class WarbandsModule {}
