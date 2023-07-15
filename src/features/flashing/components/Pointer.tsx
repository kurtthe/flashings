import React from 'react';
import {Circle} from 'react-native-svg';
import type {CircleProps} from 'react-native-svg';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {useVector} from 'react-native-redash';
import {CIRCLE_RADIUS} from '@features/flashing/components/Board';

type Props = {
  x: number;
  y: number;
};

type ContextType = {
  translateX: number;
  translateY: number;
};
const PointerComponent: React.FC<Props> = ({x = 0, y = 0}) => {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <>
      <PanGestureHandler
        key={`gesture${Math.random()}`}
        onGestureEvent={panGestureEvent}>
        <Animated.View
          key={`indicator${Math.random()}`}
          style={[styles.pointer, rStyle]}
        />
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  pointer: {
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    backgroundColor: '#8F94AE',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 20,
  },
});
export default PointerComponent;
