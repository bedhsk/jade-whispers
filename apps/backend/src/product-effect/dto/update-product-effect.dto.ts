import { PartialType } from '@nestjs/swagger';
import { CreateProductEffectDto } from './create-product-effect.dto';

export class UpdateProductEffectDto extends PartialType(CreateProductEffectDto) {}
