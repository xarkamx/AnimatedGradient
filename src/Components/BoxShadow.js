import React, { Component } from "react";
import { Calcs } from "./../Core/Calcs";
export class BoxShadow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streng: props.streng || 10,
      layers: props.layers || ["rgba(0,0,0.5)"]
    };
  }
  componentDidMount() {
    document.addEventListener("mousemove", e => {
      const calc = new Calcs();
      const streng = this.state.streng;
      const shadowDiv = this.refs.shadow;
      const center = calc.getCenter(shadowDiv);
      const cursor = {
        x: e.clientX,
        y: e.clientY
      };

      let shadowPos = {
        x: center.x - cursor.x,
        y: center.y - cursor.y
      };
      let hipotenusa = calc.scaleTo(
        calc.hipotenusa(center, cursor).hipotenusa,
        streng / 2
      );
      shadowPos.x = Math.floor(calc.scaleTo(shadowPos.x, streng));
      shadowPos.y = Math.floor(calc.scaleTo(shadowPos.y, streng));
      let shadow = this.setLayers(shadowPos.x, shadowPos.y, hipotenusa);
      shadowDiv.style.boxShadow = shadow;
    });
  }
  setLayers(x, y, hipotenusa) {
    let { layers, streng } = this.state;
    let layersStrings = [];
    for (let index = 0; index < layers.length; index++) {
      let increment = (hipotenusa / streng) * index;
      let color = layers[index];
      layersStrings.push(
        `${x + increment * Math.sign(x)}px ${y +
          increment * Math.sign(y)}px ${hipotenusa / 5}px ${color}`
      );
    }
    return layersStrings.join();
  }
  render = () => {
    return (
      <div
        ref="shadow"
        style={{
          overflow: "hidden"
        }}
      >
        {this.props.children}
      </div>
    );
  };
}
