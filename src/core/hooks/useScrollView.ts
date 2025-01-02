import {useRef} from 'react';
import {ScrollView} from 'react-native';

export const useScrollView = () => {
  const scrollRef = useRef<ScrollView>(null);

  const scrollToY = (newCoordenateY: number) => {
    if (!scrollRef || !scrollRef.current) return;

    scrollRef.current.scrollTo({
      x: 50,
      y: newCoordenateY,
      animated: true,
    });
  };

  return {
    scrollRef,
    scrollToY,
  };
};
