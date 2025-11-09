"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarbandSoldier = void 0;
const class_transformer_1 = require("class-transformer");
const base_figure_to_warband_soldier_entity_1 = require("./base-figure-to-warband-soldier.entity");
const equipment_to_warband_soldier_entity_1 = require("./equipment-to-warband-soldier.entity");
const extra_skill_list_to_warband_soldier_entity_1 = require("./extra-skill-list-to-warband-soldier.entity");
const extra_spell_lore_to_warband_soldier_entity_1 = require("./extra-spell-lore-to-warband-soldier.entity");
const gift_of_tzeentch_to_warband_soldier_entity_1 = require("./gift-of-tzeentch-to-warband-soldier.entity");
const injury_to_warband_soldier_entity_1 = require("./injury-to-warband-soldier.entity");
const skill_to_warband_soldier_entity_1 = require("./skill-to-warband-soldier.entity");
const spell_to_warband_soldier_entity_1 = require("./spell-to-warband-soldier.entity");
const advancement_to_warband_soldier_entity_1 = require("./advancement-to-warband-soldier.entity");
const super_natural_ability_to_warband_soldier_entity_1 = require("./super-natural-ability-to-warband-soldier.entity");
const promoted_hero_skill_list_entity_1 = require("./promoted-hero-skill-list.entity");
const warband_entity_1 = require("../../warbands/entities/warband.entity");
class WarbandSoldier {
    id;
    campaignName;
    warbandId;
    experience;
    effectiveRole;
    createdAt;
    extraSpecialRules;
    advancements;
    baseFigure;
    equipment;
    extraSkillLists;
    extraSpellLists;
    giftsOfTzeentch;
    injuries;
    skills;
    spells;
    supernaturalAbilities;
    promotedHeroSkillLists;
    warband;
}
exports.WarbandSoldier = WarbandSoldier;
__decorate([
    (0, class_transformer_1.Type)(() => advancement_to_warband_soldier_entity_1.AdvancementToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "advancements", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => base_figure_to_warband_soldier_entity_1.BaseFigureToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "baseFigure", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => equipment_to_warband_soldier_entity_1.EquipmentToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "equipment", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => extra_skill_list_to_warband_soldier_entity_1.ExtraSkillListToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "extraSkillLists", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => extra_spell_lore_to_warband_soldier_entity_1.ExtraSpellLoreToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "extraSpellLists", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => gift_of_tzeentch_to_warband_soldier_entity_1.GiftOfTzeentchToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "giftsOfTzeentch", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => injury_to_warband_soldier_entity_1.InjuryToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "injuries", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => skill_to_warband_soldier_entity_1.SkillToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "skills", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => spell_to_warband_soldier_entity_1.SpellToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "spells", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => super_natural_ability_to_warband_soldier_entity_1.SuperNaturalAbilityToWarbandSoldier),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "supernaturalAbilities", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => promoted_hero_skill_list_entity_1.PromotedHeroSkillLists),
    __metadata("design:type", Array)
], WarbandSoldier.prototype, "promotedHeroSkillLists", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => warband_entity_1.Warband),
    __metadata("design:type", warband_entity_1.Warband)
], WarbandSoldier.prototype, "warband", void 0);
//# sourceMappingURL=warband-soldier.entity.js.map