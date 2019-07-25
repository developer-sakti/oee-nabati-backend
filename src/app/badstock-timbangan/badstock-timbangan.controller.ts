import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BadstockTimbanganService } from './badstock-timbangan.service';
import { BadstockRequestCmd } from './cmd/badstock-request.command';
import { BadstockTimbangan } from './badstock-timbangan.entity';
import { Utils } from '@app/shared/utils';

@ApiUseTags('badstock')
@ApiBearerAuth()
@Controller('api/v1/badstock-timbangan')
export class BadstockTimbanganController {
    constructor(private readonly badstockTimbanganService: BadstockTimbanganService
        ) {}
    
      @Post()
      @ApiOperation({ title: 'Post BadstockTimbangan', description: 'Save BadstockTimbangan.' })
      @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
      @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
      public async post(@Body() req: BadstockRequestCmd): Promise<any> {
    
        let process = await this.badstockTimbanganService.create(new BadstockTimbangan(req));
    
        if (!process) {
            return Utils.sendResponseSaveFailed("Badstock")
        }
    
        return process;
      }
}
