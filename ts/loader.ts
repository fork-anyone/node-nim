import { app } from '@electron/remote';
import path from 'path';

let moduleRequire = null;
// @ts-ignore 兼容webpack打包 
if(typeof __non_webpack_require__ !== 'undefined' ) {
    // @ts-ignore 兼容webpack打包
   moduleRequire = __non_webpack_require__;
} else if(typeof require !== 'undefined') {
    moduleRequire = require;
    
}  
if(!moduleRequire) {
    throw new Error('can not find require module.');
}


let nodePath = process.env.NODE_NIM_PATH;

if(!nodePath) {
    nodePath =  path.join(path.dirname(moduleRequire('@electron/remote').app.getPath('exe')), 'node-nim.node')
}

const mod = moduleRequire(nodePath);


if(!mod) throw new Error(`can not find node-nim.node in ${nodePath}`);

export default mod;
