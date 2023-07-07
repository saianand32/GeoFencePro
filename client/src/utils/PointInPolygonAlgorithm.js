export const PointInPolygonAlgorithm = (lat, lon, latArray, lonArray) => {
  let i, j, res = false;

  for (i = 0, j = latArray.length - 1; i < latArray.length; j = i++) {
    if ((latArray[i] === lat && lonArray[i] === lon) || (latArray[j] === lat && lonArray[j] === lon)) {
      return true;
    }
    if (lonArray[i] > lon !== lonArray[j] > lon && lat < ((latArray[j] - latArray[i]) * (lon - lonArray[i])) / (lonArray[j] - lonArray[i]) + latArray[i]) {
      res = !res;
    }
  }
  return res;
};
