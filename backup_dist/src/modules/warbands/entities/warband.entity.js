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
exports.Warband = void 0;
const class_transformer_1 = require("class-transformer");
const warband_soldier_entity_1 = require("../../soldiers/entities/warband-soldier.entity");
const equipment_to_vault_entity_1 = require("./equipment-to-vault.entity");
const faction_entity_1 = require("./faction.entity");
const user_entity_1 = require("../../../entities/user.entity");
class Warband {
    id;
    name;
    crowns;
    wyrdstone;
    factionSlug;
    userId;
    vault;
    warbandSoldiers;
    faction;
    user;
    createdAt;
}
exports.Warband = Warband;
__decorate([
    (0, class_transformer_1.Type)(() => equipment_to_vault_entity_1.EquipmentToVault),
    __metadata("design:type", Array)
], Warband.prototype, "vault", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => warband_soldier_entity_1.WarbandSoldier),
    __metadata("design:type", Array)
], Warband.prototype, "warbandSoldiers", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => faction_entity_1.Faction),
    __metadata("design:type", Object)
], Warband.prototype, "faction", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Warband.prototype, "user", void 0);
//# sourceMappingURL=warband.entity.js.map