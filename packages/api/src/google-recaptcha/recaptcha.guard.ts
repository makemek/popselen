import {
  CanActivate,
  ExecutionContext,
  Inject,
  mixin,
  Type,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { RecaptchaEnterpriseService } from "src/google-recaptcha/recaptcha-enterprise.service";
import { RecaptchaService } from "src/google-recaptcha/recaptcha.service";

export function reCaptchaGuard(action: string): Type<CanActivate> {
  class MixinReCaptchaGuard implements CanActivate {
    @Inject(ConfigService)
    protected configService: ConfigService;
    @Inject(RecaptchaEnterpriseService)
    protected recaptchaEnterpriseV3Service: RecaptchaEnterpriseService;
    @Inject(RecaptchaService)
    protected recaptchaV3Service: RecaptchaService;

    async canActivate(context: ExecutionContext) {
      const isRecaptchaEnable =
        this.configService.get("RECAPTCHA_ENABLE") === "true";
      const isEnterprise =
        this.configService.get("RECAPTCHA_ENTERPRISE") === "true";
      const { recaptcha } = context.switchToHttp().getRequest<Request>().body;

      if (!isRecaptchaEnable) {
        return true;
      }
      if (isEnterprise) {
        return this.recaptchaEnterpriseV3Service.assess(recaptcha, action);
      }
      return this.recaptchaV3Service.assess(recaptcha, action);
    }
  }

  const guard = mixin(MixinReCaptchaGuard);
  return guard;
}
