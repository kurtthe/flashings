import React from 'react';
import {Circle} from 'react-native-svg';
import type {CircleProps} from 'react-native-svg';
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
import {CIRCLE_RADIUS, CoordsType} from '@features/flashing/components/Board';

type Props = CircleProps & {
  key: number;
};

type ContextType = {
  translateX: number;
  translateY: number;
};
const PointerComponent: React.FC<Props> = props => {
  const translateX = useSharedValue(props.cx);
  const translateY = useSharedValue(props.cy);

  // @ts-ignore
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value as number;
      context.translateY = translateY.value as number;
    },
    onActive: (event, context) => {
      const newX = event.translationX + context.translateX;
      const newY = event.translationY + context.translateY;

      translateX.value = newX;
      translateY.value = newY;
    },
    onEnd: () => {
      const distance = Math.sqrt(
        parseInt(String(translateX.value as unknown as number)) ** 2 +
          parseInt(String(translateY.value as unknown as number)) ** 2,
      );

      if (distance < CIRCLE_RADIUS / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedProps = useAnimatedProps(() => {
    return {cx: translateX.value, cy: translateY.value};
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
