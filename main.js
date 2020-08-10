import Toy, { Component } from './Toy.js';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>hello </span>
        <span>world</span>
        <span>!</span>
        <div>
          {true}
        </div>
        {this.children}
      </div>
    )
  }
}

const a = (
  <MyComponent name="111" id="2">
    <div>111</div>
    <div>222</div>
    <div>333</div>
  </MyComponent>
)

Toy.render(
  a,
  document.body
)