// responsive.js

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions for standard screen sizes (iPhone 8)
const baseWidth = 375;
const baseHeight = 667;

// Calculate responsive width
export const rw = (value) => {
  const ratio = value / baseWidth;
  return width * ratio;
};

// Calculate responsive height
export const rh = (value) => {
  const ratio = value / baseHeight;
  return height * ratio;
};

// Calculate responsive font size
export const rf = (value) => {
  const ratio = value / baseWidth;
  const newSize = Math.round(ratio * width);
  return newSize;
};
