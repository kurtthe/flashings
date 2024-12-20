import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

type onCallBack = () => void;
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
        onKeyboardDidShow && onKeyboardDidShow();
      },
    );
    const susbcriptionKeyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        onKeyboardDidHide && onKeyboardDidHide();
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
