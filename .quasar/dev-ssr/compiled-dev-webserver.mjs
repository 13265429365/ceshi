var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src-ssr/middlewares/render.ts
var render_exports = {};
__export(render_exports, {
  default: () => render_default
});
import { ssrMiddleware } from "quasar/wrappers";
var render_default;
var init_render = __esm({
  "src-ssr/middlewares/render.ts"() {
    render_default = ssrMiddleware(({ app, resolve, render, serve }) => {
      app.get(resolve.urlPath("*"), (req, res) => {
        res.setHeader("Content-Type", "text/html");
        render(
          /* the ssrContext: */
          { req, res }
        ).then((html) => {
          res.send(html);
        }).catch((err) => {
          if (err.url) {
            if (err.code) {
              res.redirect(err.code, err.url);
            } else {
              res.redirect(err.url);
            }
          } else if (err.code === 404) {
            res.status(404).send("404 | Page Not Found");
          } else if (true) {
            serve.error({ err, req, res });
          } else {
            res.status(500).send("500 | Internal Server Error");
            if (true) {
              console.error(err.stack);
            }
          }
        });
      });
    });
  }
});

// src-ssr/server.ts
import express from "express";
import "compression";
import {
  ssrClose,
  ssrCreate,
  ssrListen,
  ssrServeStaticContent,
  ssrRenderPreloadTag
} from "quasar/wrappers";
var create = ssrCreate(() => {
  const app = express();
  app.disable("x-powered-by");
  if (false) {
    app.use(compression());
  }
  return app;
});
var listen = ssrListen(async ({ app, devHttpsApp, port, isReady }) => {
  await isReady();
  const server = devHttpsApp || app;
  return server.listen(port, () => {
    if (false) {
      console.log("Server listening at port " + port);
    }
  });
});
var close = ssrClose(({ listenResult }) => {
  return listenResult.close();
});
var maxAge = true ? 0 : 1e3 * 60 * 60 * 24 * 30;
var serveStaticContent = ssrServeStaticContent((path, opts) => {
  return express.static(path, {
    maxAge,
    ...opts
  });
});
var jsRE = /\.js$/;
var cssRE = /\.css$/;
var woffRE = /\.woff$/;
var woff2RE = /\.woff2$/;
var gifRE = /\.gif$/;
var jpgRE = /\.jpe?g$/;
var pngRE = /\.png$/;
var renderPreloadTag = ssrRenderPreloadTag((file) => {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }
  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}" crossorigin>`;
  }
  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }
  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }
  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif" crossorigin>`;
  }
  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg" crossorigin>`;
  }
  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png" crossorigin>`;
  }
  return "";
});

// .quasar/dev-ssr/ssr-middlewares.mjs
function injectMiddlewares(opts) {
  return Promise.all([
    Promise.resolve().then(() => (init_render(), render_exports))
  ]).then(async (rawMiddlewares) => {
    const middlewares = rawMiddlewares.map((entry) => entry.default);
    for (let i = 0; i < middlewares.length; i++) {
      try {
        await middlewares[i](opts);
      } catch (err) {
        console.error("[Quasar SSR] middleware error:", err);
        return;
      }
    }
  });
}
export {
  close,
  create,
  injectMiddlewares,
  listen,
  serveStaticContent
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjLXNzci9taWRkbGV3YXJlcy9yZW5kZXIudHMiLCAiLi4vLi4vc3JjLXNzci9zZXJ2ZXIudHMiLCAic3NyLW1pZGRsZXdhcmVzLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgUmVuZGVyRXJyb3IgfSBmcm9tICdAcXVhc2FyL2FwcC12aXRlJztcbmltcG9ydCB7IHNzck1pZGRsZXdhcmUgfSBmcm9tICdxdWFzYXIvd3JhcHBlcnMnO1xuXG4vLyBUaGlzIG1pZGRsZXdhcmUgc2hvdWxkIGV4ZWN1dGUgYXMgbGFzdCBvbmVcbi8vIHNpbmNlIGl0IGNhcHR1cmVzIGV2ZXJ5dGhpbmcgYW5kIHRyaWVzIHRvXG4vLyByZW5kZXIgdGhlIHBhZ2Ugd2l0aCBWdWVcblxuZXhwb3J0IGRlZmF1bHQgc3NyTWlkZGxld2FyZSgoeyBhcHAsIHJlc29sdmUsIHJlbmRlciwgc2VydmUgfSkgPT4ge1xuICAvLyB3ZSBjYXB0dXJlIGFueSBvdGhlciBFeHByZXNzIHJvdXRlIGFuZCBoYW5kIGl0XG4gIC8vIG92ZXIgdG8gVnVlIGFuZCBWdWUgUm91dGVyIHRvIHJlbmRlciBvdXIgcGFnZVxuICBhcHAuZ2V0KHJlc29sdmUudXJsUGF0aCgnKicpLCAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJyk7XG5cbiAgICByZW5kZXIoLyogdGhlIHNzckNvbnRleHQ6ICovIHsgcmVxLCByZXMgfSlcbiAgICAgIC50aGVuKChodG1sKSA9PiB7XG4gICAgICAgIC8vIG5vdyBsZXQncyBzZW5kIHRoZSByZW5kZXJlZCBodG1sIHRvIHRoZSBjbGllbnRcbiAgICAgICAgcmVzLnNlbmQoaHRtbCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnI6IFJlbmRlckVycm9yKSA9PiB7XG4gICAgICAgIC8vIG9vcHMsIHdlIGhhZCBhbiBlcnJvciB3aGlsZSByZW5kZXJpbmcgdGhlIHBhZ2VcblxuICAgICAgICAvLyB3ZSB3ZXJlIHRvbGQgdG8gcmVkaXJlY3QgdG8gYW5vdGhlciBVUkxcbiAgICAgICAgaWYgKGVyci51cmwpIHtcbiAgICAgICAgICBpZiAoZXJyLmNvZGUpIHtcbiAgICAgICAgICAgIHJlcy5yZWRpcmVjdChlcnIuY29kZSwgZXJyLnVybCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcy5yZWRpcmVjdChlcnIudXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyLmNvZGUgPT09IDQwNCkge1xuICAgICAgICAgIC8vIGhtbSwgVnVlIFJvdXRlciBjb3VsZCBub3QgZmluZCB0aGUgcmVxdWVzdGVkIHJvdXRlXG5cbiAgICAgICAgICAvLyBTaG91bGQgcmVhY2ggaGVyZSBvbmx5IGlmIG5vIFwiY2F0Y2gtYWxsXCIgcm91dGVcbiAgICAgICAgICAvLyBpcyBkZWZpbmVkIGluIC9zcmMvcm91dGVzXG4gICAgICAgICAgcmVzLnN0YXR1cyg0MDQpLnNlbmQoJzQwNCB8IFBhZ2UgTm90IEZvdW5kJyk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuREVWKSB7XG4gICAgICAgICAgLy8gd2VsbCwgd2UgdHJlYXQgYW55IG90aGVyIGNvZGUgYXMgZXJyb3I7XG4gICAgICAgICAgLy8gaWYgd2UncmUgaW4gZGV2IG1vZGUsIHRoZW4gd2UgY2FuIHVzZSBRdWFzYXIgQ0xJXG4gICAgICAgICAgLy8gdG8gZGlzcGxheSBhIG5pY2UgZXJyb3IgcGFnZSB0aGF0IGNvbnRhaW5zIHRoZSBzdGFja1xuICAgICAgICAgIC8vIGFuZCBvdGhlciB1c2VmdWwgaW5mb3JtYXRpb25cblxuICAgICAgICAgIC8vIHNlcnZlLmVycm9yIGlzIGF2YWlsYWJsZSBvbiBkZXYgb25seVxuICAgICAgICAgIHNlcnZlLmVycm9yKHsgZXJyLCByZXEsIHJlcyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSdyZSBpbiBwcm9kdWN0aW9uLCBzbyB3ZSBzaG91bGQgaGF2ZSBhbm90aGVyIG1ldGhvZFxuICAgICAgICAgIC8vIHRvIGRpc3BsYXkgc29tZXRoaW5nIHRvIHRoZSBjbGllbnQgd2hlbiB3ZSBlbmNvdW50ZXIgYW4gZXJyb3JcbiAgICAgICAgICAvLyAoZm9yIHNlY3VyaXR5IHJlYXNvbnMsIGl0J3Mgbm90IG9rIHRvIGRpc3BsYXkgdGhlIHNhbWUgd2VhbHRoXG4gICAgICAgICAgLy8gb2YgaW5mb3JtYXRpb24gYXMgd2UgZG8gaW4gZGV2ZWxvcG1lbnQpXG5cbiAgICAgICAgICAvLyBSZW5kZXIgRXJyb3IgUGFnZSBvbiBwcm9kdWN0aW9uIG9yXG4gICAgICAgICAgLy8gY3JlYXRlIGEgcm91dGUgKC9zcmMvcm91dGVzKSBmb3IgYW4gZXJyb3IgcGFnZSBhbmQgcmVkaXJlY3QgdG8gaXRcbiAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCgnNTAwIHwgSW50ZXJuYWwgU2VydmVyIEVycm9yJyk7XG5cbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuREVCVUdHSU5HKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG59KTtcbiIsICIvKipcbiAqIG1vcmUgaW5mbyBhYm91dCB0aGlzIGZpbGU6XG4gKiBodHRwczovL3YyLnF1YXNhci5kZXYvcXVhc2FyLWNsaS12aXRlL2RldmVsb3Bpbmctc3NyL3Nzci13ZWJzZXJ2ZXJcbiAqXG4gKiBSdW5zIGluIE5vZGUgY29udGV4dC5cbiAqL1xuXG4vKipcbiAqIE1ha2Ugc3VyZSB0byB5YXJuIGFkZCAvIG5wbSBpbnN0YWxsIChpbiB5b3VyIHByb2plY3Qgcm9vdClcbiAqIGFueXRoaW5nIHlvdSBpbXBvcnQgaGVyZSAoZXhjZXB0IGZvciBleHByZXNzIGFuZCBjb21wcmVzc2lvbikuXG4gKi9cbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcbmltcG9ydCB7XG4gIHNzckNsb3NlLFxuICBzc3JDcmVhdGUsXG4gIHNzckxpc3RlbixcbiAgc3NyU2VydmVTdGF0aWNDb250ZW50LFxuICBzc3JSZW5kZXJQcmVsb2FkVGFnLFxufSBmcm9tICdxdWFzYXIvd3JhcHBlcnMnO1xuXG4vKipcbiAqIENyZWF0ZSB5b3VyIHdlYnNlcnZlciBhbmQgcmV0dXJuIGl0cyBpbnN0YW5jZS5cbiAqIElmIG5lZWRlZCwgcHJlcGFyZSB5b3VyIHdlYnNlcnZlciB0byByZWNlaXZlXG4gKiBjb25uZWN0LWxpa2UgbWlkZGxld2FyZXMuXG4gKlxuICogU2hvdWxkIE5PVCBiZSBhc3luYyFcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IHNzckNyZWF0ZSgoLyogeyAuLi4gfSAqLykgPT4ge1xuICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbiAgLy8gYXR0YWNrZXJzIGNhbiB1c2UgdGhpcyBoZWFkZXIgdG8gZGV0ZWN0IGFwcHMgcnVubmluZyBFeHByZXNzXG4gIC8vIGFuZCB0aGVuIGxhdW5jaCBzcGVjaWZpY2FsbHktdGFyZ2V0ZWQgYXR0YWNrc1xuICBhcHAuZGlzYWJsZSgneC1wb3dlcmVkLWJ5Jyk7XG5cbiAgLy8gcGxhY2UgaGVyZSBhbnkgbWlkZGxld2FyZXMgdGhhdFxuICAvLyBhYnNvbHV0ZWx5IG5lZWQgdG8gcnVuIGJlZm9yZSBhbnl0aGluZyBlbHNlXG4gIGlmIChwcm9jZXNzLmVudi5QUk9EKSB7XG4gICAgYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbiAgfVxuXG4gIHJldHVybiBhcHA7XG59KTtcblxuLyoqXG4gKiBZb3UgbmVlZCB0byBtYWtlIHRoZSBzZXJ2ZXIgbGlzdGVuIHRvIHRoZSBpbmRpY2F0ZWQgcG9ydFxuICogYW5kIHJldHVybiB0aGUgbGlzdGVuaW5nIGluc3RhbmNlIG9yIHdoYXRldmVyIHlvdSBuZWVkIHRvXG4gKiBjbG9zZSB0aGUgc2VydmVyIHdpdGguXG4gKlxuICogVGhlIFwibGlzdGVuUmVzdWx0XCIgcGFyYW0gZm9yIHRoZSBcImNsb3NlKClcIiBkZWZpbml0aW9uIGJlbG93XG4gKiBpcyB3aGF0IHlvdSByZXR1cm4gaGVyZS5cbiAqXG4gKiBGb3IgcHJvZHVjdGlvbiwgeW91IGNhbiBpbnN0ZWFkIGV4cG9ydCB5b3VyXG4gKiBoYW5kbGVyIGZvciBzZXJ2ZXJsZXNzIHVzZSBvciB3aGF0ZXZlciBlbHNlIGZpdHMgeW91ciBuZWVkcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGxpc3RlbiA9IHNzckxpc3Rlbihhc3luYyAoeyBhcHAsIGRldkh0dHBzQXBwLCBwb3J0LCBpc1JlYWR5IH0pID0+IHtcbiAgYXdhaXQgaXNSZWFkeSgpO1xuICBjb25zdCBzZXJ2ZXIgPSBkZXZIdHRwc0FwcCB8fCBhcHA7XG4gIHJldHVybiBzZXJ2ZXIubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuUFJPRCkge1xuICAgICAgY29uc29sZS5sb2coJ1NlcnZlciBsaXN0ZW5pbmcgYXQgcG9ydCAnICsgcG9ydCk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vKipcbiAqIFNob3VsZCBjbG9zZSB0aGUgc2VydmVyIGFuZCBmcmVlIHVwIGFueSByZXNvdXJjZXMuXG4gKiBXaWxsIGJlIHVzZWQgb24gZGV2ZWxvcG1lbnQgb25seSB3aGVuIHRoZSBzZXJ2ZXIgbmVlZHNcbiAqIHRvIGJlIHJlYm9vdGVkLlxuICpcbiAqIFNob3VsZCB5b3UgbmVlZCB0aGUgcmVzdWx0IG9mIHRoZSBcImxpc3RlbigpXCIgY2FsbCBhYm92ZSxcbiAqIHlvdSBjYW4gdXNlIHRoZSBcImxpc3RlblJlc3VsdFwiIHBhcmFtLlxuICpcbiAqIENhbiBiZSBhc3luYy5cbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3NlID0gc3NyQ2xvc2UoKHsgbGlzdGVuUmVzdWx0IH0pID0+IHtcbiAgcmV0dXJuIGxpc3RlblJlc3VsdC5jbG9zZSgpO1xufSk7XG5cbmNvbnN0IG1heEFnZSA9IHByb2Nlc3MuZW52LkRFViA/IDAgOiAxMDAwICogNjAgKiA2MCAqIDI0ICogMzA7XG5cbi8qKlxuICogU2hvdWxkIHJldHVybiBtaWRkbGV3YXJlIHRoYXQgc2VydmVzIHRoZSBpbmRpY2F0ZWQgcGF0aFxuICogd2l0aCBzdGF0aWMgY29udGVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlcnZlU3RhdGljQ29udGVudCA9IHNzclNlcnZlU3RhdGljQ29udGVudCgocGF0aCwgb3B0cykgPT4ge1xuICByZXR1cm4gZXhwcmVzcy5zdGF0aWMocGF0aCwge1xuICAgIG1heEFnZSxcbiAgICAuLi5vcHRzLFxuICB9KTtcbn0pO1xuXG5jb25zdCBqc1JFID0gL1xcLmpzJC87XG5jb25zdCBjc3NSRSA9IC9cXC5jc3MkLztcbmNvbnN0IHdvZmZSRSA9IC9cXC53b2ZmJC87XG5jb25zdCB3b2ZmMlJFID0gL1xcLndvZmYyJC87XG5jb25zdCBnaWZSRSA9IC9cXC5naWYkLztcbmNvbnN0IGpwZ1JFID0gL1xcLmpwZT9nJC87XG5jb25zdCBwbmdSRSA9IC9cXC5wbmckLztcblxuLyoqXG4gKiBTaG91bGQgcmV0dXJuIGEgU3RyaW5nIHdpdGggSFRNTCBvdXRwdXRcbiAqIChpZiBhbnkpIGZvciBwcmVsb2FkaW5nIGluZGljYXRlZCBmaWxlXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXJQcmVsb2FkVGFnID0gc3NyUmVuZGVyUHJlbG9hZFRhZygoZmlsZS8qICwgeyBzc3JDb250ZXh0IH0gKi8pID0+IHtcbiAgaWYgKGpzUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwibW9kdWxlcHJlbG9hZFwiIGhyZWY9XCIke2ZpbGV9XCIgY3Jvc3NvcmlnaW4+YDtcbiAgfVxuXG4gIGlmIChjc3NSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIiR7ZmlsZX1cIiBjcm9zc29yaWdpbj5gO1xuICB9XG5cbiAgaWYgKHdvZmZSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJwcmVsb2FkXCIgaHJlZj1cIiR7ZmlsZX1cIiBhcz1cImZvbnRcIiB0eXBlPVwiZm9udC93b2ZmXCIgY3Jvc3NvcmlnaW4+YDtcbiAgfVxuXG4gIGlmICh3b2ZmMlJFLnRlc3QoZmlsZSkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gYDxsaW5rIHJlbD1cInByZWxvYWRcIiBocmVmPVwiJHtmaWxlfVwiIGFzPVwiZm9udFwiIHR5cGU9XCJmb250L3dvZmYyXCIgY3Jvc3NvcmlnaW4+YDtcbiAgfVxuXG4gIGlmIChnaWZSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJwcmVsb2FkXCIgaHJlZj1cIiR7ZmlsZX1cIiBhcz1cImltYWdlXCIgdHlwZT1cImltYWdlL2dpZlwiIGNyb3Nzb3JpZ2luPmA7XG4gIH1cblxuICBpZiAoanBnUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGhyZWY9XCIke2ZpbGV9XCIgYXM9XCJpbWFnZVwiIHR5cGU9XCJpbWFnZS9qcGVnXCIgY3Jvc3NvcmlnaW4+YDtcbiAgfVxuXG4gIGlmIChwbmdSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJwcmVsb2FkXCIgaHJlZj1cIiR7ZmlsZX1cIiBhcz1cImltYWdlXCIgdHlwZT1cImltYWdlL3BuZ1wiIGNyb3Nzb3JpZ2luPmA7XG4gIH1cblxuICByZXR1cm4gJyc7XG59KTtcbiIsICIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyoqXG4gKiBUSElTIEZJTEUgSVMgR0VORVJBVEVEIEFVVE9NQVRJQ0FMTFkuXG4gKiBETyBOT1QgRURJVC5cbiAqKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5qZWN0TWlkZGxld2FyZXMgKG9wdHMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICBcbiAgICBpbXBvcnQoJ2FwcC9zcmMtc3NyL21pZGRsZXdhcmVzL3JlbmRlcicpXG4gICAgXG4gIF0pLnRoZW4oYXN5bmMgcmF3TWlkZGxld2FyZXMgPT4ge1xuICAgIGNvbnN0IG1pZGRsZXdhcmVzID0gcmF3TWlkZGxld2FyZXNcbiAgICAgIC5tYXAoZW50cnkgPT4gZW50cnkuZGVmYXVsdClcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWlkZGxld2FyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1pZGRsZXdhcmVzW2ldKG9wdHMpXG4gICAgICB9XG4gICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tRdWFzYXIgU1NSXSBtaWRkbGV3YXJlIGVycm9yOicsIGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLFNBQVMscUJBQXFCO0FBRDlCLElBT087QUFQUDtBQUFBO0FBT0EsSUFBTyxpQkFBUSxjQUFjLENBQUMsRUFBRSxLQUFLLFNBQVMsUUFBUSxNQUFNLE1BQU07QUFHaEUsVUFBSSxJQUFJLFFBQVEsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLFFBQVE7QUFDMUMsWUFBSSxVQUFVLGdCQUFnQixXQUFXO0FBRXpDO0FBQUE7QUFBQSxVQUE2QixFQUFFLEtBQUssSUFBSTtBQUFBLFFBQUMsRUFDdEMsS0FBSyxDQUFDLFNBQVM7QUFFZCxjQUFJLEtBQUssSUFBSTtBQUFBLFFBQ2YsQ0FBQyxFQUNBLE1BQU0sQ0FBQyxRQUFxQjtBQUkzQixjQUFJLElBQUksS0FBSztBQUNYLGdCQUFJLElBQUksTUFBTTtBQUNaLGtCQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksR0FBRztBQUFBLFlBQ2hDLE9BQU87QUFDTCxrQkFBSSxTQUFTLElBQUksR0FBRztBQUFBLFlBQ3RCO0FBQUEsVUFDRixXQUFXLElBQUksU0FBUyxL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
