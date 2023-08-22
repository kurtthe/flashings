import React from 'react';
import { Circle } from 'react-native-svg';
import type { CircleProps } from 'react-native-svg';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { CIRCLE_RADIUS } from '@features/flashing/components/Board';

type Props = CircleProps;

type ContextType = {
  translateX: number;
  translateY: number;
};
const PointerComponent: React.FC<Props> = props => {
  const [currentPosition, setCurrentPosition] = React.useState([
    props.cx,
    props.cy,
  ]);

  // @ts-ignore
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = currentPosition[0] as number;
      context.translateY = currentPosition[1] as number;
    },
    onActive: (event, context) => {
      const newX = event.translationX + context.translateX;
      const newY = event.translationY + context.translateY;

      setCurrentPosition([newX, newY]);
    },
    onEnd: () => {
      const distance = Math.sqrt(
        parseInt(String(currentPosition[0] as number)) ** 2 +
          parseInt(String(currentPosition[1] as number)) ** 2,
      );

      if (distance < CIRCLE_RADIUS / 2) {
        setCurrentPosition([withSpring(0), withSpring(0)]);
      }
    },
  });

  const animatedProps = useAnimatedProps(() => {
    return { cx: currentPosition[0], cy: currentPosition[1] };
  });

  return (
    <>
      <PanGestureHandler
        key={`gesture${Math.random()}`}
        onGestureEvent={panGestureEvent}>
        <AnimatedCircle
          {...props}
          key={`pointer${Math.random()}`}
          animatedProps={animatedProps}
        />
      </PanGestureHandler>
    </>
  );
};

export default PointerComponent;
