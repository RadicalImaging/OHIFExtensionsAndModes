!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("@radical/site-finding",[],n):"object"==typeof exports?exports["@radical/site-finding"]=n():e["@radical/site-finding"]=n()}("undefined"!=typeof self?self:this,(function(){return function(e){var n={};function r(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,r),t.l=!0,t.exports}return r.m=e,r.c=n,r.d=function(e,n,a){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)r.d(a,t,function(n){return e[n]}.bind(null,t));return a},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=1)}([function(e){e.exports=JSON.parse('{"name":"@radical/site-finding","version":"3.0.0","description":"Support for showing menus and displaying findings and site location","author":"Bill Wallace","license":"MIT","files":["dist","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"main":"public/umd/@radical/site-finding/index.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --debug --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"^3.0.0","@ohif/extension-cornerstone":"^3.0.0","@ohif/extension-default":"^3.0.0","@ohif/i18n":"^1.0.0","prop-types":"^15.6.2","react":"^17.0.2","react-dom":"^17.0.2","react-i18next":"^10.11.0","react-router":"^6.3.0","react-router-dom":"^6.3.0","webpack":"^5.50.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"7.7.6"},"devDependencies":{"@babel/core":"^7.5.0","@babel/plugin-proposal-class-properties":"^7.5.0","@babel/plugin-proposal-object-rest-spread":"^7.5.5","@babel/plugin-syntax-dynamic-import":"^7.2.0","@babel/plugin-transform-arrow-functions":"^7.2.0","@babel/plugin-transform-regenerator":"^7.4.5","@babel/plugin-transform-runtime":"^7.5.0","@babel/preset-env":"^7.5.0","@babel/preset-react":"^7.0.0","@babel/preset-typescript":"^7.18.6","babel-eslint":"^8.0.3","babel-loader":"^8.0.0-beta.4","babel-plugin-inline-react-svg":"^2.0.1","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^10.2.0","cross-env":"^7.0.3","dotenv":"^14.1.0","eslint":"^5.0.1","eslint-loader":"^2.0.0","uglifyjs-webpack-plugin":"^1.2.7","webpack":"^4.12.2","webpack-cli":"^3.0.8"}}')},function(e,n,r){"use strict";r.r(n);var a=r(0).name;n.default={id:a,preRegistration:function(e){e.servicesManager,e.commandsManager,e.configuration},getPanelModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getViewportModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getToolbarModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getLayoutTemplateModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getSopClassHandlerModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getHangingProtocolModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getCommandsModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getContextModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager},getDataSourcesModule:function(e){e.servicesManager,e.commandsManager,e.extensionManager}}}])}));
//# sourceMappingURL=index.umd.js.map