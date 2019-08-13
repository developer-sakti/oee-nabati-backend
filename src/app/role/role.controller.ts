import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { GetRoleDto } from './dto/get-role.dto';

@Controller('api/v1/role')
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: GetRoleDto, description: 'Success!' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'role not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    @ApiOperation({ title: 'Get role', description: 'Get get rule from JWT payload.' })
    async findAll(@Req() req): Promise<GetRoleDto[]> {
        const roleList = (await this.service.findAll()).map(role => new GetRoleDto(role));
        return Promise.resolve(roleList);
    }
}
