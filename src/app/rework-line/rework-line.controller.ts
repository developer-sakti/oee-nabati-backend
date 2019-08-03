import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReworkLineService } from './rework-line.service';
import { ReworkLineCmd } from './cmd/rework-line-request.command';
import { ReworkLine } from './rework-line.entity';
import { Utils } from '@app/shared/utils';

@ApiUseTags('rework-line')
@ApiBearerAuth()
@Controller('api/v1/lakban/rework-line')
export class ReworkLineController {
    constructor(private readonly reworkLineService: ReworkLineService) {}
    
    @Post()
    @ApiOperation({ title: 'Post Rework Line', description: 'Save Rework Line.' })
    @ApiResponse({ description: 'Success!', status: HttpStatus.OK})
    @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
    public async post(@Body() req: ReworkLineCmd): Promise<any> {
        let process = await this.reworkLineService.create(new ReworkLine(req));

        if (!process) {
            return Utils.sendResponseSaveFailed("Rework Line")
        }
        return Utils.sendResponseSaveSuccess(process);
    }}
