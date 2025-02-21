const fs = require('fs');
const path = require('path');

/**
 * Validates the file path to prevent path traversal attacks.
 */
function validateFilePath(filePath, allowedBaseDir) {
  const normalizedPath = path.normalize(filePath);
  const resolvedPath = path.resolve(normalizedPath);

  if (!resolvedPath.startsWith(allowedBaseDir)) {
    throw new Error(`Path traversal detected: ${resolvedPath}`);
  }

  return resolvedPath;
}

/**
 * Reads and parses a JSON file securely.
 */
function getJsonContent(inputFile) {
  try {
    const allowedDir = path.resolve(process.cwd()); // Allow only within project directory
    const safeInputFile = validateFilePath(inputFile, allowedDir);

    const data = fs.readFileSync(safeInputFile, 'utf8');
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

/**
 * Extracts the version from JSON and writes it to an output file securely.
 */
function extractVersion(inputFile = 'version.json', outputFile = 'version.txt') {
  try {
    const allowedDir = path.resolve(process.cwd());

    // Validate input and output paths
    const safeInputFile = validateFilePath(inputFile, allowedDir);
    const safeOutputFile = validateFilePath(outputFile, allowedDir);

    // Read and parse the JSON file
    const data = getJsonContent(safeInputFile);

    // Find the package and extract version
    const package = data.find((item) => item.name === "nab/nui-react-native");
    if (!package) {
      throw new Error('Package nab/nui-react-native not found');
    }
    const version = package.newVersion || package.version;

    if (!version) {
      throw new Error('Version not found for nab/nui-react-native');
    }

    // Write version to output file securely
    fs.writeFileSync(safeOutputFile, version);
    console.log(`Version ${version} written to ${safeOutputFile}`);

    return version;
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * CLI handling with secure file validation.
 */
function main() {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'version.json';
  const outputFile = args[1] || 'version.txt';

  try {
    const allowedDir = path.resolve(process.cwd());

    // Validate paths
    const safeInputFile = validateFilePath(inputFile, allowedDir);
    const safeOutputFile = validateFilePath(outputFile, allowedDir);

    // Ensure input file exists
    if (!fs.existsSync(safeInputFile)) {
      throw new Error(`Input file ${safeInputFile} not found`);
    }

    // Extract and write version
    const version = extractVersion(safeInputFile, safeOutputFile);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * Allow both CLI and module usage.
 */
if (require.main === module) {
  main();
} else {
  module.exports = extractVersion;
}