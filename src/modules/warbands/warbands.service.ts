import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWarbandDto } from './dto/create-warband.dto';
import { UpdateWarbandDto } from './dto/update-warband.dto';
import { WarbandsRepository } from './repositories/warbands.repositories';
import { QueryDto } from 'src/common/dtos/query.dto';
import { QueriesService } from '../queries/queries.service';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Warband } from './entities/warband.entity';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';
import { AddEquipmentToVaultDto } from './dto/add-equipment-to-vault.dto';

@Injectable()
export class WarbandsService {
  constructor(
    @Inject(WarbandsRepository)
    private readonly repo: WarbandsRepository,
    private readonly queriesService: QueriesService,
    private readonly bussinessRulesService: BussinessRulesService,
  ) {}

  async create(
    createWarbandDto: CreateWarbandDto,
    userId: string,
    factionSlug: string,
  ) {
    const leader: BaseFigure =
      await this.bussinessRulesService.getLeader(factionSlug);
    await this.bussinessRulesService.validateFaction(factionSlug);
    return this.repo.create(createWarbandDto, userId, factionSlug, leader);
  }

  findAll(query: QueryDto) {
    return this.repo.findAllWarbands(query);
  }

  findOne(id: string) {
    return this.repo.findWarbandById(id);
  }

  update(id: string, updateWarbandDto: UpdateWarbandDto) {
    return this.repo.updateWarband(id, updateWarbandDto);
  }

  remove(id: string) {
    return this.repo.deleteWarband(id);
  }

  async addSoldierToWarband(warbandId: string, soldierSlug: string) {
    const soldier = await this.bussinessRulesService.resolveFigure(soldierSlug);
    const warband = await this.resolveWarband(warbandId);
    await this.validateFigureAddition(warband, soldier);
    return this.repo.addSoldierToWarband(warbandId, soldier);
  }

  async addEquipmentToVault(
    warbandId: string,
    dto: AddEquipmentToVaultDto,
    loot: boolean,
  ) {
    const warband = await this.resolveWarband(warbandId);
    const equipment = await this.bussinessRulesService.resolveEquipment(
      dto.equipmentSlug,
    );
    const modifier = dto.modifierSlug
      ? await this.bussinessRulesService.resolveModifier(dto.modifierSlug)
      : null;

    if (modifier) {
      await this.bussinessRulesService.ValidateModifier(modifier, equipment);
    }

    await this.bussinessRulesService.validateIfBuyIsValid(
      warband,
      equipment,
      loot,
      modifier,
    );

    return this.repo.addEquipmentToWarbandVault(
      warbandId,
      equipment,
      loot,
      modifier,
    );
  }


  async undoEquipmentFromVault(warbandId: string, equipmentToVaultId: string, sell: boolean) {
    await this.resolveWarband(warbandId);
    return this.repo.undoEquipmentFromWarbandVault(
      warbandId,
      equipmentToVaultId,
      sell
    );
  }

  //helper methods

  async resolveWarband(id: string): Promise<Warband> {
    try {
      const warband = await this.repo.findWarbandById(id);
      return warband;
    } catch (error) {
      throw new NotFoundException('Bando não encontrada!');
    }
  }
  async validateFigureAddition(
    warband: Warband,
    soldier: BaseFigure,
  ): Promise<void> {
    if (warband.crowns < soldier.cost) {
      throw new BadRequestException(
        `Coroas insuficientes para comorar ${soldier.name}!`,
      );
    }
    if (warband.factionSlug !== soldier.factionSlug) {
      throw new BadRequestException(
        `${soldier.name} não pertence à facção ${warband.factionSlug}!`,
      );
    }
  }
}
