import fs from 'fs/promises';
import path from 'path';
import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const resolve = (p) => path.resolve(__dirname, p);
const getStyleSheets = async () => {
    try {
        const assetpath = resolve('assets');
        const files = await fs.readdir(assetpath);
        const cssAssets = files.filter((l) => l.endsWith('.css'));
        const allContent = [];
        for (const asset of cssAssets) {
            const content = await fs.readFile(path.join(assetpath, asset), 'utf-8');
            allContent.push(`<style type="text/css">${content}</style>`);
        }
        return allContent.join('\n');
    }
    catch {
        return '';
    }
};
async function createServer() {
    const app = express();
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom',
        logLevel: isTest ? 'error' : 'info',
    });
    // use vite's connect instance as middleware
    // if you use your own express router (express.Router()), you should use router.use
    app.use(vite.middlewares);
    const requestHandler = express.static(resolve('assets'));
    app.use(requestHandler);
    app.use('/assets', requestHandler);
    app.use(compression());
    app.use(serveStatic(resolve('client'), {
        index: false,
    }));
    const stylesheets = getStyleSheets();
    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            // 1. Read index.html
            let template = await fs.readFile(resolve('client/index.html'), 'utf-8');
            // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
            //    also applies HTML transforms from Vite plugins, e.g. global preambles
            //    from @vitejs/plugin-react
            template = await vite.transformIndexHtml(url, template);
            // 3. Load the server entry. vite.ssrLoadModule automatically transforms
            //    your ESM source code to be usable in Node.js! There is no bundling
            //    required, and provides efficient invalidation similar to HMR.
            let productionBuildPath = path.join(__dirname, './server/entry-server.mjs');
            const { render } = await vite.ssrLoadModule(productionBuildPath);
            // 4. render the app HTML. This assumes entry-server.js's exported `render`
            //    function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const appHtml = await render(url);
            const cssAssets = '';
            // 5. Inject the app-rendered HTML into the template.
            const html = template
                .replace(`<!--app-html-->`, appHtml)
                .replace(`<!--head-->`, cssAssets);
            // 6. Send the rendered HTML back.
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            console.log(e.stack);
            // If an error is caught, let Vite fix the stack trace so it maps back to
            // your actual source code.
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
    const port = process.env.PORT || 7456;
    app.listen(Number(port), '0.0.0.0', () => {
        console.log(`App is listening on http://localhost:${port}`);
    });
}
createServer();
//# sourceMappingURL=server.js.map