import { DefaultLoadingManager } from "three";

const PointInPolyAlgo = (x, y, cornersX, cornersY) => {
  let i,
  j = cornersX.length - 1;
  var odd = 0;

  var pX = cornersX;
  var pY = cornersY;

  for (i = 0; i < cornersX.length; i++) {
    if (
      ((pY[i] < y && pY[j] >= y) || (pY[j] < y && pY[i] >= y)) &&
      (pX[i] <= x || pX[j] <= x)
    ) {
      odd ^= pX[i] + ((y - pY[i]) * (pX[j] - pX[i])) / (pY[j] - pY[i]) < x;
    }

    j = i;
  }

  return odd;
};

export default PointInPolyAlgo;
// const f = checkcheck(0.01, 0.001, [0, 10, 10, 0], [0, 0, 10, 10]);

