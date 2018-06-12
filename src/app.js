import './main.scss';

import Start from './scripts/index.js';

window.onload = function () {  
  Start();
};

if (module.hot) {
  module.hot.accept('./scripts/index.js', function () {
    console.log('Accepting the updated printMe module!');
  });
}