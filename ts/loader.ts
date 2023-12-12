import fs from 'fs'
import path from 'path'
import {app} from '@electron/remote'

let baseDir = app.getPath('exe')
if(process.env.NODE_ENV === 'development') {
    baseDir = path.join(__dirname, '../../../../../../../../node_modules/@fork-anyone/node-nim/sdk/lib')
}


console.error('baseDir', baseDir);
// @ts-ignore
export default __non_webpack_require__(path.join(baseDir, 'node-nim.node'))
