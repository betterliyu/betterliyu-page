import $ from 'zepto';

export default class Overlay {
  constructor($dom, options) {
    if ($dom.length != 1) {
      throw 'Only one zepto dom is allowed.';
    }
    this._originWrap = $dom;
    this._overlayWrap = $('<div class="overlay overlay-wrap"></div>');
    this._content = $dom.children();

    this.options = options;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this._overlayWrap.addClass('show');
    this._overlayWrap.append(this._content);
    $('body').append(this._overlayWrap);
    if (this.options.closeOnClickOut) {
      this._overlayWrap.on('click', event => {
        if (event.target === this._overlayWrap[0]) {
          this.hide();
        }
      });
    }
  }

  hide() {
    this._overlayWrap.removeClass('show');
    this._originWrap.append(this._content);
    this._overlayWrap.remove();
  }
}