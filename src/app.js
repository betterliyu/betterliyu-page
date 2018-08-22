import './style.css';
import './scss/main.scss';
import Start from './scripts/index.js';

window.onload = function () {
  // import(/* webpackChunkName: "lodash" */ 'lodash').then(exports => {
  //   exports.cloneDeep({});
  // });
  Start();

  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
};

if (module.hot) {
  module.hot.accept('./scripts/index.js', function () {
    console.log('Accepting the updated Index.js module!');
    Start();
  });
  // module.hot.accept('./style.css', function () {
  //   console.log('Accepting the updated Main.scss module!');
  // });
  module.hot.accept('./polyfill.js', function () {
    console.log('Accepting the updated Polyfill.js module!');
    Start();
  });
}