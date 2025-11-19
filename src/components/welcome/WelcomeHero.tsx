import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppColors } from '../../theme/colors';

function WelcomeHero() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome/wern-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to the Future</Text>
      <Text style={styles.subtitle}>
        Transform your daily walks into rewards while building a safer, more
        connected community.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 60,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    color: AppColors.primaryTextDark,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: AppColors.primaryTextDark,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    
  },
});

export default WelcomeHero;
