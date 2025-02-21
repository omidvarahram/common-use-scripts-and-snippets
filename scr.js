#!/usr/bin/env node

const globby = require('globby');
const fs = require('fs');
const path = require('path');
const transformToNativeBase = require('./script.js');
const { templateIndex, templateSet } = require('./template.js');

/**
 * Validate filenames to avoid suspicious patterns.
 */
function isValidFileName(fileName) {
  return /^[a-zA-Z0-9_\-\.]+$/.test(fileName);
}

/**
 * Safely read file content after path normalization.
 */
function getCodeFromFile(filePath) {
  const normalizedPath = path.normalize(filePath);
  const resolvedPath = path.resolve(normalizedPath);

  // Ensure path is within allowed directory
  const allowedDir = path.resolve(process.cwd(), 'src', 'components', 'graphics', 'svg');
  if (!resolvedPath.startsWith(allowedDir)) {
    throw new Error(`Path traversal detected in: ${resolvedPath}`);
  }

  return fs.readFileSync(resolvedPath, 'utf-8');
}

/**
 * Main logic for processing SVGs.
 */
(async () => {
  const sourceDir = path.join(process.cwd(), 'src', 'components', 'graphics', 'svg');
  const target = await globby(path.join(sourceDir, '**/*.svg'));

  // Create the nab-x-illustration for each theme
  const graphics = target.map((filePath) => {
    const metadata = path.parse(filePath);
    const pathSplit = metadata.dir.split('/');
    const group = pathSplit[pathSplit.length - 1];

    // Filename validation
    if (!isValidFileName(metadata.base)) {
      throw new Error(`Invalid filename detected: ${metadata.base}`);
    }

    const output = transformToNativeBase(getCodeFromFile(filePath));

    // Creating the folder for the graphic set
    const outputDir = path.join(process.cwd(), 'src', 'components', 'graphics', 'graphicSet', group);
    fs.mkdirSync(outputDir, { recursive: true });

    // Saving the viewBox element to append into new template
    const viewBox = getCodeFromFile(filePath).match(/viewBox="[^"]*"/)?.[0];

    // Writing the transformed file securely
    const outputFilePath = path.join(
      outputDir,
      `${capitalizeFirstLetter(metadata.name.replace(/\s/g, ''))}.graphic.tsx`
    );

    fs.writeFileSync(outputFilePath, templateSet({
      graphicName: metadata.name.replace(/\s/g, ''),
      componentCode: output.toString(),
    }));

    return {
      name: metadata.name.replace(/\s/g, ''),
      group,
    };
  });

  /**
   * Grouping graphics by name for easier access.
   */
  const data = graphics.reduce((acc, curr) => {
    if (typeof acc[curr.name] === 'undefined') {
      acc[curr.name] = [];
    }
    acc[curr.name].push({
      name: curr.name,
      group: curr.group,
    });
    return acc;
  }, {});

  // Create directories and index.ts
  const graphicsDir = path.join(process.cwd(), 'src', 'components', 'graphics');
  fs.mkdirSync(graphicsDir, { recursive: true });

  const groupPaths = [];
  Object.keys(data).forEach((graphic) => {
    groupPaths.push(`${data[graphic][0]['group']}/${graphic}`);
  });

  const indexPath = path.join(graphicsDir, 'index.ts');
  fs.writeFileSync(indexPath, templateIndex({ path: groupPaths }));

})().catch((err) => {
  console.error('Error:', err);
});

/**
 * Capitalize the first letter of a string.
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}