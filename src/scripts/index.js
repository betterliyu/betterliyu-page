import $ from 'zepto';
import Header from './header.js';
import Skills from './skills.js';
import Works from './works.js';
import Footer from './footer.js';

function init() {
  Header.init();
  Works.init();
  Footer.init();
  $.ajax({
    url: 'db.json',
    dataType: "json",
    jsonp: false,
    success: data => {
      Skills.init(data.skills);
    },
    error: () => {
      Skills.init([]);
    }
  });
}

export default init;