import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/initial-sku')
export class InitialSkuController {
    @Get()
    index() : string {
        return "Initial sku Test"
    }
}
