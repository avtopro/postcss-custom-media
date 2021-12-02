import getCustomMedia from './lib/custom-media-from-root';
import getCustomMediaFromRoot from './lib/custom-media-from-root';
import getCustomMediaFromImports from './lib/get-custom-media-from-imports';
import transformAtrules from './lib/transform-atrules';

const creator = opts => {
	// whether to preserve custom media and at-rules using them
	const preserve = 'preserve' in Object(opts) ? Boolean(opts.preserve) : false;

	// sources to import custom media from
	const importFrom = [].concat(Object(opts).importFrom || []);

	// ready to use AST with custom media rules
	const ast = Object(opts).ast;

	const customMedia = getCustomMedia(ast, { preserve });
	const customMediaFromImports = getCustomMediaFromImports(importFrom);

	return {
		postcssPlugin: 'postcss-custom-media',
		Once: (root, helpers) => {

			// combine rules from root and from imports
			helpers.customMedia = Object.assign(
				customMedia,
				customMediaFromImports,
				getCustomMediaFromRoot(root, { preserve })
			);
		},
		AtRule: {
			media: (atrule, helpers) => {
				transformAtrules(atrule, {preserve}, helpers)
			}
		}
	}
}

creator.postcss = true

export default creator
