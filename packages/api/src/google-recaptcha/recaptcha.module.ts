import { Module } from "@nestjs/common";
import { RecaptchaEnterpriseService } from "./recaptcha-enterprise.service";
import { RecaptchaService } from "./recaptcha.service";

@Module({
  providers: [RecaptchaService, RecaptchaEnterpriseService],
  exports: [RecaptchaService, RecaptchaEnterpriseService],
})
export class RecaptchaModule {}
