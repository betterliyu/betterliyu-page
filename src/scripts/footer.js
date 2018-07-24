import $ from 'zepto';
import Overlay from './overlay.js';

class Footer {
  init() {
    this.weChatOverlay = new Overlay($('#wechatQRCcode'), {
      closeOnClickOut: true
    });
    this._initWeChat();
  }

  _initWeChat() {
    $('#showWeChat').on('click', () => {
      this.weChatOverlay.show();
    });
    $('#hideWeChat').on('click', () => {
      this.weChatOverlay.hide();
    });
  }

}

export default new Footer();