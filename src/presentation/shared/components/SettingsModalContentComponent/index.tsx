import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { ITheme } from '../../config/theme/ITheme';
import { getStyles } from './styles';
import { MaterialCommunityIconComponent } from '../MaterialCommunityIconComponent';

type SubcategoryItem = {
  id: string;
  title: string;
  icon?: string;
  action?: () => void;
  isLoading?: boolean; // New prop to track loading state
};

type Category = {
  id: string;
  title: string;
  subcategories: SubcategoryItem[];
};

type SettingsModalContentComponentProps = {
  categories: Category[];
  theme: ITheme;
  activeSubcategoryId?: string; // Track which subcategory is currently active
};

export function SettingsModalContentComponent({
  categories,
  theme,
  activeSubcategoryId,
}: SettingsModalContentComponentProps): React.JSX.Element {
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View
          key={category.id}
          style={[
            styles.categoryContainer,
            index === categories.length - 1 && styles.lastCategoryContainer,
          ]}
        >
          <Text style={styles.categoryTitle}>{category.title}</Text>

          <View style={styles.subcategoriesContainer}>
            {category.subcategories.map((subcategory) => {
              const isActive = subcategory.id === activeSubcategoryId;
              const isDisabled = !!activeSubcategoryId && !isActive;

              return (
                <TouchableOpacity
                  key={subcategory.id}
                  style={[
                    styles.subcategoryButton,
                    isActive && styles.activeSubcategory,
                    isDisabled && styles.disabledSubcategory,
                  ]}
                  onPress={subcategory.action}
                  disabled={isDisabled || subcategory.isLoading}
                >
                  <View style={styles.subcategoryContent}>
                    {subcategory.icon && (
                      <MaterialCommunityIconComponent
                        name={subcategory.icon}
                        size={24}
                        color={
                          isDisabled
                            ? theme.colors.textDisabled
                            : theme.colors.text
                        }
                        style={styles.icon}
                      />
                    )}
                    <Text
                      style={[
                        styles.subcategoryTitle,
                        isDisabled && styles.disabledText,
                      ]}
                    >
                      {subcategory.title}
                    </Text>
                  </View>

                  {subcategory.isLoading && (
                    <ActivityIndicator
                      color={theme.colors.primary}
                      size="small"
                      style={styles.loader}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
