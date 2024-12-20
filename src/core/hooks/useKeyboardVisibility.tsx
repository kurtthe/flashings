import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

type onCallBack = (event?: number) => void;
export type KeyboardVisibilityType = {
  onKeyboardDidShow?: onCallBack;
  onKeyboardDidHide?: onCallBack;
};

export const useKeyboardVisibility = ({
  onKeyboardDidShow,
  onKeyboardDidHide,
}: KeyboardVisibilityType) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const susbcriptionKeyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      ev => {
        if (ev.endCoordinates.height < 100) return;
        setKeyboardVisible(true);
        onKeyboardDidShow?.(ev.endCoordinates.height + 70);
      },
    );
    const susbcriptionKeyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        onKeyboardDidHide?.();
      },
    );

    return () => {
      if (typeof susbcriptionKeyboardDidShow?.remove === 'function') {
        susbcriptionKeyboardDidShow.remove();
      } else {
        Keyboard.removeAllListeners('keyboardDidShow');
      }

      if (typeof susbcriptionKeyboardDidHide?.remove === 'function') {
        susbcriptionKeyboardDidHide.remove();
      } else {
        Keyboard.removeAllListeners('keyboardDidHide');
      }
    };
  }, [onKeyboardDidHide, onKeyboardDidShow]);

  return isKeyboardVisible;
};
