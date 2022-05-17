import esbuild from "esbuild";
import yargs from "yargs-parser";
import { writeFileSafe } from "@remix-run/dev/compiler/utils/fs";
import path from "path";
import { BuildMode } from "@remix-run/dev/build";
import { find } from "lodash";

const { _, ...argv } = yargs(process.argv.slice(2)) || {};

async function build() {
  await esbuild.build({
    entryPoints: [
      "app/worker/entry.worker.ts",
      "app/worker/entry.sharedworker.ts",
    ],
    outdir: "public/build",
    entryNames: "[dir]/[name]-[hash]",
    metafile: true,
    bundle: true,
    sourcemap: process.env.NODE_ENV === BuildMode.Development,
    format: "esm",
    define: {
      "process.env.API_BASE_URL": `'${process.env.API_BASE_URL}'`,
      "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
    },
    platform: "browser",
    plugins: [workerManifestPlugin()],
    ...argv,
  });
}

function createManifest(metafile: esbuild.Metafile) {
  const outputs = Object.keys(metafile.outputs);
  const serviceWorker = find(outputs, (val) =>
    /entry\.worker-.*\.js$/.test(val),
  )!;
  const sharedWorker = find(outputs, (val) =>
    /entry\.sharedworker-.*\.js$/.test(val),
  )!;
  const payload = JSON.stringify({
    worker: `/build/${path.basename(serviceWorker)}`,
    sharedWorker: `/build/${path.basename(sharedWorker)}`,
  });
  return writeFileSafe("build/worker.manifest.json", payload);
}

function workerManifestPlugin(): esbuild.Plugin {
  return {
    name: "worker-watcher",
    setup(build) {
      build.onEnd(async (result) => {
        await createManifest(result.metafile!);
      });
    },
  };
}

build();
