import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Pressable,
  Text, Keyboard
} from "react-native";
import {Portal} from 'react-native-paper-portal';
import {Icon} from '@ui/components';
import {DownIcon, UpIcon} from '@assets/icons';
import { OptionsType, SelectInputProps } from "@ui/components/SelectInput/SelectInput.types";
import { makeStyles } from "@ui/components/SelectInput/SelectInput.styles";
import { isAndroid } from "@shared/platform";
import { ColorThemeValue } from "@ui/components/SvgBox";

const defaultProps = {
  activeColor: '#F6F7F8',
  data: [],
  style: {},
  selectedTextProps: {},
  value: '',
};

const DropdownComponent = React.forwardRef<any, SelectInputProps>(
  (props, currentRef) => {
    const {
      onChange,
      style,
      containerStyle,
      itemContainerStyle,
      itemTextStyle,
      options,
      label: labelField,
      maxHeight = 190,
      disable = false,
      renderItem,
      onFocus,
      onBlur,
      showsVerticalScrollIndicator = true,
      dropdownPosition = 'auto',
      flatListProps,
      statusBarIsTranslucent,
      backgroundColor,
      onChangeText,
      confirmSelectItem,
      onConfirmSelectItem,
      renderItems,
      inputStyles,
      search = false,
      value = '',
      portal = true,
    } = props;
    const ref = useRef<View>(null);
    const refList = useRef<FlatList>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<OptionsType | undefined>();
    const [position, setPosition] = useState<any>();
    const [focus, setFocus] = useState<boolean>(false);
    const inputRef = React.useRef<TextInput>(null);
    const [labelColor, setLabelColor] = React.useState<string | undefined>(
      undefined,
    );
    const {width: W, height: H} = Dimensions.get('window');
    const styles = makeStyles(isAndroid)
    React.useEffect(() => {
      const optionValue = options.find(
        item => item.value.toString() === value || item.label === value,
      );
      if (!optionValue) return;
      setCurrentValue(optionValue);
    }, [value, options]);

    const styleContainerVertical: ViewStyle = useMemo(() => {
      return {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
      };
    }, []);
    const styleHorizontal: ViewStyle = useMemo(() => {
      return {
        marginBottom: 20,
        width: W / 2,
        alignSelf: 'center',
      };
    }, [W]);

    useImperativeHandle(currentRef, () => {
      return {open: eventOpen, close: eventClose};
    });

    const eventOpen = () => {
      if (!disable) {
        setVisible(true);
        if (onFocus) {
          onFocus();
        }
      }
    };

    const eventClose = useCallback(() => {
      if (!disable) {
        setVisible(false);
        if (onBlur) {
          onBlur();
        }
      }
    }, [disable, onBlur]);

    const _measure = useCallback(() => {
      if (ref && ref?.current) {
        ref.current.measure((_width, _height, px, py, fx, fy) => {
          const w = Math.floor(px);
          const top = Math.floor(py) + Math.floor(fy) + 2;
          const bottom = H - top;
          const left = I18nManager.isRTL
            ? W - Math.floor(px) - Math.floor(fx)
            : Math.floor(fx);

          setPosition({
            w,
            top,
            bottom: Math.floor(bottom),
            left,
            height: Math.floor(py),
          });
        });
      }
    }, [H, W]);

    const onSelect = useCallback(
      (item: any) => {
        if (confirmSelectItem && onConfirmSelectItem) {
          return onConfirmSelectItem(item);
        }
        setCurrentValue(item);
        onChange && onChange(item);
        eventClose();
      },
      [
        confirmSelectItem,
        eventClose,
        onChange,
        onChangeText,
        onConfirmSelectItem,
      ],
    );

    const _renderItem = useCallback(
      ({item, index}: {item: OptionsType; index: number}) => {
        if (renderItems) {
          const children = renderItems(item, index);
          return (
            <Pressable
              onPress={() => {
                if(item.disabled) return;

                onSelect(item);
                setLabelColor(undefined);
              }}>
              {children}
            </Pressable>
          );
        }

        return (
          <Pressable
            onPress={() => {
              if(item.disabled) return;

              onSelect(item);
              setLabelColor(undefined);
            }}>
            <View style={[styles.dropdownItem, {backgroundColor: item.bgColor}]}>
              <Text style={[styles.dropdownTextStyles, {color: item.textColor, fontWeight: item.bold? 'bold': 'normal'}]}>{item.label}</Text>
            </View>
          </Pressable>
        );
      },
      [
        currentValue,
        itemContainerStyle,
        itemTextStyle,
        labelField,
        onSelect,
        renderItem,
        labelColor,
        setLabelColor,
      ],
    );

    const _renderListTop = useCallback(() => {
      return (
        <View style={[styles.flexShrink, {flexShrink: 1}]}>
          <FlatList
            {...flatListProps}
            ref={refList}
            data={options}
            renderItem={_renderItem}
            keyExtractor={(_item, index) => `option-top${index}`}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            contentContainerStyle={{
              paddingVertical: 10,
            }}
          />
        </View>
      );
    }, [_renderItem, flatListProps, showsVerticalScrollIndicator]);

    const showOrClose = useCallback(() => {
      if (disable) return;

      _measure();
      setFocus(!visible);
      setVisible(!visible);

      if (!visible) {
        Keyboard.dismiss()
        onFocus && onFocus();
      } else {
        inputRef.current?.blur();
        onBlur && onBlur();
      }
    }, [_measure, options, disable, onBlur, onFocus, visible]);

    const _renderListBottom = useCallback(() => {
      return (
        <TouchableWithoutFeedback>
          <View style={styles.flexShrink}>
            <FlatList
              {...flatListProps}
              ref={refList}
              data={options}
              renderItem={_renderItem}
              keyExtractor={(_item, index) => `option-bottom${index}`}
              showsVerticalScrollIndicator={showsVerticalScrollIndicator}
              contentContainerStyle={{
                paddingVertical: 10,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }, [_renderItem, flatListProps, showsVerticalScrollIndicator]);

    const _renderModal = useCallback(() => {
      if (visible && position) {
        const {w, top, bottom, left, height} = position;
        if (w && top && bottom) {
          const styleVertical: ViewStyle = {left: left, maxHeight: maxHeight};
          const isTopPosition =
            dropdownPosition === 'auto'
              ? bottom < 250
              : dropdownPosition === 'top';
          let topHeight = isTopPosition ? (top - height) : top;
          const keyboardStyle: ViewStyle = {};

          if (!portal) {
            return (
              <TouchableWithoutFeedback onPress={showOrClose}>
                <View
                  style={StyleSheet.flatten([
                    styles.container,
                    styleVertical,
                    {left: 0, top: 5, marginBottom: 15},
                  ])}>
                  {_renderListBottom()}
                </View>
              </TouchableWithoutFeedback>
            );
          }

          return (
            <Portal>
              <TouchableWithoutFeedback onPress={showOrClose}>
                <View
                  style={StyleSheet.flatten([
                    styles.flex1,
                    {backgroundColor: backgroundColor},
                    keyboardStyle,
                  ])}>
                  <View
                    style={StyleSheet.flatten([
                      styles.wrapTop,
                      {
                        height: topHeight,
                        width: w,
                      },
                    ])}>
                    {isTopPosition && (
                      <View
                        style={StyleSheet.flatten([
                          {width: w},
                          styles.container,
                          containerStyle,
                          styleVertical,
                        ])}>
                        {_renderListTop()}
                      </View>
                    )}
                  </View>
                  <View style={styles.flex1}>
                    {!isTopPosition && (
                      <View
                        style={StyleSheet.flatten([
                          {width: w},
                          styles.container,
                          containerStyle,
                          styleVertical,
                        ])}>
                        {_renderListBottom()}
                      </View>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Portal>
          );
        }
        return null;
      }
      return null;
    }, [
      visible,
      position,
      maxHeight,
      dropdownPosition,
      statusBarIsTranslucent,
      showOrClose,
      styleContainerVertical,
      backgroundColor,
      containerStyle,
      styleHorizontal,
      _renderListTop,
      _renderListBottom,
      H,
      focus,
    ]);

    return (
      <View
        style={StyleSheet.flatten([styles.mainWrap, style])}
        ref={ref}
        onLayout={_measure}>
        <Pressable style={styles.contentInput} onPress={() => showOrClose()}>
            <TextInput
              style={[
                styles.input,
                inputStyles,
                {
                  backgroundColor: currentValue?.bgColor && currentValue?.bgColor,
                  color: currentValue?.textColor ? currentValue?.textColor : '#8F94AE',
                  fontWeight: currentValue?.bold ? 'bold' : 'normal'
                }
              ]}
              value={`${currentValue?.label ?? labelField}`}
              editable={search}
              onPressIn={() => showOrClose()}
            />
            <Icon
              as={visible ? DownIcon : UpIcon}
              style={{alignSelf: 'center', position: 'absolute', right: 10}}
              color={currentValue?.textColor? currentValue?.textColor as ColorThemeValue: 'black'}
            />
        </Pressable>
        {_renderModal()}
      </View>
    );
  },
);

DropdownComponent.defaultProps = defaultProps;
export default DropdownComponent;


