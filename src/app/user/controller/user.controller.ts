import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/user')
export class UserController {
    @Get()
    index() : string {
        return "Test user service"
    }
}
