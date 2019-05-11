import React, { Component } from "react";
import { Calcs } from "./../Core/Calcs";

export class Paralax extends Component {
  componentDidMount() {
    document.addEventListener("mousemove", this.paralaxEffect.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this.paralaxEffect);
  }
  paralaxEffect(position) {
    const calc = new Calcs();
    const paralax = this.refs.paralax;
    if (paralax == undefined) {
      return false;
    }
    const center = calc.getCenter(paralax);
    const cursor = {
      x: position.clientX,
      y: position.clientY
    };

    let imageParalax = {
      x: center.x - cursor.x,
      y: cursor.y * -1 - center.y
    };
    let hipotenusa = calc.scaleTo(
      calc.hipotenusa(center, cursor).hipotenusa,
      10
    );
    imageParalax.x = Math.floor(calc.scaleTo(imageParalax.x, 10));
    imageParalax.y = Math.floor(calc.scaleTo(imageParalax.y, 10));
    this.setImageStyle(
      imageParalax,
      hipotenusa,
      paralax.querySelectorAll("img")
    );
  }
  setImageStyle(position, hipotenusa, imageDomNodes) {
    const windowSize = {
      width: window.screen.width,
      height: window.screen.height
    };
    for (let dom of imageDomNodes) {
      let domSize = { width: dom.offsetWidth, height: dom.offsetHeight };
      let percentX = domSize.width / windowSize.width;
      let percentY = domSize.height / windowSize.height;
      let deep = dom.dataset.zindex;
      let valueX = `${(position.x * (deep * percentX)) / hipotenusa}px`;
      let valueY = `${((position.y * (deep * percentY)) / hipotenusa) *
        percentY}px`;

      dom.style.top = valueY;
      dom.style.left = valueX;
    }
  }

  render() {
    const { children, layers, style, ...rest } = this.props;
    return (
      <main
        ref="paralax"
        className="paralax"
        style={{
          overflow: "hidden",
          position: "relative",
          height: "100%",
          ...style
        }}
        {...rest}
      >
        {(layers || []).map((layer, key) => {
          return (
            <img
              src={layer.path}
              key={key}
              alt={"image" + key}
              data-zindex={layer.deep || 0}
              style={{
                transform: `scale(${layer.scale})`,
                height: "auto",
                position: "absolute",
                ...layer
              }}
            />
          );
        })}
        {children}
      </main>
    );
  }
}
