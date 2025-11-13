import { Controller, Get, Post, Param, Delete, Body, Patch } from '@nestjs/common';
import { SoldiersService } from './soldiers.service';
import { UpdateSoldierDto } from './dto/update-soldier.dto';
import { PromoteHeroDto } from './dto/promote-hero.dto';

@Controller('soldiers')
export class SoldiersController {
  constructor(private readonly soldiersService: SoldiersService) {}
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.soldiersService.findSoldierById(id);
  }
  @Post(':soldierId/equipment/:warbandVaultItemId')
  async addEquipmentToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('warbandVaultItemId') warbandVaultItemId: string,
  ) {
    return this.soldiersService.addEquipmentToSoldier(
      soldierId,
      warbandVaultItemId,
    );
  }
  @Delete(':soldierId/equipment/:warbandToSoldierItemId')
  async removeEquipmentFromSoldier(
    @Param('soldierId') soldierId: string,
    @Param('warbandToSoldierItemId') warbandToSoldierItemId: string,
  ) {
    await this.soldiersService.removeEquipmentFromSoldier(
      soldierId,
      warbandToSoldierItemId,
    );
  }
  @Post('equipment/:equipmentToWarbandSoldierId/equip/:slot')
  async equipItemToSoldier(
    @Param('equipmentToWarbandSoldierId')
    equipmentToWarbandSoldierId: string,
    @Param('slot') slot: string,
  ) {
    await this.soldiersService.equipItemToSoldier(
      equipmentToWarbandSoldierId,
      slot,
    );
  }
  @Delete('equipment/:equipmentToWarbandSoldierId/unequip')
  async unequipItemFromSoldier(
    @Param('equipmentToWarbandSoldierId')
    equipmentToWarbandSoldierId: string,
  ) {
    await this.soldiersService.unequipItemFromSoldier(
      equipmentToWarbandSoldierId,
    );
  }
  @Delete(':soldierId/equipment-slot/:slot')
  async unequipSlotFromSoldier(
    @Param('soldierId') soldierId: string,
    @Param('slot') slot: string,
  ) {
    await this.soldiersService.unequipSlotFromSoldier(soldierId, slot);
  }
  @Post(':soldierId/spells/:spellSlug')
  async addSpellToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('spellSlug') spellSlug: string,
  ) {
    return this.soldiersService.addSpellToSoldier(soldierId, spellSlug);
  }
  @Delete(':soldierId/spells/:warbandSoldierSpellId')
  async removeSpellFromSoldier(
    @Param('warbandSoldierSpellId') warbandSoldierSpellId: string,
  ) {
    return this.soldiersService.removeSpellFromSoldier(warbandSoldierSpellId);
  }
  @Post(':soldierId/skills/:skillSlug')
  async addSkillToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('skillSlug') skillSlug: string,
  ) {
    return this.soldiersService.addSkillToSoldier(soldierId, skillSlug);
  }
  @Delete(':soldierId/skills/:skillToWarbandSoldierId')
  async removeSkillFromSoldier(
    @Param('skillToWarbandSoldierId') skillToWarbandSoldierId: string,
  ) {
    await this.soldiersService.removeSkillFromSoldier(skillToWarbandSoldierId);
  }
  @Delete('kill/:soldierId')
  async killSoldier(
    @Param('soldierId') soldierId: string,
  ) {
    await this.soldiersService.killSoldier(soldierId);
  }
  @Delete('undo/:soldierId')
  async undoSoldier(
    @Param('soldierId') soldierId: string,
  ) {
    await this.soldiersService.undoSoldier(soldierId);
  }
  @Post(':soldierId/injuries/:injurySlug')
  async addInjuryToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('injurySlug') injurySlug: string,
  ) {
    return this.soldiersService.addInjuryToSoldier(soldierId, injurySlug);
  }
  @Delete(':soldierId/injuries/:injuryToWarbandSoldierId')
  async removeInjuryFromSoldier(
    @Param('injuryToWarbandSoldierId') injuryToWarbandSoldierId: string,
  ) {
    await this.soldiersService.removeInjuryFromSoldier(injuryToWarbandSoldierId);
  }
  @Post(':soldierId/advancements/:advancementSlug')
  async addAdvancementToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('advancementSlug') advancementSlug: string,
  ) {
    return this.soldiersService.addAdvancementToSoldier(
      soldierId,
      advancementSlug,
    );
  }
  @Delete(':soldierId/advancements/:advancementToWarbandSoldierId')
  async removeAdvancementFromSoldier(
    @Param('advancementToWarbandSoldierId')
    advancementToWarbandSoldierId: string,
  ) {
    await this.soldiersService.removeAdvancementFromSoldier(
      advancementToWarbandSoldierId,
    );
  }
  @Post(':soldierId/supernatural-abilities/:superNaturalAbilitySlug')
  async addSuperNaturalAbilityToSoldier(
    @Param('soldierId') soldierId: string,
    @Param('superNaturalAbilitySlug') superNaturalAbilitySlug: string,
  ) {
    return this.soldiersService.addSuperNaturalAbilityToSoldier(
      soldierId,
      superNaturalAbilitySlug,
    );
  }
  @Delete(
    ':soldierId/supernatural-abilities/:superNaturalAbilityToWarbandSoldierId',
  )
  async removeSuperNaturalAbilityFromSoldier(
    @Param('superNaturalAbilityToWarbandSoldierId')
    superNaturalAbilityToWarbandSoldierId: string,
  ) {
    await this.soldiersService.removeSuperNaturalAbilityFromSoldier(
      superNaturalAbilityToWarbandSoldierId,
    );
  }

  @Patch(':soldierId')
  async updateSoldier(
    @Param('soldierId') soldierId: string,
    @Body() updateSoldierDto: UpdateSoldierDto,
  ) {
    await this.soldiersService.updateSoldier(soldierId, updateSoldierDto);
  }

  @Post(':soldierId/spells/:spellToWarbandSoldierId/fortify')
  async fortifySpell(
    @Param('spellToWarbandSoldierId') spellToWarbandSoldierId: string,
  ) {
    await this.soldiersService.fortifySpell(spellToWarbandSoldierId);
  }
  @Post(':soldierId/spells/:spellToWarbandSoldierId/unfortify')
  async unfortifySpell(
    @Param('spellToWarbandSoldierId') spellToWarbandSoldierId: string,
  ) {
    await this.soldiersService.unfortifySpell(spellToWarbandSoldierId);
  }
  @Post(':soldierId/promote/hero')
  async promoteToHero(
    @Param('soldierId') soldierId: string,
    @Body() promoteHeroDto: PromoteHeroDto,
  ) {
    await this.soldiersService.promoteToHero(
      soldierId,
      promoteHeroDto.skillsListSlugs,
    );
  }
  @Post(':soldierId/promote/leader')
  async promoteLeader(@Param('soldierId') soldierId: string) {
    await this.soldiersService.promoteLeader(soldierId);
  }
}
