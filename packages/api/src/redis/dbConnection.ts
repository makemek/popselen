import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { config } from 'dotenv';

config();

export const REDIS_CON = 'REDIS_CON';

export const dbConnectionFactory = {
  provide: REDIS_CON,
  useFactory,
  inject: [ConfigService],
};

async function useFactory(configService: ConfigService) {
  const client = createClient({
    socket: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    },
    password: configService.get('REDIS_PASSWORD'),
  });

  await client.connect();

  return client;
}
