import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";

hydrate(<RemixBrowser />, document);

window.addEventListener('load', () => {
  loadWorker()
})

async function loadWorker() {
  const isShareWorkerSupported = typeof SharedWorker === 'function'
  if(isShareWorkerSupported) {
    loadSharedWorker()
    return
  }
  loadWebWorker()
}

function loadSharedWorker() {
  const { sharedWorker } = window.__remixContext.routeData.root
  new SharedWorker(
    sharedWorker,
    { type: 'module', name: 'popselen-socket-worker' }
  )
}

function loadWebWorker() {
  const { worker } = window.__remixContext.routeData.root
  const webWorker = new Worker(worker, { type: 'module' })
  webWorker.postMessage('listenLeaderboard')
  webWorker.onmessage = function(data) {
    console.log(data)
  }
}