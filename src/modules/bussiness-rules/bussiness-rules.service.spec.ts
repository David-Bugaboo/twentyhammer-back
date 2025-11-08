import { BadRequestException } from '@nestjs/common';
import { BussinessRulesService } from './bussiness-rules.service';
import { Equipment } from 'src/entities/equipment.entity';
import { EquipmentToWarbandSoldier } from '../soldiers/entities/equipment-to-warband-soldier.entity';

describe('BussinessRulesService - validateEquip', () => {
  let service: BussinessRulesService;

  beforeEach(() => {
    service = new BussinessRulesService({} as any);
  });

  const createEquipment = (
    overrides: Partial<Equipment> = {},
  ): Equipment => ({
    id: 'equipment-id',
    slug: 'equipment-slug',
    name: 'Equipment',
    cost: 10,
    category: 'Arma Corpo a Corpo',
    rarity: 1,
    avaiability: [],
    exclusions: [],
    createdAt: new Date('2024-01-01'),
    specialRules: [],
    armourBonus: null,
    damageBonus: null,
    movementPenalty: null,
    range: null,
    slot: null,
    ...overrides,
  });

  const createEquipmentBinding = (
    equipment: Equipment,
    overrides: Partial<EquipmentToWarbandSoldier> = {},
  ): EquipmentToWarbandSoldier => ({
    id: 'binding-id',
    equipmentSlug: equipment.slug,
    warbandSoldierId: 'soldier-id',
    compatible: true,
    mainHandEqquiped: false,
    offHandEqquiped: false,
    helmetEqquiped: false,
    armorEquipped: false,
    twoHandedEqquiped: false,
    createdAt: new Date('2024-01-01'),
    equipment,
    modifier: null,
    warbandSoldier: undefined,
    ...overrides,
  });

  it('deve lançar se equipamento de duas mãos for equipado na mão principal', async () => {
    const twoHanded = createEquipment({
      specialRules: [
        { label: 'Duas Mãos', value: 'two-hand' },
      ] as any,
    });
    const binding = createEquipmentBinding(twoHanded);

    await expect(
      service.validateEquip(
        binding,
        [],
        [],
        [],
        [],
        [],
        'mainHand',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('deve lançar se houver arma desbalanceada na mão principal ao equipar mão secundária', async () => {
    const unbalanced = createEquipment({
      specialRules: [
        { label: 'Desbalanceada', value: 'unbalanced' },
      ] as any,
    });
    const unbalancedBinding = createEquipmentBinding(unbalanced, {
      mainHandEqquiped: true,
    });

    const newOffhand = createEquipment();
    const newBinding = createEquipmentBinding(newOffhand);

    await expect(
      service.validateEquip(
        newBinding,
        [unbalancedBinding],
        [],
        [],
        [],
        [],
        'offhand',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('deve permitir equipamento válido com regras especiais em formato Json', async () => {
    const versatileWeapon = createEquipment({
      specialRules: [
        { label: 'Versátil', value: 'versatile' },
      ] as any,
    });
    const binding = createEquipmentBinding(versatileWeapon);

    await expect(
      service.validateEquip(
        binding,
        [],
        [],
        [],
        [],
        [],
        'twoHand',
      ),
    ).resolves.toBeUndefined();
  });
});

