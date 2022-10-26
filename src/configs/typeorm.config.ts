import { DataSource } from 'typeorm';
import { getDbMigrationConfig } from './db.config';

export default new DataSource(getDbMigrationConfig());
