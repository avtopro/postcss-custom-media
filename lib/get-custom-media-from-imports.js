import fs from 'fs';
import path from 'path';
import { parse } from 'postcss';
import getMediaAstFromMediaString from './media-ast-from-string';
import getCustomMedia from './custom-media-from-root';

/* Get Custom Media from CSS File
/* ========================================================================== */

function getCustomMediaFromCSSFile(from) {
	const css = readFile(from);
	const root = parse(css, { from });

	return getCustomMedia(root, { preserve: true });
}

/* Get Custom Media from Object
/* ========================================================================== */

function getCustomMediaFromObject(object) {
	const customMedia = Object.assign(
		{},
		Object(object).customMedia,
		Object(object)['custom-media']
	);

	for (const key in customMedia) {
		customMedia[key] = getMediaAstFromMediaString(customMedia[key]);
	}

	return customMedia;
}

/* Get Custom Media from JSON file
/* ========================================================================== */

function getCustomMediaFromJSONFile(from) {
	const object = readJSON(from);

	return getCustomMediaFromObject(object);
}

/* Get Custom Media from Sources
/* ========================================================================== */

export default function getCustomMediaFromSources(sources) {
	return sources.map(source => {
		// read the source as an object
		const opts = source === Object(source) ? source : { from: String(source) };

		// skip objects with custom media
		if (Object(opts).customMedia || Object(opts)['custom-media']) {
			return opts
		}

		// source pathname
		const from = path.resolve(String(opts.from || ''));

		// type of file being read from
		const type = (opts.type || path.extname(from).slice(1)).toLowerCase();

		return { type, from };
	}).reduce((customMedia, source) => {
		const { type, from } = source;

		if (type === 'css' || type === 'pcss') {
			return Object.assign(customMedia, getCustomMediaFromCSSFile(from));
		}

		if (type === 'json') {
			return Object.assign(customMedia, getCustomMediaFromJSONFile(from));
		}

		return Object.assign(customMedia, getCustomMediaFromObject(source));
	}, {});
}

/* Helper utilities
/* ========================================================================== */

const readFile = from => fs.readFileSync(from, { encoding: 'utf8' });

const readJSON = from => JSON.parse(readFile(from));
