/*
 * Codemod that extracts all export statements
 * For details, see: https://github.com/benjamn/ast-types/def/babel.js
 */

export default function transformer(file, api, _options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const exports = [
    ...exportNamedDeclaration(j, root, file.path),
    ...exportSpecifiers(j, root, file.path),
    ...defaultExport(j, root, file.path),
    ...[],
  ];

  return exports;
}

function exportNamedDeclaration(j, root, path) {
  // export const WritableComponentTypes = [ ...];
  const variableExports = root
    .find(j.Identifier)
    .filter(p => j.VariableDeclarator.check(p.parent.node))
    .filter(p => j.VariableDeclaration.check(p.parent.parent.node))
    .filter(p =>
      j.ExportNamedDeclaration.check(p.parent.parent.parent.node)
    )
    .nodes()
    .map(n => ({name: n.name, module: path}));

  // export function classFor(section, localClass) { ... }
  const functionExports = root
    .find(j.Identifier)
    .filter(p => p.name === 'id')
    .filter(p => j.FunctionDeclaration.check(p.parent.node))
    .filter(p => j.ExportNamedDeclaration.check(p.parent.parent.node))
    .nodes()
    .map(n => ({name: n.name, module: path}));

  return [...variableExports, ...functionExports];
}

// export {AddAppWizardPages, AddServiceWizardPages};
function exportSpecifiers(j, root, path) {
  return root
    .find(j.ExportSpecifier)
    .nodes()
    .map(n => ({name: n.exported.name, module: path}));
}

// export default AppConnectDao;
function defaultExport(j, root, path) {
  const defaultExportName =
    path == null
      ? 'defaultExportDefaultName'
      : path.replace(/^.*\/([^/]*)\.js/, '$1');

  return root.find(j.ExportDefaultDeclaration).nodes().length
    ? [{name: defaultExportName, default: true, module: path}]
    : [];
}
