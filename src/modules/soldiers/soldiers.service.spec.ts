import { SoldiersService } from './soldiers.service';
import { SoldiersRepository } from './repositories/soldiers.repository';
import { WarbandsService } from '../warbands/warbands.service';
import { QueriesService } from '../queries/queries.service';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';

describe('SoldiersService', () => {
  let service: SoldiersService;
  let repository: jest.Mocked<SoldiersRepository>;
  let warbandsService: jest.Mocked<WarbandsService>;
  let queriesService: jest.Mocked<QueriesService>;
  let businessRules: jest.Mocked<BussinessRulesService>;

  beforeEach(() => {
    repository = {
      findSoldierById: jest.fn(),
      addSpellToSoldier: jest.fn(),
      addSkillToSoldier: jest.fn(),
      addInjuryToSoldier: jest.fn(),
      addAdvancementToSoldier: jest.fn(),
      addSuperNaturalAbilityToSoldier: jest.fn(),
    } as unknown as jest.Mocked<SoldiersRepository>;

    warbandsService = {
      addEquipmentToVault: jest.fn(),
    } as unknown as jest.Mocked<WarbandsService>;

    queriesService = {} as unknown as jest.Mocked<QueriesService>;

    businessRules = {
      validateSpell: jest.fn(),
      validateSkill: jest.fn(),
      validateInjury: jest.fn(),
      validateAdvancement: jest.fn(),
      validateSuperNaturalAbility: jest.fn(),
    } as unknown as jest.Mocked<BussinessRulesService>;

    service = new SoldiersService(
      repository,
      warbandsService,
      queriesService,
      businessRules,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve validar e adicionar uma magia para o soldado', async () => {
    const soldierId = 'soldier-1';
    const spellSlug = 'nova-magia';
    const soldier = {
      spells: [{ spellSlug: 'magia-antiga' }],
      skills: [{ skillSlug: 'aprendizado-arcano' }],
      baseFigure: [
        {
          baseFigure: {
            spellLores: [{ spellLoreSlug: 'tradicao-fogo' }],
          },
        },
      ],
    };

    repository.findSoldierById.mockResolvedValue(soldier as any);
    repository.addSpellToSoldier.mockResolvedValue(undefined);
    businessRules.validateSpell.mockResolvedValue(undefined);

    await expect(
      service.addSpellToSoldier(soldierId, spellSlug),
    ).resolves.toBeUndefined();

    expect(businessRules.validateSpell).toHaveBeenCalledWith(
      spellSlug,
      ['tradicao-fogo'],
      ['magia-antiga'],
      ['aprendizado-arcano'],
    );
    expect(repository.addSpellToSoldier).toHaveBeenCalledWith(
      soldierId,
      spellSlug,
    );
  });

  it('deve validar listas combinadas ao adicionar uma habilidade', async () => {
    const soldierId = 'soldier-2';
    const skillSlug = 'habilidade-nova';
    const soldier = {
      skills: [{ skillSlug: 'habilidade-antiga' }],
      promotedHeroSkillLists: [{ skillListSlug: 'lista-promovida' }],
      baseFigure: [
        {
          baseFigure: {
            skillLists: [{ skillListSlug: 'lista-base' }],
          },
        },
      ],
    };

    repository.findSoldierById.mockResolvedValue(soldier as any);
    repository.addSkillToSoldier.mockResolvedValue(undefined);
    businessRules.validateSkill.mockResolvedValue(undefined);

    await expect(
      service.addSkillToSoldier(soldierId, skillSlug),
    ).resolves.toBeUndefined();

    expect(businessRules.validateSkill).toHaveBeenCalledWith(
      skillSlug,
      ['habilidade-antiga'],
      ['lista-base', 'lista-promovida'],
    );
    expect(repository.addSkillToSoldier).toHaveBeenCalledWith(
      soldierId,
      skillSlug,
    );
  });

  it('deve validar ferimentos considerando o papel do soldado', async () => {
    const soldierId = 'soldier-3';
    const injurySlug = 'ferimento-grave';
    const soldier = {
      injuries: [{ injurySlug: 'ferimento-leve' }],
      effectiveRole: 'HEROI',
    };

    repository.findSoldierById.mockResolvedValue(soldier as any);
    repository.addInjuryToSoldier.mockResolvedValue(undefined);
    businessRules.validateInjury.mockResolvedValue(undefined);

    await expect(
      service.addInjuryToSoldier(soldierId, injurySlug),
    ).resolves.toBeUndefined();

    expect(businessRules.validateInjury).toHaveBeenCalledWith(
      injurySlug,
      ['ferimento-leve'],
      'HEROI',
    );
    expect(repository.addInjuryToSoldier).toHaveBeenCalledWith(
      soldierId,
      injurySlug,
    );
  });

  it('deve validar habilidades sobrenaturais antes de adicionar', async () => {
    const soldierId = 'soldier-4';
    const abilitySlug = 'tentaculo';
    const soldier = {
      supernaturalAbilities: [{ superNaturalAbilitySlug: 'frenesi' }],
      baseFigure: [
        {
          baseFigure: {
            canGetMutations: true,
            canGetBlessings: true,
            canGetSacredMarks: true,
          },
        },
      ],
      skills: [{ skillSlug: 'linhagem-corrompida' }],
      warband: { crowns: 150 },
    };

    repository.findSoldierById.mockResolvedValue(soldier as any);
    repository.addSuperNaturalAbilityToSoldier.mockResolvedValue(undefined);
    businessRules.validateSuperNaturalAbility.mockResolvedValue(undefined);

    await expect(
      service.addSuperNaturalAbilityToSoldier(soldierId, abilitySlug),
    ).resolves.toBeUndefined();

    expect(businessRules.validateSuperNaturalAbility).toHaveBeenCalledWith(
      abilitySlug,
      ['frenesi'],
      soldier.baseFigure[0].baseFigure,
      ['linhagem-corrompida'],
      150,
    );
    expect(repository.addSuperNaturalAbilityToSoldier).toHaveBeenCalledWith(
      soldierId,
      abilitySlug,
    );
  });
});
