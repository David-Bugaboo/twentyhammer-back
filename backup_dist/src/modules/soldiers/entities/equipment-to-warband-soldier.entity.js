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
exports.EquipmentToWarbandSoldier = void 0;
const class_transformer_1 = require("class-transformer");
const equipment_entity_1 = require("../../../entities/equipment.entity");
const modifier_entity_1 = require("../../../entities/modifier.entity");
const warband_soldier_entity_1 = require("./warband-soldier.entity");
class EquipmentToWarbandSoldier {
    id;
    equipmentSlug;
    warbandSoldierId;
    customCost;
    modifierSlug;
    compatible;
    mainHandEquiped;
    offHandEquiped;
    helmetEquiped;
    armorEquiped;
    twoHandedEquiped;
    createdAt;
    equipment;
    modifier;
    warbandSoldier;
}
exports.EquipmentToWarbandSoldier = EquipmentToWarbandSoldier;
__decorate([
    (0, class_transformer_1.Type)(() => equipment_entity_1.Equipment),
    __metadata("design:type", equipment_entity_1.Equipment)
], EquipmentToWarbandSoldier.prototype, "equipment", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => modifier_entity_1.Modifier),
    __metadata("design:type", Object)
], EquipmentToWarbandSoldier.prototype, "modifier", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => warband_soldier_entity_1.WarbandSoldier),
    __metadata("design:type", warband_soldier_entity_1.WarbandSoldier)
], EquipmentToWarbandSoldier.prototype, "warbandSoldier", void 0);
//# sourceMappingURL=equipment-to-warband-soldier.entity.js.map