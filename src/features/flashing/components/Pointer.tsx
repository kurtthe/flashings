import React from 'react';
import {Circle} from 'react-native-svg';
import type {CircleProps} from 'react-native-svg';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {useVector} from 'react-native-redash';

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
      console.log('start');
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      console.log('onActive', event);
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      console.log('onEnd');
    },
  });

  const rStyle = useAnimatedStyle(() => {
    console.log('transform', translateX.value);
    console.log('transform', translateY.value);
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
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});
export default PointerComponent;
