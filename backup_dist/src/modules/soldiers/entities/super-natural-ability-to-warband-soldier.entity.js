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
exports.SuperNaturalAbilityToWarbandSoldier = void 0;
const class_transformer_1 = require("class-transformer");
const super_natural_ability_entity_1 = require("../../../entities/super-natural-ability.entity");
class SuperNaturalAbilityToWarbandSoldier {
    id;
    superNaturalAbilitySlug;
    warbandSoldierId;
    createdAt;
    superNaturalAbility;
}
exports.SuperNaturalAbilityToWarbandSoldier = SuperNaturalAbilityToWarbandSoldier;
__decorate([
    (0, class_transformer_1.Type)(() => super_natural_ability_entity_1.SuperNaturalAbility),
    __metadata("design:type", super_natural_ability_entity_1.SuperNaturalAbility)
], SuperNaturalAbilityToWarbandSoldier.prototype, "superNaturalAbility", void 0);
//# sourceMappingURL=super-natural-ability-to-warband-soldier.entity.js.map