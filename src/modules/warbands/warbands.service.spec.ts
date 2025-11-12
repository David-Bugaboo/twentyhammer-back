import { BadRequestException } from '@nestjs/common';
import { WarbandsService } from './warbands.service';
import { WarbandsRepository } from './repositories/warbands.repositories';
import { QueriesService } from '../queries/queries.service';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';

describe('WarbandsService', () => {
  let service: WarbandsService;
  let repository: jest.Mocked<WarbandsRepository>;
  let queriesService: jest.Mocked<QueriesService>;
  let businessRules: jest.Mocked<BussinessRulesService>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAllWarbands: jest.fn(),
      findWarbandById: jest.fn(),
      updateWarband: jest.fn(),
      deleteWarband: jest.fn(),
      addSoldierToWarband: jest.fn(),
      addEquipmentToWarbandVault: jest.fn(),
      undoEquipmentFromWarbandVault: jest.fn(),
    } as unknown as jest.Mocked<WarbandsRepository>;

    queriesService = {} as unknown as jest.Mocked<QueriesService>;

    businessRules = {
      getLeader: jest.fn(),
      validateFaction: jest.fn(),
      resolveFigure: jest.fn(),
      resolveEquipment: jest.fn(),
      resolveModifier: jest.fn(),
      ValidateModifier: jest.fn(),
      validateIfBuyIsValid: jest.fn(),
    } as unknown as jest.Mocked<BussinessRulesService>;

    service = new WarbandsService(repository, queriesService, businessRules);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma warband validando facção e líder', async () => {
    const dto = {
      name: 'Reiklanders',
    } as any;
    const userId = 'user-1';
    const factionSlug = 'empire';
    const leader = { id: 'leader-1' };
    const expected = { id: 'warband-1' };

    businessRules.getLeader.mockResolvedValue(leader as any);
    businessRules.validateFaction.mockResolvedValue(true);
    repository.create.mockResolvedValue(expected as any);

    await expect(service.create(dto, userId, factionSlug)).resolves.toBe(
      expected,
    );

    expect(businessRules.getLeader).toHaveBeenCalledWith(factionSlug);
    expect(businessRules.validateFaction).toHaveBeenCalledWith(factionSlug);
    expect(repository.create).toHaveBeenCalledWith(
      dto,
      userId,
      factionSlug,
      leader,
    );
  });

  it('deve validar compra de equipamento considerando modificador', async () => {
    const warbandId = 'warband-1';
    const dto = {
      equipmentSlug: 'espada-longa',
      modifierSlug: 'afiada',
    };

    const warband = { id: warbandId, crowns: 200, factionSlug: 'empire' };
    const equipment = { slug: dto.equipmentSlug, category: 'Arma Corpo a Corpo' };
    const modifier = { multiplier: 1.5 };
    const loot = false;

    repository.findWarbandById.mockResolvedValue(warband as any);

    businessRules.resolveEquipment.mockResolvedValue(equipment as any);
    businessRules.resolveModifier.mockResolvedValue(modifier as any);
    businessRules.ValidateModifier.mockResolvedValue(undefined);
    businessRules.validateIfBuyIsValid.mockResolvedValue(undefined);

    await expect(
      service.addEquipmentToVault(warbandId, dto as any, loot),
    ).resolves.toBeUndefined();

    expect(repository.findWarbandById).toHaveBeenCalledWith(warbandId);
    expect(businessRules.resolveEquipment).toHaveBeenCalledWith(dto.equipmentSlug);
    expect(businessRules.resolveModifier).toHaveBeenCalledWith(dto.modifierSlug);
    expect(businessRules.ValidateModifier).toHaveBeenCalledWith(
      modifier,
      equipment,
    );
    expect(businessRules.validateIfBuyIsValid).toHaveBeenCalledWith(
      warband,
      equipment,
      loot,
      modifier,
    );
    expect(repository.addEquipmentToWarbandVault).toHaveBeenCalledWith(
      warbandId,
      equipment,
      loot,
      modifier,
    );
  });

  it('deve impedir contratação de soldado sem coroas suficientes', async () => {
    const warbandId = 'warband-2';
    const soldierSlug = 'heroi-carismo';
    const warband = {
      id: warbandId,
      crowns: 50,
      factionSlug: 'empire',
    };
    const figure = {
      name: 'Herói Carismático',
      cost: 100,
      factionSlug: 'empire',
    };

    repository.findWarbandById.mockResolvedValue(warband as any);
    businessRules.resolveFigure.mockResolvedValue(figure as any);

    await expect(
      service.addSoldierToWarband(warbandId, soldierSlug),
    ).rejects.toThrow(BadRequestException);

    expect(repository.addSoldierToWarband).not.toHaveBeenCalled();
  });
});
