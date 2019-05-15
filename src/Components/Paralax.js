import React, { Component } from "react";
import { Calcs } from "./../Core/Calcs";
import './animated.css';

export class Paralax extends Component {
  componentDidMount() {
    let position ={}
    let interval = {};
    const setPosition=(e)=>{
      position={
        clientX:e.clientX,
        clientY:e.clientY
      }
    }
    interval = setInterval(()=>{
      this.paralaxEffect(position);
    },40);
    document.addEventListener("mousemove",setPosition );

    this.killItWithFire=()=>{
      document.removeEventListener("mousemove", setPosition);
      clearInterval(interval);
    }
  }
  componentWillUnmount() {
    this.killItWithFire();
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
      let x = ((position.x * (deep * percentX)) / hipotenusa)-(domSize.width/2);
      let y = ((position.y * (deep * percentY)) / hipotenusa) *
      percentY;
      
      let translate = `translate3D(${x}px,${y}px,100px)`;

      dom.style.transform = translate;
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
