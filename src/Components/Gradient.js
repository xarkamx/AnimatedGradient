import React, { Component } from "react";
import { Calcs } from "../Core/Calcs";

export class Gradient extends Component {
  constructor(props) {
    super(props);
    const colors = [this.randColor(), this.randColor(), this.randColor()];
    this.state = {
      colors: props.colors || colors
    };
  }
  getAngle(center, cursor) {
    let { hipotenusa, legX } = this.hipotenusa(center, cursor);
    let rad = Math.asin(legX / hipotenusa);
    let deg = this.radToDeg(rad);
    return deg;
  }
  hipotenusa(coord1, coord2) {
    const calc = new Calcs().hipotenusa(coord1, coord2);
    return calc;
  }

  radToDeg = rad => rad * (180 / Math.PI);
  componentDidMount() {
    this.mouseData = { clientX: 0, clientY: 0 };
    this.drawGradient(this.mouseData);
    document.addEventListener("mousemove", e => {
      this.mouseData = e;
    });
    setInterval(() => {
      this.drawGradient(this.mouseData);
    }, 16);
  }
  getCenter() {
    const gradientDiv = this.refs.gradient;
    const calc = new Calcs();
    return calc.getCenter(gradientDiv);
  }
  drawGradient(e) {
    const cursor = { x: e.clientX, y: e.clientY };
    const center = this.getCenter();
    const deg = Math.floor(this.getAngle(center, cursor));
    let colors = this.setColors(100, this.state.colors);
    let grad = `linear-gradient(
            ${deg}deg,
            ${colors}) `;
    this.refs.gradient.style.backgroundImage = grad;
  }
  randColor = () => {
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    return `rgba(${red},${green},${blue})`;
  };
  setColors(level, colors) {
    let colorStrings = [];
    let percent = 0;
    for (let index in colors) {
      let color = colors[index];
      percent = (index / colors.length) * level;
      colorStrings.push(`${color} ${percent}%`);
    }
    return colorStrings.join();
  }
  calcPercentColor(cursor) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { x: (cursor.x / width) * 100, y: (cursor.y / height) * 100 };
  }
  render = () => {
    return (
      <div
        ref="gradient"
        id="grad"
        style={{
          color: "white",
          height: "100%",
          width: "100%",
          float: "right",
          transition: "background .3s"
        }}
      >
        {this.props.children}
      </div>
    );
  };
}
