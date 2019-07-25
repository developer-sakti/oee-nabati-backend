import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetDowntimeCategoryDto } from './dto/get-downtime-category.dto';
import { DowntimeCategoryService } from './downtime-category.service';

@ApiUseTags('downtime')
@ApiBearerAuth()
@Controller('api/v1/downtime-category')
export class DowntimeCategoryController {
    constructor(private readonly downtimeCategoryService: DowntimeCategoryService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetDowntimeCategoryDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'DowntimeCategory not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get DowntimeCategory', description: 'Get DowntimeCategory from JWT payload.' })
    async findAll(@Req() req): Promise<GetDowntimeCategoryDto[]> {
        const downtimeCategoryList = (await this.downtimeCategoryService.findAll()).map(downtimeCategory => new GetDowntimeCategoryDto(downtimeCategory));
        return Promise.resolve(downtimeCategoryList);
    }
}
