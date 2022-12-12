import solid from 'solid-start/vite'
import startCloudflareWorkers from 'solid-start-cloudflare-workers'

import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      solid({
        ssr: true,
        islands: false,
        islandsRouter: false,
        adapter: startCloudflareWorkers({
          wranglerConfigPath: './wrangler.toml',
          durableObjectsPersist: true,
          kvPersist: true,
          d1Persist: true,
          async init(mf) {},
        }),
      }),
    ],
  }
})
