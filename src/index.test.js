jest.autoMockOff();

import fs from 'fs';
import {promisify} from 'util';
import jscodeshift from 'jscodeshift';

import transform from './index.js';

const readFile = promisify(fs.readFile);
const readFixture = aPath => readFile(aPath, 'utf8');

function runTest({
  done,
  transform,
  inputPath,
  outputPath,
  options = {},
}) {
  Promise.all([readFixture(inputPath), readFixture(outputPath)]).then(
    ([inputSource, outputSource]) => {
      expect(
        transform(
          {source: inputSource, path: inputPath}, // file
          {jscodeshift, stats: () => {}}, // api
          options
        )
      ).toEqual(outputSource);
      done();
    }
  );
}

describe('Example from https://astexplorer.net', () => {
  it('Spells identifiers backwards', done => {
    const inputPath = `${__dirname}/__fixtures__/index.input.js`;
    const outputPath = `${__dirname}/__fixtures__/index.output.js`;
    runTest({done, transform: transform, inputPath, outputPath});
  });
});
