
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
    if(process.platform === 'darwin') {
        nodePath =  path.join(path.join(process.execPath, '../../../../../'), 'MacOS/node-nim.node')
    } else {
        nodePath =  path.join(path.join(process.execPath, '../'), 'node-nim.node')
    }
}

let mod = null;

try {
    mod = moduleRequire(nodePath);
} catch (e) {
    console.error('load node-nim.node error', e);
}


if(!mod) throw new Error(`can not find node-nim.node in ${nodePath}`);

export default mod as any;
