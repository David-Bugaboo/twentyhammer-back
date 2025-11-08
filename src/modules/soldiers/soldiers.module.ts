import { Module } from '@nestjs/common';
import { SoldiersService } from './soldiers.service';
import { SoldiersController } from './soldiers.controller';
import { PrismaService } from 'prisma/services/prisma.service';
import { SoldiersRepository } from './repositories/soldiers.repository';
import { SoldiersPrismaRepository } from './repositories/prisma/soldiers.prisma.repository';
import { WarbandPrismaRepository } from '../warbands/repositories/prisma/warband.prisma.repository';
import { WarbandsRepository } from '../warbands/repositories/warbands.repositories';
import { WarbandsService } from '../warbands/warbands.service';
import { QueriesService } from '../queries/queries.service';
import { QueriesRepository } from '../queries/repositories/queries.repository';
import { QueriesPrismaRepository } from '../queries/repositories/prisma/queries.prisma.repository';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';

@Module({
  controllers: [SoldiersController],
  providers: [
    SoldiersService,
    PrismaService,
    {
      provide: SoldiersRepository,
      useClass: SoldiersPrismaRepository,
    },
    WarbandsService,
    {
      provide: WarbandsRepository,
      useClass: WarbandPrismaRepository,
    },
    QueriesService,
    {
      provide: QueriesRepository,
      useClass: QueriesPrismaRepository,
    },
    BussinessRulesService,

  ],
})
export class SoldiersModule {}
