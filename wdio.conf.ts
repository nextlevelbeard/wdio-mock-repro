import url from 'url'
import path from 'path'

import type { Options } from '@wdio/types'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: Options.Testrunner = {

  automationProtocol: 'devtools',

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json'
    }
  },

  specs: [
    './test.tsx'
  ],

  exclude: [],

  maxInstances: 4,
  
  capabilities: [{
    browserName: 'chrome'
  }],
  
  ...(process.env.CI
    ? { outputDir: path.resolve(__dirname, 'logs') }
    : {}
  ),
  
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
    
  runner: ['browser', {
    preset: 'react',
    coverage: {
      enabled: true,
      statements: 100,
      branches: 90,
      functions: 100,
      lines: 100
    }
  }],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 6000000
  }
}
