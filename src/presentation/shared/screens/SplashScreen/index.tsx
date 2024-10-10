import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Animated,
} from 'react-native';

import { getStyles } from './styles';

export function SplashScreen() {
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

  // Animación de pulsar para el título y el texto de carga
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

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, animatedStyle]}>BasketCol</Animated.Text>
      <Animated.Text style={[styles.subtitle, animatedStyle]}>¡Prepárate para la acción!</Animated.Text>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.loadingText}>
        {progress < 100 ? 'Calentando motores...' : '¡Listo para jugar!'}
      </Text>
    </View>
  );
}
