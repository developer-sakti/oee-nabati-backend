import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { RulesService } from './rules.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetRulesDto } from './dto/get-rules.dto';

@Controller('api/v1/rules')
export class RulesController {
    constructor(private readonly rulesService: RulesService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetRulesDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'rule not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get rule', description: 'Get get rule from JWT payload.' })
    async findAll(@Req() req): Promise<GetRulesDto[]> {
        const ruleList = (await this.rulesService.findAll()).map(rule => new GetRulesDto(rule));
        return Promise.resolve(ruleList);
    }
}
