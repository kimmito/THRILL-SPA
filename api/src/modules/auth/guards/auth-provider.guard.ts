import { Request } from 'express';
import { ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class AuthProviderGuard {
  public constructor(private readonly providerService: ProviderService) {}

  public canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const providerParam = request.params.provider;
    if (!providerParam || Array.isArray(providerParam)) {
      throw new NotFoundException('Некорректный параметр провайдера.');
    }

    const provider = providerParam;

    const providerInstance = this.providerService.findByService(provider);

    if (!providerInstance) {
      throw new NotFoundException(
        `Провайдер ${provider} не найден. Проверьте правильность введенных данных.`
      );
    }
    return true;
  }
}
