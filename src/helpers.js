export const getUniqueId = url => url
  .toString()
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');

// TODO: Convert to a component and use a wrapper for other components
export class CardClickHelper {
  constructor() {
    this.links = [];
    this.clickThreshhold = 200;
  }

  onMouseUp(e, index = 0) {
    if (e.button === 0) {
      this.up = +new Date();
      if ((this.up - this.down) < this.clickThreshhold) {
        this.links[index].click();
      }
    }
  }

  onMouseDown(e) {
    if (e.button === 0) {
      this.down = +new Date();
    }
  }

  addLink(ref, index = 0) {
    this.links[index] = ref;
  }
}
