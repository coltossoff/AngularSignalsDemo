import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { defineConfig } from "@mikro-orm/sqlite";

export default defineConfig({
    entities: ['./dist/app/server/entities/*'],
    entitiesTs: ['./src/app/server/entities/*'],
    debug: true,
    metadataProvider: TsMorphMetadataProvider,
    dbName: 'issueBoard.db',
    extensions: [EntityGenerator, Migrator]

    // highlighter: new SqlHighlighter(),
})