import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BadstockCategoryService } from './badstock-category.service';
import { GetBadstockCategoryDto } from './dto/get-badstock-category.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('badstock')
@ApiBearerAuth()
@Controller('api/v1/badstock-category')
export class BadstockCategoryController {
    constructor(private readonly badstockCategoryService: BadstockCategoryService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: HttpStatus.OK, type: GetBadstockCategoryDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'BadstockCategory not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get BadstockCategory', description: 'Get BadstockCategory from JWT payload.' })
    async findAll(@Req() req): Promise<GetBadstockCategoryDto[]> {
        const badstockCategoryList = (await this.badstockCategoryService.findAll()).map(badstockCategory => new GetBadstockCategoryDto(badstockCategory));
        return Promise.resolve(badstockCategoryList);
    }
}
