import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  ViewStyle,
  VirtualizedList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
  SheetManager,
} from 'react-native-actions-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import {Sheets} from '../../constants/SheetConstants';

interface CommonSheetProps {
  sheetId: string;
  title?: string;
  children: React.ReactNode;
  maxHeight?: DimensionValue;
  height?: DimensionValue;
  leftContent?: any;
  CustomHeaderComponent?: any;
  containerStyle?: ViewStyle;
  actionSheetBGColor: string;
  closeButton: boolean;
  showCancelBtn?: boolean;
}

const CommonSheet = React.forwardRef<ActionSheetRef, CommonSheetProps>(
  (
    {
      sheetId,
      title,
      children,
      maxHeight = '80%',
      height = undefined,
      leftContent = null,
      CustomHeaderComponent = null,
      containerStyle = {},
      actionSheetBGColor,
      showCancelBtn = true,
    },
    ref,
  ) => {
    const {theme} = useCustomTheme();
    const styles = createStyles(theme);

    return (
      <View>
        <ActionSheet
          ref={ref}
          id={sheetId}
          gestureEnabled
          backgroundInteractionEnabled={false}
          closeOnTouchBackdrop={true}
          defaultOverlayOpacity={0.3}
          containerStyle={{
            maxHeight: maxHeight,
            height: height,
            backgroundColor: actionSheetBGColor
              ? actionSheetBGColor
              : theme.background,
          }}
          keyboardHandlerEnabled={true}
          CustomHeaderComponent={CustomHeaderComponent}
          safeAreaInsets={{bottom: 40, top: 0, left: 0, right: 0}}>
          <KeyboardAvoidingView style={containerStyle}>
            {/* Close Button */}
           <View style={styles.header}>
              {leftContent ? (
                leftContent
              ) : (
                <Text style={styles.title}>{title || 'Sheet Title'}</Text>
              )}
            <TouchableOpacity
                onPress={() => SheetManager.hide(Sheets.DeleteSheet)}>
                <Ionicons
                  name="close-circle-outline"
                  size={32}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            <VirtualizedList
              keyExtractor={(_: any, index: any) => index.toString()}
              getItemCount={() => 1}
              keyboardShouldPersistTaps={'handled'}
              getItem={(_: any, index: any) => index}
              renderItem={() => (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                  {children}
                </ScrollView>
              )}
            />
          </KeyboardAvoidingView>
        </ActionSheet>
      </View>
    );
  },
);

export default CommonSheet;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 10,
    },
    closeButton: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 10,
      backgroundColor: '#ddd',
      borderRadius: 20,
      padding: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      marginBottom: 10,
      width: '100%',
      paddingHorizontal: 16,
      borderBottomWidth: 0.6,
      borderColor: theme.borderColor,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    closeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    iconHolder: {
      width: '10%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
    },
    borderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      bottom: 3,
    },
    border: {
      width: '90%',
      borderWidth: 0.3,
      borderColor: '#E1E0E0',
    },
  });
