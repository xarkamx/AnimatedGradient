export class Calcs {
  getCenter = dom => {
    const pos = dom.getBoundingClientRect();
    return {
      y: pos.y - pos.height / 2,
      x: pos.x + pos.width / 2
    };
  };
  scaleTo = (current, maxVal = 10) => {
    let pow = Math.pow(maxVal, Math.log10(maxVal));
    return current / pow;
  };
  hipotenusa = (coord1, coord2) => {
    let x = coord1.x - coord2.x;
    let y = coord1.y - coord2.y;
    return {
      hipotenusa: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      legY: y,
      legX: x
    };
  };
}
