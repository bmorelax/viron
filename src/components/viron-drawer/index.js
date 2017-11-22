import ObjectAssign from 'object-assign';
import riot from 'riot';

export default function() {
  const store = this.riotx.get();

  // `tag` = drawer内に展開されるriot tagインスタンス。
  let tag;

  const fadeIn = () => {
    setTimeout(() => {
      this.isVisible = true;
      this.update();
    }, 100);
  };

  const fadeOut = () => {
    this.isVisible = false;
    this.update();

    setTimeout(() => {
      store.action('drawers.remove', this.opts.id);
    }, 1000);
  };

  this.layoutType = store.getter('layout.type');
  this.listen('layout', () => {
    this.layoutType = store.getter('layout.type');
    this.update();
  });

  this.on('mount', () => {
    tag = riot.mount(this.refs.content, this.opts.tagname, ObjectAssign({
      isDrawer: true,
      drawerCloser: fadeOut
    }, this.opts.tagopts))[0];
    fadeIn();
    window.addEventListener('keydown', this.handleKeyDown);
  }).on('before-unmount', () => {
    tag.unmount(true);
  }).on('unmount', () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  });

  this.handleTap = () => {
    fadeOut();
  };

  this.handleFrameTap = e => {
    // 内部イベントを外部に伝播させない。
    e.stopPropagation();
  };

  this.handleKeyDown = e => {
    switch (e.keyCode) {
    case 27:// Esc
      fadeOut();
      break;
    default:
      break;
    }
  };
}
