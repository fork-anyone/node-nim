import fs from 'fs'
import path from 'path'
import { app } from '@electron/remote'

// @ts-ignore
export default __non_webpack_require__(path.join(path.dirname(app.getPath('exe')), 'node-nim.node'))
