/**
 * 复制node文件以及dll、dylib文件到electron exe同级目录
 */

const path = require('path')
const fs = require('fs-extra');
const os = require('os');


module.exports.copy = function() {
    const electronPath = path.dirname(require.resolve('electron'));
    if(os.platform() === 'win32') {
        fs.copySync(path.resolve(__dirname, '../sdk/lib'), path.resolve(electronPath, 'dist'));
    } else if(os.platform() === 'darwin'){
        console.error( path.resolve(electronPath, 'dist/Electron.app/Contents/MacOS'))
        fs.copySync(path.resolve(__dirname, '../sdk/lib'), path.resolve(electronPath, 'dist/Electron.app/Contents/MacOS'));
    }
    console.log('复制node资源文件到electron exe目录')
}