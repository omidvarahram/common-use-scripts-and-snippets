const fs = require('fs');
const path = require('path');

function getJsonContent(inputFile) {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');
    let lines = data.split('\n');
    let bracketCount = 0;
    let result = [];

    for (let line of lines.slice(0, 32)) {
      bracketCount += (line.match(/\{/g) || []).length;
      bracketCount -= (line.match(/\}/g) || []).length;
      result.push(line);
      if (bracketCount === 0 && result.length > 2) break;
    }

    const jsonContent = result.join('\n');
    const parsedJson = JSON.parse(jsonContent); // Validate JSON
    return parsedJson;
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

function extractVersion(inputFile = 'version.json', outputFile = 'version.txt') {
  try {
    // Read and parse the JSON file
    const data = getJsonContent(inputFile, 'utf8');

    // Find the package and extract version
    const package = data.find((item) => item.name === "nab/nui-react-native");
    if (!package) {
      throw new Error('Package nab/nui-react-native not found');
    }
    const version = package.newVersion || package.version;

    if (!version) {
      throw new Error('Version not found for nab/nui-react-native');
    }

    // Write version to output file
    fs.writeFileSync(outputFile, version);
    console.log(`Version ${version} written to ${outputFile}`);

    // Return version in case needed programmatically
    return version;
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// CLI handling
function main() {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'version.json';
  const outputFile = args[1] || 'version.txt';

  try {
    // Validate input file exists
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file ${inputFile} not found`);
    }

    const version = extractVersion(inputFile, outputFile);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Allow both CLI and module usage
if (require.main === module) {
  main();
} else {
  module.exports = extractVersion;
}