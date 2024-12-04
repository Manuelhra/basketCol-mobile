import React, { useState, useEffect } from 'react';
import { Animated, View } from 'react-native';

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TopNavigationComponent } from '../../components/TopNavigationComponent';

type BasketColLayoutProps = {
  children: React.ReactNode;
  rightIcons?: { icon: string, action: () => void }[];
};

export function BasketColLayout({
  children,
  rightIcons,
}: BasketColLayoutProps): React.JSX.Element {
  const { scrollY, handleScroll, scrollDirection } = useScrollAnimation();
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollY.addListener(({ value }) => {
      // Mostrar navbar si está subiendo o está cerca de la parte superior
      if (scrollDirection === 'up' || value <= 56) {
        setNavbarVisible(true);
      } else if (scrollDirection === 'down' && value > 56) {
      // Ocultar navbar si está bajando y ha pasado cierta altura
        setNavbarVisible(false);
      }
    });

    return () => {
      scrollY.removeListener(unsubscribe);
    };
  }, [scrollY, scrollDirection]);

  const translateY = navbarVisible
    ? new Animated.Value(0)
    : new Animated.Value(-56);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <TopNavigationComponent scrollY={scrollY} rightIcons={rightIcons} />
      </Animated.View>
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 56 }}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}
