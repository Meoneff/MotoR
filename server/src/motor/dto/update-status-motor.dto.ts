// Trong file dto/update-status.dto.ts
import { IsArray, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
