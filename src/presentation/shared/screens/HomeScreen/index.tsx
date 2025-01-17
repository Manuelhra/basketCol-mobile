import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  View,
  ScrollView,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { getStyles } from './styles';
import { BasketColLayout } from '../../layout/BasketColLayout';
import { FeatureCardComponent } from './FeatureCardComponent';
import { ComingSoonItemComponent } from './ComingSoonItemComponent';
import { RootState } from '../../store/redux/rootReducer';
import { type MainStackNavigatorParamList } from '../../navigation/MainStackNavigator';

export function HomeScreen(): React.JSX.Element {
  const { theme: { theme, themeMode }, authentication } = useSelector((state: RootState) => state);
  const navigation = useNavigation<NavigationProp<MainStackNavigatorParamList>>();
  const styles = getStyles(theme, themeMode);

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/manuelh_ra');
  };

  const handleSignIn = () => {
    navigation.navigate('authenticateUserScreen');
  };

  return (
    <BasketColLayout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={require('./basketball-court.jpg')}
            style={styles.heroBackground}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>BasketCol</Text>
                <Text style={styles.heroSubtitle}>
                  ¿Y si creamos la comunidad de baloncesto más chimba?
                </Text>
                {/* Conditional Auth Section */}
                <View style={styles.authContainer}>
                  {authentication.isAuthenticated ? (
                    <View style={styles.welcomeContainer}>
                      <Text style={styles.welcomeLabel}>Bienvenido</Text>
                      <Text style={styles.userName}>
                        {`${authentication.authenticatedUser?.name.firstName} ${authentication.authenticatedUser?.name.lastName}`}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.signInButton}
                      onPress={handleSignIn}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.signInButtonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.heroStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>100+</Text>
                    <Text style={styles.statLabel}>Equipos</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1000+</Text>
                    <Text style={styles.statLabel}>Jugadores</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>50+</Text>
                    <Text style={styles.statLabel}>Torneos</Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Features Section Mejorado */}
        <View style={styles.featuresContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionDecoration} />
            <Text style={styles.sectionTitle}>Características Principales</Text>
          </View>
          <FeatureCardComponent
            title="Estadísticas en Tiempo Real"
            description="Sigue tu progreso y el de tu equipo con estadísticas detalladas y análisis en tiempo real"
            icon="chart-bar"
          />
          <FeatureCardComponent
            title="Ligas y Torneos"
            description="Participa en competencias organizadas y demuestra tu talento en la cancha"
            icon="trophy-outline"
          />
          <FeatureCardComponent
            title="Gestión de Equipos"
            description="Administra tu franquicia, plantilla y calendario de manera eficiente"
            icon="account-group-outline"
          />
        </View>

        {/* Coming Soon Section Mejorado */}
        <View style={styles.comingSoonSectionTitle}>
          <View style={styles.comingSoonBackground}>
            <Text style={styles.comingSoonTitle}>Próximamente</Text>
            <View style={styles.comingSoonGrid}>
              <ComingSoonItemComponent title="1vs1" icon="account-plus-outline" />
              <ComingSoonItemComponent title="Modos de Juego" icon="view-dashboard-outline" />
              <ComingSoonItemComponent title="Noticias" icon="newspaper-variant-outline" />
              <ComingSoonItemComponent title="Rankings" icon="medal-outline" />
            </View>
          </View>
        </View>

        {/* Developer Section Mejorado */}
        <View style={styles.developerSection}>
          <View style={styles.developerCard}>
            <Text style={styles.developerTitle}>Desarrollado con 💜 por</Text>
            <TouchableOpacity
              onPress={handleInstagramPress}
              style={styles.developerInfo}
              activeOpacity={0.8}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={require('./manuelh_ra.jpeg')}
                  style={styles.developerAvatar}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.developerTextContainer}>
                <Text style={styles.developerName}>Manuel Rivera</Text>
                <Text style={styles.developerHandle}>@manuelh_ra</Text>
                <Text style={styles.developerRole}>Fundador & Desarrollador Principal</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.followButton}
              onPress={handleInstagramPress}
              activeOpacity={0.8}
            >
              <Text style={styles.followButtonText}>Seguir en Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BasketColLayout>
  );
}
