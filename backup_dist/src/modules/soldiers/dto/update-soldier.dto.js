"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSoldierDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_soldier_dto_1 = require("./create-soldier.dto");
class UpdateSoldierDto extends (0, mapped_types_1.PartialType)(create_soldier_dto_1.CreateSoldierDto) {
}
exports.UpdateSoldierDto = UpdateSoldierDto;
//# sourceMappingURL=update-soldier.dto.js.map