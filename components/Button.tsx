import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function Button({
  title,
  onPress,
  disabled,
  bgcolor,
  borderColor,
  border,
  textColor,
  textWeight,
  borderRadius,
  width,
  marginVertical,
  position,
  bottom,
  top,
  height,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  bgcolor?: string;
  borderColor?: string;
  border?: boolean;
  textColor?: string;
  textWeight?: string;
  borderRadius?: number;
  width?: number;
  marginVertical?: number;
  position?: 'absolute' | 'relative';
  bottom?: number;
  top?: number;
  height?: number;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgcolor || Colors.light.buttonYellow,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: borderColor || 'black',
        borderStyle: border ? 'solid' : undefined,
        borderRadius: borderRadius || 4,
        opacity: disabled ? 0.5 : 1,
        width: width || '100%',
        marginVertical: marginVertical || 0,
        position: position || 'relative',
        bottom: bottom || 0,
        top: top || 0,
        height: height || 'auto',
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedText
        type="button"
        style={{
          color: textColor || '#000',
          fontWeight: 'bold',
        }}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}
