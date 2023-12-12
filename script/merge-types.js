const fs = require('fs');
const {glob} = require('glob');
const path = require('path')

async function main() {
    const paths = await glob('**/*.ts', {cwd: path.resolve(__dirname, '../types'), absolute: true});
    console.error('paths', paths)
    const mergedFileName = path.resolve(__dirname, '../types.ts');
    
    const mergedContent = paths
      .map(fileName => fs.readFileSync(fileName, 'utf-8'))
      .join('\n');
    
    fs.writeFileSync(mergedFileName, mergedContent);
}

main();