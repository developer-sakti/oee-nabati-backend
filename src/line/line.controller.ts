import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetLineDto } from './dto/get-line.dto';
import { LineService } from './line.service';
import { Connection } from 'typeorm';

@ApiUseTags('line')
@ApiBearerAuth()
@Controller('api/v1/line')
export class LineController {
    constructor(private readonly lineService: LineService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetLineDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Line not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get line', description: 'Get get line from JWT payload.' })
    async findAll(@Req() req): Promise<GetLineDto[]> {
        const lineList = (await this.lineService.findAll()).map(line => new GetLineDto(line));
        return Promise.resolve(lineList);
    }
}
