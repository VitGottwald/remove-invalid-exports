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

it('Remove a non-existent reexport', done => {
  const inputPath = `${__dirname}/__fixtures__/re-exports.input.js`;
  const outputPath = `${__dirname}/__fixtures__/re-exports.output.js`;
  runTest({done, transform, inputPath, outputPath});
});
