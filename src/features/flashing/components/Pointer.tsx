import React from 'react';
import {Circle} from 'react-native-svg';
import type {CircleProps} from 'react-native-svg';
import Animated from 'react-native-reanimated';

const PointerComponent: React.FC<CircleProps> = props => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return <AnimatedCircle {...props} />;
};

export default PointerComponent;
