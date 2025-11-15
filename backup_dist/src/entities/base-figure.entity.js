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
exports.BaseFigure = void 0;
const class_transformer_1 = require("class-transformer");
const figure_to_avaiable_equipment_entity_1 = require("./figure-to-avaiable-equipment.entity");
const figure_to_skill_list_entity_1 = require("./figure-to-skill-list.entity");
const figure_to_spell_lore_entity_1 = require("./figure-to-spell-lore.entity");
class BaseFigure {
    id;
    name;
    role;
    slug;
    lore;
    avaiability;
    exclusions;
    quality;
    canGetMutations;
    canGetSacredMarks;
    canGetBlessings;
    race;
    factionSlug;
    cost;
    movement;
    fight;
    shoot;
    armour;
    will;
    health;
    strength;
    equipmentSlots;
    startingXp;
    createdAt;
    specialRules;
    naturalAttacks;
    avaiableEquipment;
    skillLists;
    spellLores;
    mercenaryStartingEquipment;
    legendStartingEquipment;
    legendStartingSpells;
    legendStartingSkills;
}
exports.BaseFigure = BaseFigure;
__decorate([
    (0, class_transformer_1.Type)(() => figure_to_avaiable_equipment_entity_1.FigureToAvaiableEquipment),
    __metadata("design:type", Array)
], BaseFigure.prototype, "avaiableEquipment", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => figure_to_skill_list_entity_1.FigureToSkillList),
    __metadata("design:type", Array)
], BaseFigure.prototype, "skillLists", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => figure_to_spell_lore_entity_1.FigureToSpellLore),
    __metadata("design:type", Array)
], BaseFigure.prototype, "spellLores", void 0);
//# sourceMappingURL=base-figure.entity.js.map