class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(key, value) {
    this.root.setAttribute(key, value);
  }
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = []
  }
  setAttribute(key, value) {
    this[key] = value;
  }
  mountTo(parent) {
    const vdom = this.render();
    vdom.mountTo(parent);
  }
  appendChild(vchild) {
    this.children.push(vchild);
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
  render(vdom, parent) {
    console.log(vdom)
    vdom.mountTo(parent);
  }
}