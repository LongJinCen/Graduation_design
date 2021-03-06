# Graduation_design
## 项目基本框架搭建
### webpack（构建工具）
#### loader
- [babel-loader](https://github.com/babel/babel-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [file-loader](https://github.com/webpack-contrib/file-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [postcss-loader](https://github.com/postcss/postcss-loader#readme)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [vue-loader](https://github.com/vuejs/vue-loader)
- [vue-style-loader](https://github.com/vuejs/vue-style-loader#readme)
- [eslint-loader](https://github.com/webpack-contrib/eslint-loader)
#### plugin
- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme)
- [eslint-plugin-vue](https://eslint.vuejs.org/)
- [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin)
#### 其他
- [webpack-merge](https://github.com/survivejs/webpack-merge)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server#readme)
### Babel
- [@babel/cli](https://babeljs.io/)
- [@babel/core](https://babeljs.io/)
- [@babel/plugin-transform-runtime](https://babeljs.io/)
- [@babel/preset-env](https://babeljs.io/)
- [@babel/runtime](https://babeljs.io/docs/en/next/babel-runtime)
- [@babel/runtime-corejs3](https://babeljs.io/docs/en/next/babel-runtime)
- @vue/babel-helper-vue-jsx-merge-props
- @vue/babel-preset-jsx
### git
- commitizen
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)

### UI 框架
- [element-ui](http://element.eleme.io/)

### 前端框架
- [Vue](https://cn.vuejs.org/)

### 路由管理
单页面加上多页面
- [Vue-router](https://router.vuejs.org/zh/)

### Less
- [less](http://lesscss.org/)
### PostCSS
CSS 预处理器
#### Plugin
- [autoprefixer](https://github.com/postcss/autoprefixer#readme)

### 代码校验工具
- [standard](https://standardjs.com/)
- [standardx](https://github.com/standard/standardx)
- [husky](https://github.com/typicode/husky#readme)
- [lint-staged](https://github.com/okonet/lint-staged#readme)
- [eslint](https://github.com/eslint/eslint)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [stylelint](https://stylelint.io/)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard#readme)
### 其他工具
- [axios](https://github.com/axios/axios)：http 请求库
- [moment](http://momentjs.com/)：时间处理库

### 微前端架构
- 将 navigator 单独打包并通过 script 引入，如需更新，修改版本号即可。
- TODO: 通过一个config.(version).js配置文件去控制整个项目的路由。配置文件根据 webpack(config).run() 得到的打包信息生成。项目如需更新或者回退，直接修改version即可.
