import { useRef, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const useScrollAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollPosition = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;

    // Detectar dirección del scroll
    if (currentScrollPosition > lastScrollPosition.current) {
      setScrollDirection('down');
    } else if (currentScrollPosition < lastScrollPosition.current) {
      setScrollDirection('up');
    }

    // Actualizar la última posición de scroll
    lastScrollPosition.current = currentScrollPosition;

    // Actualizar el valor de scrollY
    scrollY.setValue(currentScrollPosition);
  };

  return {
    scrollY,
    handleScroll,
    scrollDirection,
  };
};
