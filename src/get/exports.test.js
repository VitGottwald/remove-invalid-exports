'use strict';

jest.autoMockOff();

import jscodeshift from 'jscodeshift';
import transform from './exports';

const path = 'path/to/source.js';

describe('export', () => {
  it('one const declaration', () => {
    expect(
      transform(
        {source: 'export const e1const = [];', path}, // file
        {jscodeshift, stats: () => {}}, // api
        {} //options
      )
    ).toEqual([{name: 'e1const', module: path}]);
  });
  it('one let declaration', () => {
    expect(
      transform(
        {source: 'export let e2let = [];', path}, // file
        {jscodeshift, stats: () => {}}, // api
        {} //options
      )
    ).toEqual([{name: 'e2let', module: path}]);
  });
  it('two let declarations', () => {
    expect(
      transform(
        {
          source: `
            const e3let = 0;
            const e4let = 1;
            export {e3let, e4let};
          `,
          path,
        }, // file
        {jscodeshift, stats: () => {}}, // api
        {} //options
      )
    ).toEqual([
      {name: 'e3let', module: path},
      {name: 'e4let', module: path},
    ]);
  });
  it('default declaration', () => {
    expect(
      transform(
        {source: 'export default defaultExport;', path}, // file
        {jscodeshift, stats: () => {}}, // api
        {} //options
      )
    ).toEqual([{name: 'source', default: true, module: path}]);
  });
});
