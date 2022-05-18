import { json, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import config from "./src/config";
import styles from "./styles/app.css"
const workerManifest = require('../build/worker.manifest.json')!

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "PopSelen",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
  return json({
    $env: {
      ...config,
    },
    $manifest: {
      worker: workerManifest.worker,
      sharedWorker: workerManifest.sharedWorker,
    }
  });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <link rel="modulepreload" href={workerManifest.worker} />
        <link rel="modulepreload" href={workerManifest.sharedWorker} />
        <LiveReload />
      </body>
    </html>
  );
}
