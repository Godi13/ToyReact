class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(key, value) {
    if (key.match(/^on([\s\S]+)$/)) {
      const eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLowerCase())
      this.root.addEventListener(eventName, value);
    }
    if (key === 'className') {
      this.root.setAttribute('class', value);
    } else {
      this.root.setAttribute(key, value);
    }
  }
  appendChild(vchild) {
    const range = document.createRange();
    if (this.root.children.length) {
      range.setStartAfter(this.root.lastChild);
      range.setEndAfter(this.root.lastChild);
    } else {
      range.setStart(this.root, 0);
      range.setEnd(this.root, 0);
    }
    vchild.mountTo(range);
  }
  mountTo(range) {
    range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(range) {
    range.insertNode(this.root);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.children = []
  }
  setAttribute(key, value) {
    this.props[key] = value;
    this[key] = value;
  }
  mountTo(range) {
    this.range = range;
    this.update();
  }
  update() {
    const placeholder = document.createComment('placeholder')
    const range = document.createRange();
    range.setStart(this.range.endContainer, this.range.endOffset);
    range.setEnd(this.range.endContainer, this.range.endOffset);
    range.insertNode(placeholder);

    this.range.deleteContents();
    const vdom = this.render();
    vdom.mountTo(this.range);
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
  setState(state) {
    const merge = (oldState, newState) => {
      for (let k in newState) {
        if (typeof newState[k] === 'object') {
          if (typeof oldState[k] !== 'object') {
            oldState[k] = {};
          }
          merge(oldState[k], newState[k])
        } else {
          oldState[k] = newState[k];
        }
      }
    }

    if (!this.state && state) {
      this.state = {}
    }

    merge(this.state, state);
    this.update();
  }
}

export default {
  createElement(type, attrs, ...rest) {
    let element;
    if (typeof type === 'string') {
      element = new ElementWrapper(type);
    } else {
      element = new type;
    }
    for (let key in attrs) {
      element.setAttribute(key, attrs[key]);
    }
    const insertChild = (children) => {
      for (let child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertChild(child);
        } else {
          if (!(child instanceof Component) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)) {
            child = String(child);
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    }
    insertChild(rest);

    return element;
  },
  render(vdom, element) {
    const range = document.createRange();
    if (element.children.length) {
      range.setStartAfter(element.firstChild);
      range.setEndAfter(element.firstChild);
    } else {
      range.setStart(element[0], 0);
      range.setEnd(element[0], 0);
    }
    vdom.mountTo(range);
  }
}