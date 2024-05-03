import { Options, SqliteDriver, defineConfig } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig ({
  driver: SqliteDriver,
  dbName: 'sqlite.db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator]
});
