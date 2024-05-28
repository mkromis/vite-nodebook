// backgroundColor: 'white'
const path = require('path');
const fs = require('fs');
const { ExtensionRootDir } = require('./constants');

function fixTensorflowVisColors() {
    try {
        const files = [
            path.join(ExtensionRootDir, 'node_modules', '@tensorflow', 'tfjs-vis', 'dist', 'components', 'visor.js'),
            path.join(ExtensionRootDir, 'node_modules', '@tensorflow', 'tfjs-vis', 'dist', 'components', 'tabs.js'),
            path.join(ExtensionRootDir, 'node_modules', '@tensorflow', 'tfjs-vis', 'dist', 'components', 'surface.js')
        ];

        files.forEach((file) => {
            let contents = fs.readFileSync(file).toString();
            if (contents.indexOf("backgroundColor: 'white',") || contents.indexOf("backgroundColor: '#fafafa',")) {
                contents = contents.replace("backgroundColor: 'white',", '');
                contents = contents.replace("backgroundColor: 'white',", '');
                contents = contents.replace("backgroundColor: '#fafafa',", '');
                contents = contents.replace("backgroundColor: '#fafafa',", '');
                fs.writeFileSync(file, contents, { flag: 'w' });
            }
        });
    } catch (error) {
        console.error('Error while fixing tfjs-vis colors', error);
    }
}

fixTensorflowVisColors();
