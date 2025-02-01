import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { getStyles } from './styles';
import { ITheme } from '../../config/theme/ITheme';
import { ThemeMode } from '../../store/redux/slices/theme/theme.slice';

export interface Section {
  id: string;
  title: string;
}

type SectionTabsComponentProps = {
  sections: Section[];
  activeSection: string;
  theme: ITheme;
  themeMode: ThemeMode;
  minTabWidth?: number;
  showIndicator?: boolean;
  onSectionChange: (sectionId: string) => void;
};

export function SectionTabsComponent({
  sections,
  activeSection,
  onSectionChange,
  theme,
  themeMode,
  minTabWidth = 120,
  showIndicator = true,
}: SectionTabsComponentProps) {
  const styles = getStyles(theme, themeMode, minTabWidth);

  return (
    <View style={styles.sectionTabsWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sectionTabsContainer}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionTab,
              activeSection === section.id && styles.activeTab,
            ]}
            onPress={() => onSectionChange(section.id)}
          >
            <Text
              style={[
                styles.sectionTabText,
                activeSection === section.id && styles.activeTabText,
              ]}
            >
              {section.title}
            </Text>
            {showIndicator && activeSection === section.id && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
