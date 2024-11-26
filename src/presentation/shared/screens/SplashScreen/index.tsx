import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
  ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../store/redux/rootReducer';

export function SplashScreen() {
  const appTheme = useSelector((state: RootState) => state.theme.theme);
  const [progress, setProgress] = useState(0);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]),
    ).start();
  }, [animation]);

  const animatedStyle = {
    opacity: animation,
  };

  const styles = getStyles(appTheme);

  return (
    <ImageBackground
      source={require('../../assets/images/background-image-splash-screen.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Text style={[styles.title, animatedStyle]}>BasketCol</Animated.Text>
        <Animated.Text style={[styles.subtitle, animatedStyle]}>
          ¡Donde comienza la grandeza!
        </Animated.Text>

        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.loadingText}>
          {progress < 100 ? 'Preparando tu mejor jugada...' : '¡A la cancha!'}
        </Text>
      </View>
    </ImageBackground>
  );
}
