import $ from 'zepto';

class Skills {
  constructor() {
    this.$skills = [];
  }

  init(skills) {
    this.createSkills(skills);

    this.handlerScroll();
    $(window).on('scroll', () => {
      this.handlerScroll();
    });
    $(window).on('resize', () => {
      this.handlerScroll();
    });
  }

  handlerScroll() {
    const $skills = $('#skillList').find('.percentage');
    const _this = this;
    $.each($skills, function (index, s) {
      if ($(s).hasClass('has-painted')) {
        return;
      }
      const skillTop = s.getBoundingClientRect().top;
      if (skillTop < window.innerHeight) {
        _this.drawLine($(s));
        $(s).addClass('has-painted');
      }
    });
  }

  createSkills(skills) {
    const $skillList = $('#skillList');
    $skillList.empty();
    skills.forEach(s => {
      const $item = $(`<li class="skill">
      <span class="name">${s.name}</span>
      <div class="percentage" data-percent="${s.percentage}" data-color=${s.color}>
        <canvas ></canvas>
      </div>
      </li>`);
      $skillList.append($item);
    });
  }

  drawLine($c) {
    const canvas = $c.children()[0];
    const width = $c.width();
    const height = $c.height();
    const { percent, color } = $c[0].dataset;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = color;
    const percentWidth = width * parseFloat(percent);
    let hasPaint = 0;
    let x = 0;
    const timer = setInterval(() => {
      x += 2;
      hasPaint += percentWidth / 2 / x;
      hasPaint = hasPaint >= percentWidth ? percentWidth : hasPaint;
      ctx.fillRect(0, 0, hasPaint, height);
      if (hasPaint >= percentWidth) {
        clearInterval(timer);
      }
    }, 15);
  }
}

export default new Skills();