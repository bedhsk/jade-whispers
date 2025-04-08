import { PartialType } from '@nestjs/swagger';
import { CreateProductImageDto } from './create-product-image.dto';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}

export class ReorderImagesDto {
  imageIds: number[];
}
