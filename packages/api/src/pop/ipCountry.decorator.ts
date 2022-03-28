import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from 'request-ip';
import { lookup } from 'geoip-country';
import { Request } from 'express';

export const IpCountry = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const unknownCountry = 'UNKNOWN';
    const request = ctx.switchToHttp().getRequest<Request>();
    const ip = getClientIp(request);
    const country = lookup(ip)?.country || unknownCountry;

    return country;
  },
);
