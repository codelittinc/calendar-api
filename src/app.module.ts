import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDbAppConfig } from './configs/db.config';
import { TokensModule } from './tokens/tokens.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [TypeOrmModule.forRoot(getDbAppConfig()), TokensModule, RemindersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
