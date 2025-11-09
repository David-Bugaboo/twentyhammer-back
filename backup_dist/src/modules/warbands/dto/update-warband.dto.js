"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWarbandDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_warband_dto_1 = require("./create-warband.dto");
class UpdateWarbandDto extends (0, mapped_types_1.PartialType)(create_warband_dto_1.CreateWarbandDto) {
}
exports.UpdateWarbandDto = UpdateWarbandDto;
//# sourceMappingURL=update-warband.dto.js.map