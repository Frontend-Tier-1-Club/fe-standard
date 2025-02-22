import createBundleAnalyzer from '@next/bundle-analyzer';
import { FontaineTransform } from 'fontaine';
import { createMDX } from 'fumadocs-mdx/next';

/**
 * @type {import('fontaine').FontaineTransformOptions}
 */
const fontTaineOptions = {
	fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
	resolvePath: id => `/public/fonts/${id}`,
	fallbackName: () => 'Be VietNam Pro'
};

const withAnalyzer = createBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
});

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
	output: 'export',
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	serverExternalPackages: ['ts-morph', 'typescript'],
	experimental: {
		reactCompiler: true,
		webpackBuildWorker: true
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: ''
			}
		]
	},
	webpack(config) {
		config.plugins = config.plugins || [];
		config.plugins.push(FontaineTransform.webpack(fontTaineOptions));
		return config;
	}
};

export default withAnalyzer(withMDX(config));
