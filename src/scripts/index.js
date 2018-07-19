import $ from 'jquery';
import Header from './header.js';
import Skills from './skills.js';
import Works from './works.js';

function init() {
  Header.init();
  Works.init();
  $.ajax({
    url: 'db.json',
    dataType: "json",
    jsonp: false,
  }).then(data => {
    Skills.init(data.skills);
  });
}

export default init;