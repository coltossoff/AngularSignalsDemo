import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import AppServerModule from './src/main.server';
import { EntryEntity } from 'src/app/server/entities/entry.entity';
import config from './src/mikro-orm.config';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/sqlite';

export const di = {} as {
  orm: MikroORM,
  em: EntityManager,
  entries: EntityRepository<EntryEntity>
}

const dummyList = [{
  title: "Hello",
  descr: "Welcome to my demorific DEMO!!!"
}, {
  title: "Welcome",
  descr: "To the interviewer"
}];

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  di.orm = await MikroORM.init(config);
  di.em = di.orm.em;
  di.entries = di.em.getRepository(EntryEntity);

  const server = express.default();
  const distFolder = join(process.cwd(), 'dist/testPrep/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser

  server.get('/hello', (req, res, next) => res.send('Hello World'));

  server.get('/entries', (req, res, next) => {
    try {
      console.log('getting...')
      res.json(dummyList);
    } catch (error: any) {
      res.status(500).json({error: error.message})
    }
  });

  server.post('/entry', (req: express.Request, res: express.Response, next) => {
    try {
      let body = req.body;
      console.log(req)
      dummyList.push(JSON.parse(body));
      console.log(dummyList)
    } catch (error: any) {
      res.status(500).json({error: error.message})
    }
  });

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = await app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default AppServerModule;
