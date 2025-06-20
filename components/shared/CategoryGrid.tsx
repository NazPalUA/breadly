import { Category } from '@/hooks/useCategories'
import { useCategoryUI } from '@/hooks/useCategoryUI'
import React from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import AddCategoryButton from './AddCategoryButton'
import CategoryCard from './CategoryCard'

interface CategoryWithAmount extends Category {
  amount: number
}

interface CategoryGridProps {
  getIcon: (categoryName: string, type: 'expense' | 'income') => React.ReactNode
  categories: CategoryWithAmount[]
  isLoading: boolean
  categoryUI: ReturnType<typeof useCategoryUI>
}

export default function CategoryGrid({
  getIcon,
  categories,
  isLoading,
  categoryUI
}: CategoryGridProps) {
  const { activeTab, handleCategoryPress, handleCategoryLongPress } = categoryUI

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-foreground">Loading categories...</Text>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12
      }}
    >
      {categories.map(category => {
        return (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            amount={category.amount}
            icon={getIcon(category.name, category.type)}
            type={category.type}
            onPress={handleCategoryPress}
            onLongPress={handleCategoryLongPress}
          />
        )
      })}

      <AddCategoryButton
        onPress={categoryUI.handleAddCategory}
        label={activeTab === 'expenses' ? 'Add' : 'Add Category'}
      />
    </ScrollView>
  )
}
