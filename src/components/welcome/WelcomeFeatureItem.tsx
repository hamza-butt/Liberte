import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../../theme/colors';
import App from '../../App';

type WelcomeFeatureItemProps = {
  title: string;
  subtitle: string;
  iconSource: ImageSourcePropType;
  iconBackgroundColor?: string;
  tintIcon?: boolean;
};

function WelcomeFeatureItem({
  title,
  subtitle,
  iconSource,
  iconBackgroundColor = 'rgba(0,0,0,0.12)',
  tintIcon = true,
}: WelcomeFeatureItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBackgroundColor }]}>
        <Image
          source={iconSource}
          style={[styles.icon, !tintIcon && styles.iconNoTint]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: AppColors.whiteTranslucent,
    borderWidth: 1,
    borderColor: AppColors.whiteTranslucent,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 8,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: AppColors.primaryTextDark,
  },
  iconNoTint: {
    tintColor: undefined,
  },
  textWrapper: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: AppColors.primaryTextDark,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.primaryTextDark,
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.7,
  },
});

export default WelcomeFeatureItem;
