import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PopModule } from './pop/pop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PopModule,
  ],
})
export class AppModule {}
