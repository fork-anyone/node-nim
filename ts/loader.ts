import fs from 'fs'
import path from 'path'
import { app } from '@electron/remote'

console.error(__dirname);

let baseDir = app.getPath('exe')
if (process.env.NODE_ENV === 'development') {
    const index = __dirname.lastIndexOf('node_modules');
    if (process.platform === 'darwin') {
        baseDir = path.join(__dirname.slice(0, index) ,'node_modules/@fork-anyone/node-nim/sdk/lib')
    } else {
        baseDir = path.join(__dirname.slice(0, index),  'node_modules/@fork-anyone/node-nim/sdk/lib')
    }
}


console.error('baseDir', baseDir);
// @ts-ignore
export default __non_webpack_require__(path.join(baseDir, 'node-nim.node'))
