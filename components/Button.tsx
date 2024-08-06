import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.light.buttonYellow,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 4,
      }}
      onPress={onPress}
    >
      <ThemedText type="button">{title}</ThemedText>
    </TouchableOpacity>
  );
}
