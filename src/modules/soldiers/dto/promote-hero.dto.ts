import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class PromoteHeroDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skillsListSlugs!: string[];
}


