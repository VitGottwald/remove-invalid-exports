jest.autoMockOff();

import runTest from './runTest';
import transform from './index.js';

describe('Example from https://astexplorer.net', () => {
  it('Spells identifiers backwards', done => {
    const inputPath = `${__dirname}/__fixtures__/index.input.js`;
    const outputPath = `${__dirname}/__fixtures__/index.output.js`;
    runTest({done, transform, inputPath, outputPath});
  });
});
