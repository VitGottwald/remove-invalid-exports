import jscodeshift from 'jscodeshift';

import fs from 'fs';
import {promisify} from 'util';
const readFile = promisify(fs.readFile);
const readFixture = aPath => readFile(aPath, 'utf8');

module.exports = function runTest({
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
};
