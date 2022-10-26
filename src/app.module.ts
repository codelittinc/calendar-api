import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDbAppConfig } from './configs/db.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [TypeOrmModule.forRoot(getDbAppConfig()), HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
