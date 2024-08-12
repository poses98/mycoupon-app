import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'form-label'
    | 'button';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'form-label' ? styles.formLabel : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'button' ? styles.button : undefined,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'ArialRonded',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'ArialRonded',
  },
  link: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  formLabel: { fontSize: 11, lineHeight: 13, fontWeight: '400' },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
