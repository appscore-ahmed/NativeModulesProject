import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {OrientationEnum} from '../styles/OrientationEnum';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height > dim.width;
};

export const useOrientation = (): OrientationEnum => {
  const [orientation, setOrientation] = useState<OrientationEnum>(
    isPortrait() ? OrientationEnum.PORTRAIT : OrientationEnum.LANDSCAPE,
  );

  useEffect(() => {
    const callback = () =>
      setOrientation(
        isPortrait() ? OrientationEnum.PORTRAIT : OrientationEnum.LANDSCAPE,
      );
    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.removeEventListener('change', callback);
    };
  }, []);

  return orientation;
};
