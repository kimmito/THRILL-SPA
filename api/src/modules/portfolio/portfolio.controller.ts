import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getAll() {
    return this.portfolioService.getAll();
  }

  @Get(':section')
  getBySection(section: 'NAILS' | 'BROWS' | 'LASHES') {
    return this.portfolioService.getBySection(section);
  }
}
