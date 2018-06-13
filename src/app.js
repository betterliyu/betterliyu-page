import './main.scss';

import Start from './scripts/index.js';

window.onload = function () {  
  Start();
};

if (module.hot) {
  module.hot.accept('./scripts/index.js', function () {
    console.log('Accepting the updated Index.js module!');
  });
  module.hot.accept('./main.scss', function () {
    console.log('Accepting the updated Main.scss module!');
  });
}