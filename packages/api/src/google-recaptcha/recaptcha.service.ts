import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { stringify } from "qs";

// https://developers.google.com/recaptcha/docs/v3#site_verify_response
interface ReCaptchaVerifyTokenResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

@Injectable()
export class RecaptchaService {
  constructor(private readonly configService: ConfigService) {}

  async assess(recaptcha: string, action: string) {
    const response = await this.makeRequest(recaptcha);
    return this.verify(response, action);
  }

  async makeRequest(recaptcha: string) {
    const secret = this.configService.get("RECAPTCHA_SECRET_KEY");
    const payload = {
      secret,
      response: recaptcha,
    };
    const { data } = await axios.post<ReCaptchaVerifyTokenResponse>(
      "https://www.google.com/recaptcha/api/siteverify",
      stringify(payload),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    );

    return data;
  }

  verify(response: ReCaptchaVerifyTokenResponse, action: string) {
    const minScore = +this.configService.get("RECAPTCHA_MIN_SCORE");
    const { success, score, action: captchaAction } = response;
    const matchAction = captchaAction === action;

    return success && score >= minScore && matchAction;
  }
}
