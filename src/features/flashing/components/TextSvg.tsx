import React from 'react';
import {Rect, Text} from 'react-native-svg';
import {isTablet} from '@shared/platform';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  positionTextX: number;
  positionTextY: number;
  positionTextXRect?: number;
  positionTextYRect?: number;
  id: number;
  textValue: string;
  fontSize?: number;
  colorLabel?: string;
};

const TextSvg: React.FC<Props> = ({
  fontSize = isTablet ? 17 : 14,
  colorLabel = '#000',
  positionTextX,
  positionTextY,
  textValue,
  id,
  positionTextXRect,
  positionTextYRect,
}) => {
  const [textWidth, setTextWidth] = React.useState(30);
  const translateX = useSharedValue(positionTextX);
  const translateY = useSharedValue(positionTextY);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.x;
      translateY.value = event.x;
    },
    onEnd: () => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  return (
    <PanGestureHandler {...{onGestureEvent}}>
      <Animated.View
        style={[
          {backgroundColor: 'red', width: 39, height: 38},
          animatedStyle,
        ]}>
        {positionTextXRect && positionTextYRect && (
          <Rect
            width={textWidth + 10}
            height={fontSize + 3}
            origin={`${positionTextX}, ${positionTextY}`}
            fill="white"
            y={positionTextYRect}
            x={positionTextXRect}
            rx={0}
            ry={0}
          />
        )}
        <Text
          onLayout={event => {
            setTextWidth(event.nativeEvent.layout.width + 8);
          }}
          key={`backgroundSizeText${id}`}
          textAnchor="middle"
          fill={colorLabel}
          y={positionTextY}
          x={positionTextX}
          fontSize={fontSize}>
          {textValue}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
export default TextSvg;
