import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import * as strings from "@angular-devkit/core/src/utils/strings";
import { getWorkspace } from "@schematics/angular/utility/config";
import { buildDefaultPath, getProject } from '@schematics/angular/utility/project';
import { parseName} from '@schematics/angular/utility/parse-name';
import { Schema } from './schema';



// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function crudResource(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const projectName = _options.project || Object.keys(workspace.projects)[0];
    const project = getProject(workspace,projectName);
    const path = _options.path || buildDefaultPath(project as any);
    const parsedPath = parseName(path,_options.name);

    _options.name = parsedPath.name;
    _options.path = parsedPath.path;


    const sourceTemplate = url('./files');
    const sourceParametrizeTemplate = apply(sourceTemplate, [
      template({
        ..._options,
        ...strings
      }),
      move(parsedPath.path)
    ]);

    tree = mergeWith(sourceParametrizeTemplate)(tree, _context) as Tree;
    return tree;
  };
}
