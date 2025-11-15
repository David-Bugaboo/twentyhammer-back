import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { WarbandsService } from './warbands.service';
import { CreateWarbandDto } from './dto/create-warband.dto';
import { UpdateWarbandDto } from './dto/update-warband.dto';
import { QueryDto } from 'src/common/dtos/query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { QueriesService } from '../queries/queries.service';
import { AddEquipmentToVaultDto } from './dto/add-equipment-to-vault.dto';

@Controller('warbands')
export class WarbandsController {
  constructor(
    private readonly warbandsService: WarbandsService,
    private readonly queriesService: QueriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':factionSlug')
  async create(
    @Body() createWarbandDto: CreateWarbandDto,
    @Req() req: Request,
    @Param('factionSlug') factionSlug: string,
  ) {
    const leader = await this.queriesService.findAllBaseFigures({
      role: 'LIDER',
      factionSlug,
    });
    console.log(leader);
    return this.warbandsService.create(
      createWarbandDto,
      req.user!.id,
      factionSlug,
    );
  }
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.warbandsService.findAll(query);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.warbandsService.findOne(id, req.user!.id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarbandDto: UpdateWarbandDto) {
    return this.warbandsService.update(id, updateWarbandDto);
  }
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warbandsService.remove(id);
  }
  @Post(':id/add-figure/:figureSlug')
  addFigure(@Param('id') id: string, @Param(`figureSlug`) figureSlug: string) {
    return this.warbandsService.addSoldierToWarband(id, figureSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/vault')
  addEquipmentToVault(
    @Param('id') id: string,
    @Body() dto: AddEquipmentToVaultDto,
    @Query('loot') loot: string,
  ) {
    const boolLoot = loot === 'true' ? true : false;
    
    console.log(loot);
    return this.warbandsService.addEquipmentToVault(id, dto, boolLoot);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':warbandId/undoFromVault/:warbandToVaultItem')
  undoEquipmentFromVault(
    @Param('warbandId') warbandId: string,
    @Param('warbandToVaultItem') warbandToVaultItem: string,
    @Query('sell') sell: string,
  ) {
    const boolSell = sell === 'true' ? true : false;
    console.log(sell);
    return this.warbandsService.undoEquipmentFromVault(
      warbandId,
      warbandToVaultItem,
      boolSell,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':warbandId/fire/:warbandToSoldierId')
  fireSoldierFromWarband(
    @Param('warbandId') warbandId: string,
    @Param('warbandToSoldierId') warbandToSoldierId: string,
  ) {
    return this.warbandsService.fireSoldierFromWarband(
      warbandId,
      warbandToSoldierId,
    );
  }
  @Post(':id/share')
  shareWarband(@Param('id') id: string) {
    return this.warbandsService.createSharedLink(id);
  }
  @Patch(':id/share')
  updateSharedLink(@Param('id') id: string) {
    return this.warbandsService.updateSharedLink(id);
  }
  @Get('shared-link/:id')
  findSharedLinkById(@Param('id') id: string) {
    return this.warbandsService.findSharedLinkById(id);
  }
}
