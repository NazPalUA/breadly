import { mockCategories, mockIncomeCategories } from '@/data/mockData'
import { useState } from 'react'
import { useDateRange } from './useDateRange'

export interface CategoryToEdit {
  id: string
  name: string
  description?: string
}

export function useCategoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'expenses' | 'incomes'>('expenses')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryToEdit | null>(
    null
  )
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false)

  // Date range management
  const dateRange = useDateRange()

  // Derived state
  const currentCategories =
    activeTab === 'expenses' ? mockCategories : mockIncomeCategories
  const currentType: 'expense' | 'income' =
    activeTab === 'expenses' ? 'expense' : 'income'

  // Actions
  const handleCategoryPress = (categoryName: string) => {
    // Simply open the category transactions/details
    setSelectedCategory(categoryName)
    setModalVisible(true)
  }

  const handleSubmit = (data: any) => {
    console.log(`New ${activeTab.slice(0, -1)}:`, data)
    setModalVisible(false)
    setSelectedCategory(null)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setSelectedCategory(null)
  }

  const handleSaveCategory = (data: {
    id: string
    name: string
    description: string
    iconName: string
  }) => {
    console.log('Save category:', data)
    // TODO: Update the category in your state/API
    setEditModalVisible(false)
    setCategoryToEdit(null)
  }

  const handleCloseEditModal = () => {
    setEditModalVisible(false)
    setCategoryToEdit(null)
  }

  const handleCategoryLongPress = (
    categoryId: string,
    categoryName: string
  ) => {
    const category = currentCategories.find(cat => cat.id === categoryId)
    if (category) {
      setCategoryToEdit({
        id: category.id,
        name: category.name,
        description: ''
      })
      setEditModalVisible(true)
    }
  }

  // Date range actions
  const handleDateRangePress = () => {
    setDateRangeModalVisible(true)
  }

  const handleDateRangeModalClose = () => {
    setDateRangeModalVisible(false)
  }

  return {
    // State
    selectedCategory,
    modalVisible,
    activeTab,
    editModalVisible,
    categoryToEdit,
    currentCategories,
    currentType,
    dateRangeModalVisible,

    // Date range state
    ...dateRange,

    // Actions
    setActiveTab,
    handleCategoryPress,
    handleCategoryLongPress,
    handleSubmit,
    handleCloseModal,
    handleSaveCategory,
    handleCloseEditModal,
    handleDateRangePress,
    handleDateRangeModalClose
  }
}
