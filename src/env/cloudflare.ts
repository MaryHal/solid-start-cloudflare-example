/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    __D1_BETA__db: D1Database
  }
}

export {}
