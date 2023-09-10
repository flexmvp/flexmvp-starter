const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const path = require('path');
const { dependencies } = require('./package.json')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return {
      ...config,
      resolve: {
        ...(config?.resolve || {}),
        alias: {
          ...(config?.resolve?.alias || {}),
          // in development, import from monorepo root
          // 'aws-crt': path.resolve(__dirname, `${process.NODE_ENV == 'production' ? '' : '../../'}node_modules/aws-crt`),
        },
      },
      plugins: [
        ...(config?.plugins || []),
        // ignore the drivers you don't want. This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
        new FilterWarningsPlugin({
          // https://stackoverflow.com/a/72032459
          exclude: [/Critical dependency/]
        }),
        // new MiniCssExtractPlugin()
      ],
      // rules: [
      //   {
      //     test: /\.css$/,
      //     use: [MiniCssExtractPlugin.loader, 'css-loader']
      //   }
      // ]
    }
  },
  /**
   * Allows loading of .ts files across packages in
   * monorepo
   * 
   * @see https://stackoverflow.com/a/72433382
   */
  transpilePackages: [...getModules()]
}

module.exports = nextConfig

function getModules() {
  return Object.keys(dependencies || [])
    .filter(dependency => dependency.startsWith('@flexmvp-starter-2/'));
  // TODO: Load package name from root package.json
}

function getAliases(modules) {
  console.log('🧨 getAliases', { modules });
  const packages = modules.reduce((prev, next) => {
    console.log('🧨 🧨 getAlisases.reduce', { module, prev, next });
    return {
      ...prev,
      ...{
        [module]: require.resolve(next)
      }
    };
  }, {
    resolveSymlinks: false
  });
  console.log('getAliases', { packages });
}
