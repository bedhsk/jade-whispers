import { PartialType } from '@nestjs/swagger';
import { CreateSupernaturalEffectDto } from './create-supernatural-effect.dto';

export class UpdateSupernaturalEffectDto extends PartialType(
  CreateSupernaturalEffectDto,
) {}
