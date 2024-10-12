import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  proxy:{
    server:{
      "target":"https://vino-estate-api.vercel.app",
      "changeOrigin":"true",
      "secure": true
    }
  }
})
