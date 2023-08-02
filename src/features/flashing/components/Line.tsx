import React from 'react';
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const Line = ({cx, cy}: {cx: number; cy: number}) => {
  const translateX = useSharedValue(cx);
  const translateY = useSharedValue(cy);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const animatedProps = useAnimatedProps(() => {
    const pathLineComparative = `M${positionX},169.6157582267021 C${positionX},169.6157582267021 ${positionX},0 ${positionX},0`;

    return {
      d: pathLineComparative,
    };
  });

  return <AnimatedPath animatedProps={animatedProps} />;
};
