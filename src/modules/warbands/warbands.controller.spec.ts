import { Test, TestingModule } from '@nestjs/testing';
import { WarbandsController } from './warbands.controller';
import { WarbandsService } from './warbands.service';

describe('WarbandsController', () => {
  let controller: WarbandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarbandsController],
      providers: [WarbandsService],
    }).compile();

    controller = module.get<WarbandsController>(WarbandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
