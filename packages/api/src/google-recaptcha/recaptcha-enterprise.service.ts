import { protos } from "@google-cloud/recaptcha-enterprise";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

type IAssessment = protos.google.cloud.recaptchaenterprise.v1.IAssessment;

@Injectable()
export class RecaptchaEnterpriseService {
  constructor(private readonly configService: ConfigService) {}

  async assess(recaptcha: string, action: string) {
    const response = await this.makeRequest(recaptcha, action);
    return this.verify(response, action);
  }

  async makeRequest(recaptcha: string, action: string) {
    const projectId: string = this.configService.get(
      "RECAPTCHA_ENTERPRISE_PROJECT_ID",
    );
    const apiKey: string = this.configService.get(
      "RECAPTCHA_ENTERPRISE_API_KEY",
    );
    const siteKey: string = this.configService.get(
      "RECAPTCHA_ENTERPRISE_SITE_KEY",
    );

    // https://cloud.google.com/recaptcha-enterprise/docs/create-assessment#rest-api
    const payload = {
      event: {
        token: recaptcha,
        siteKey,
        expectedAction: action,
      },
    };
    const { data } = await axios.post<IAssessment>(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
      payload,
    );

    return data;
  }

  verify(response: IAssessment, action: string) {
    const minScore = +this.configService.get("RECAPTCHA_MIN_SCORE");
    const isScoreOk = response?.riskAnalysis?.score >= minScore;
    const matchAction = response?.tokenProperties?.action === action;
    const tokenValid = response?.tokenProperties?.valid;

    return tokenValid && matchAction && isScoreOk;
  }
}
