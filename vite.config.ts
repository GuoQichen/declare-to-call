/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import camelCase from 'camelcase'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'

const packageName = packageJson.name.split('/').pop() || packageJson.name

export default defineConfig({
  server: {
    open: '/example/index.html',
  },
  build: {
    target: 'es2015',
    lib: {
      entry: [
        resolve(__dirname, 'src/adaptor/vue.ts'),
        resolve(__dirname, 'src/adaptor/react.ts'),
      ],
      formats: ['es', 'cjs'],
      name: camelCase(packageName, { pascalCase: true }),
    },
    rollupOptions: {
      external: ['vue', 'react', 'react/jsx-runtime'],
    },
  },
  plugins: [dts({ rollupTypes: true }), vue(), react()],
  test: {},
})
