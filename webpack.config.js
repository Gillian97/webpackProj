const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 导出的是个对象 拿出对应的构造函数

// 使用的是node js的模块化语法
module.exports = {
  // 方便查看打包后的源代码
  devtool: "inline-source-map",
  entry: "./src/index.js",
  // 配置打包后的文件名
  output: {
    filename: "666.js", // filename 就是打包后的文件名
    // [name]可以写死,但用[]webapck 会将其替换为 main(默认文件名)
    // content hash会每次根据文件的内容进行hash计算,得出一串不重复的字符
    // filename: '[name].[contenthash].js',
    // 通过 path 库获取webpack.config.js所在的目录,基于此去寻找新的目录去存放打包后的文件
    path: path.resolve(__dirname, "factory"),
  },
  resolve: {
    // 配置别名
    alias: {
      // 配置了别名后,在代码中就可以直接使用 @ 来引入 src 目录下的文件
      // 比如 @/utils/date.js 就可以直接写成 import { formatDate } from "@/utils/date";
      // 属性名:路径别名 属性值:真实路径
      //   "@": path.resolve(__dirname, "src"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  // 设置为development开发环境,这样的话在开发环境下,webpack打包的代码会不太一样,方便我们开发者进行调试
  mode: "development", // 默认 production, 否则提示 'mode' option has not been set
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/, // 不会转译 node_modules 下的代码
        // 使用 use 配置使用哪些 loader
        // 使用对象形式, 因为需要给loader传递一些自定义的配置
        use: {
          loader: "babel-loader", // 指定使用哪个 loader, 这里使用 babel-loader
          // options来给这个loader传递一些配置
          options: {
            presets: ["@babel/preset-env"], // 这样能够自动转译代码了
          },
        },
      },
    ],
  },
  // 支持加载多种插件
  // 在webpack.config.js中,plugins属性是一个数组,数组中的每一个元素都是一个插件
  // 每一个插件都是一个类,所以我们需要先引入这个类,然后在plugins数组中添加这个类的实例
  plugins: [
    new HtmlwebpackPlugin({
      title: "jinling blog",
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true, // 是否要压缩代码
    // 用什么工具来压缩
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: "./factory",
  },
};
