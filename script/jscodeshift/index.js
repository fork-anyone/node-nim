/**
 * 生成枚举值.ts文件，供外部项目使用
 */

const {run: jscodeshift} = require('jscodeshift/src/Runner')
const path = require('node:path');
const fs = require('node:fs/promises');
const {glob} = require('glob');

async function exec() {
    const paths = await glob('**/*.ts', {cwd: path.resolve(__dirname, '../../ts'), absolute: true});


    const transformPath = path.resolve(__dirname, 'transform.js')
    const options = {
        dry: true,
        print: true,
        verbose: 1,
        // ...
    }

    const res = await jscodeshift(transformPath, paths, options)
    console.log(res)
}

exec();