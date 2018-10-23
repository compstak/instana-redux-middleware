import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	{
		entry: 'src/main.js',
		dest: pkg.main,
		format: 'cjs',
		moduleName: 'instana-redux-middleware',
		plugins: [
			commonjs(),
			babel({
				exclude: ['node_modules/**']
			})
		]
	},
	{
		entry: 'src/main.js',
		external: ['react-router-redux'],
		targets: [
			{ dest: pkg.module, format: 'es' }
		],
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
