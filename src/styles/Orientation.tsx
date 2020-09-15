import {Dimensions} from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('window'); 
  return dim.height >= dim.width;
};

export const getOrientation = () => {
  if (isPortrait()) {
    return 'PORTRAIT';
  } else {
    return 'LANDSCAPE';
  }
};
