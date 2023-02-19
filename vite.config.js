import { defineConfig, searchForWorkspaceRoot } from "vite"

export default defineConfig({
  server: {
    port: 8080,
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
      ]
    },
  }
})
