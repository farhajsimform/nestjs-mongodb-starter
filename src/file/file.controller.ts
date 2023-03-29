import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('news')
export class FileController {
  constructor(private fileService: FileService) {}
  @Get('crypto')
  async cryptoNews() {
    return this.fileService.getFile();
  }
}
