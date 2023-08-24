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
  Text,
  FlatListProps,
  ImageStyle,
  StyleProp,
  TextProps,
  TextStyle,
} from 'react-native';
import {Portal} from 'react-native-paper-portal';
import { Image } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from '@ui/components';
import {DownIcon, UpIcon} from '@assets/icons';

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  data: [],
  style: {},
  selectedTextProps: {},
  value: '',
};

export type OptionsType = {
  value: string;
  label: string;
  bgColor?: string;
  textColor?: string;
};

export type SelectInputProps = {
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyles?: TextStyle;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  selectedTextProps?: TextProps;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  maxHeight?: number;
  fontFamily?: string;
  iconColor?: string;
  options: OptionsType[];
  value?: string;
  labelField?: string;
  valueField?: string;
  search?: boolean;
  searchPlaceholder?: string;
  disable?: boolean;
  autoScroll?: boolean;
  showsVerticalScrollIndicator?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  flatListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  keyboardAvoiding?: boolean;
  statusBarIsTranslucent?: boolean;
  backgroundColor?: string;
  confirmSelectItem?: boolean;
  onChange: (item: OptionsType) => void;
  valueSearch?: (text?: string) => void;
  renderLeftIcon?: () => JSX.Element | null | undefined;
  renderRightIcon?: () => JSX.Element | null | undefined;
  renderItem?: (
    item: any,
    selected?: boolean,
  ) => JSX.Element | null | undefined;
  renderInputSearch?: (
    onSearch: (text: string) => void,
  ) => JSX.Element | null | undefined;
  onFocus?: () => void;
  onBlur?: () => void;
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  onChangeText?: (search: string) => void;
  onConfirmSelectItem?: (item: any) => void;
  renderItems?: (item: OptionsType, index: number) => JSX.Element;
  portal?: boolean;
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
      placeholder,
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
    const [nameIcon, setNameIcon] =
      React.useState<keyof typeof Ionicons.glyphMap>('chevron-down-sharp');

    const {width: W, height: H} = Dimensions.get('window');

    React.useEffect(() => {
      const optionValue = options.find(
        item => item.value === value || item.label === value,
      );

      console.log('=>optionValue', optionValue, 'value=>', value);
      console.log('=>options', options);

      if (!optionValue) return;
      setCurrentValue(optionValue);
    }, [value, options]);

    React.useEffect(() => {
      visible && setNameIcon('chevron-up-sharp');
      !visible && setNameIcon('chevron-down-sharp');
    }, [visible]);

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
        if (!!renderItems) {
          const children = renderItems(item, index);
          return (
            <Pressable
              onPress={() => {
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
              onSelect(item);
              setLabelColor(undefined);
            }}>
            <View style={[styles.dropdownItem, {backgroundColor: item.bgColor}]}>
              <Text style={[styles.dropdownTextStyles, {color: item.textColor}]}>{item.label}</Text>
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
        <View style={styles.flexShrink}>
          <FlatList
            {...flatListProps}
            keyboardShouldPersistTaps="handled"
            ref={refList}
            data={options}
            inverted
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
              keyboardShouldPersistTaps="handled"
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
              ? bottom < 500
              : dropdownPosition === 'top';
          let topHeight = isTopPosition ? top - height : top;
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
        {labelField && <Text style={[styles.label]}>{labelField} asdf</Text>}
        <Pressable style={styles.contentInput} onPress={() => showOrClose()}>
            <TextInput
              style={[
                styles.input,
                inputStyles,
                {
                  backgroundColor: currentValue?.bgColor && currentValue?.bgColor,
                  color: currentValue?.textColor ? currentValue?.textColor : 'black'
                }
              ]}
              placeholder={placeholder + 'askjk'}
              value={`${currentValue && currentValue.label}`}
              editable={search}
              onPressIn={() => showOrClose()}
            />
            <Icon
              as={visible ? DownIcon : UpIcon}
              style={{alignSelf: 'center', position: 'absolute', right: 10}}
            />
        </Pressable>
        {_renderModal()}
      </View>
    );
  },
);

DropdownComponent.defaultProps = defaultProps;
export default DropdownComponent;

const styles = StyleSheet.create({
  mainWrap: {
    justifyContent: 'center',
    width: '100%'
  },
  container: {
    flexShrink: 1,
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  flex1: {
    flex: 1,
  },
  flexShrink: {
    height: 300,
    backgroundColor: 'white',
    paddingHorizontal: 6
  },
  wrapTop: {
    justifyContent: 'flex-end',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginVertical: 5,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    paddingTop: 10,
    marginTop: 5,
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    height: 52,
    paddingHorizontal: 8,
    borderWidth: 0.2,
    borderRadius: 8,
    borderColor: '#8F94AE',
    backgroundColor: 'white',
  },
  dropdownTextStyles: {
    fontSize: 20,
    textAlign: 'left',
    paddingLeft: 20
  },
  dropdownItem: {
    justifyContent: 'center',
    height: 60,
    marginBottom: 8,
    width: '100%'
  },
  contentInput: {
    flexDirection: 'row',
    borderColor: '#8F94AE',
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 8,
    color: '#8F94AE'
  },
});
