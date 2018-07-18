import './style.css';
import './scss/main.scss';
import './polyfill.js';
import Start from './scripts/index.js';

window.onload = function () {  
  // import(/* webpackChunkName: "lodash" */ 'lodash').then(exports => {
  //   exports.cloneDeep({});
  // });
  Start();
};

if (module.hot) {
  module.hot.accept('./scripts/index.js', function () {
    console.log('Accepting the updated Index.js module!');
  });
  module.hot.accept('./style.css', function () {
    console.log('Accepting the updated Main.scss module!');
  });
  module.hot.accept('./polyfill.js', function () {
    console.log('Accepting the updated Polyfill.js module!');
  });
}