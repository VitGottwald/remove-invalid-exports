/**
 *  This is a jscodeshift codemod to remove
 *  invalid exports that remain in babel output after compiling typescript
 *
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ExportNamedDeclaration)
    .forEach(ePath => {
      j(ePath)
        .find(j.ExportSpecifier)
        .forEach(sPath => {
          if (sPath.node.exported.name === 'MissingExport') {
            j(sPath).remove();
          }
        });
    })
    .toSource();
}
