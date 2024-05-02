import { Options, SqliteDriver } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';

const config: Options = {
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [EntityGenerator, Migrator]
};

export default config;