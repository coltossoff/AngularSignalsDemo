import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import e, * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import AppServerModule from './src/main.server';
import { Database } from 'sqlite3';
import { Entry } from 'src/app/models/entry';

// The Express app is exported so that it can be used by serverless Functions.
export async function app(): Promise<express.Express> {
  const server = express.default();
  const distFolder = join(process.cwd(), 'dist/testPrep/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();

  server.use(express.json());
  server.set('view engine', 'html');
  server.set('views', distFolder);

  const db = new Database('./sqlite.db');
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Entries (
                _id INTEGER PRIMARY KEY,
                title TEXT,
                descr TEXT,
                createdAt TEXT
            );`,
          (e: Error) => {
            if (e) return console.error(e.message);
            console.log('Entries table created');
          });
  });

  server.post('/entry', (req, res, next) => {
    let entry = req.body;
    try {
      const result = db.run(
        `INSERT INTO entries(title,descr,createdAt) VALUES(?,?,?)`,
        [entry.title, entry.descr, entry.createdAt],
        (err) => {
          if (err) return console.error(err.message, req);
          console.log('Entry Inserted');
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Insert Failed');
    }
  });

  server.get('/entries', (req, res, next) => {
    console.log('entries hit')
    try {
      db.all('SELECT * FROM entries ORDER BY _id DESC', (e, vals) => {
        if(e) return console.error(e)
        console.log(vals);
        res.json(vals);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Insert Failed");
    }
  });
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

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
  const port = process.env['PORT'] || 80;

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
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default AppServerModule;
