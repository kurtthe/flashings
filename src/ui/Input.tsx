import {ReactElement, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {useCombinedRefs} from '@hooks/useCombinedRefs';
