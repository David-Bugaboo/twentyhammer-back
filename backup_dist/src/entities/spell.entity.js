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
exports.Spell = void 0;
const class_transformer_1 = require("class-transformer");
const spell_lore_entity_1 = require("./spell-lore.entity");
class Spell {
    id;
    slug;
    name;
    difficultyClass;
    spellLoreSlug;
    description;
    createdAt;
    keywords;
    spellLore;
}
exports.Spell = Spell;
__decorate([
    (0, class_transformer_1.Type)(() => spell_lore_entity_1.SpellLore),
    __metadata("design:type", spell_lore_entity_1.SpellLore)
], Spell.prototype, "spellLore", void 0);
//# sourceMappingURL=spell.entity.js.map