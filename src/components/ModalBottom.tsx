import React from 'react';
import {forwardRef} from '@ui/utils';
import {BottomSheet} from 'react-native-sheet';
import type {BottomSheetProps, BottomSheetRef} from 'react-native-sheet';

export type ModalBottomRef = BottomSheetRef;
export type ModalBottomProps = BottomSheetProps & {
  height?: number;
};

const ModalBottom = forwardRef<ModalBottomProps, typeof BottomSheet>(
  ({children, height = 400, ...rest}, ref) => {
    return (
      <BottomSheet height={height} ref={ref} {...rest}>
        {children}
      </BottomSheet>
    );
  },
);

export default ModalBottom;
