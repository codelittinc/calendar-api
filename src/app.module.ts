import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { getDbAppConfig } from './configs/db.config';
import { TokensModule } from './tokens/tokens.module';
import { RemindersModule } from './reminders/reminders.module';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDbAppConfig()),
    TokensModule,
    RemindersModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      formatter: (template: string, ..._: any[]) => template,
      loaderOptions: {
        path: path.join(process.cwd() + '/dist/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
