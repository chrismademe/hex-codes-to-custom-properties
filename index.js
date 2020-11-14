const fileSystem = require('fs');
const colorNamer = require('color-namer');

// Test Input
const inputFile = `./test-input/logo.svg`;

// Helpers
const generateCustomProperty = require('./lib/generateCustomProperty');
const writeCustomProperties = require('./lib/writeCustomProperties');

// Read input file
try {
    const inputData = fileSystem.readFileSync(inputFile, `utf-8`);

    // Get hex codes & remove duplicates
    let hexCodes = [...new Set(inputData.match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi))];

    // Map to names
    let hexCodesWithNames = [];
    let customProperties = [];
    hexCodes.forEach(hexCode => {
        let names = colorNamer(hexCode, { distance: 'deltaE' });
        hexCodesWithNames.push({
            name: names.x11[0].name,
            code: hexCode
        });

        customProperties.push(generateCustomProperty(names.x11[0].name, hexCode));
    });

    console.log(writeCustomProperties(customProperties))
} catch(error) {
    console.log(`Error: ${error.stack}`);
}