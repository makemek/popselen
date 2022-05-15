import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);

window.addEventListener('load', () => {
  loadSharedWorker()
})

function loadSharedWorker() {
  const worker = new SharedWorker(window.__remixContext.routeData.root.worker, { type: 'module', name: 'popselen-socket-worker' })
}
