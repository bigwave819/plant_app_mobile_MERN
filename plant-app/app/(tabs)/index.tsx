import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchPlants } from '@/lib/plantApis'

interface PlantProps {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const Index = () => {
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPlants()
        setPlants(data)
      } catch (error) {
        console.error(`Error fetching plants`, error);
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="green" />
        <Text className="mt-4 text-gray-500">Loading plants...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <FlatList
        data={plants}
        renderItem={({ item }) => (
          <View className="flex-1 bg-white rounded-2xl shadow-md p-4 mb-6 mx-1">
            {/* Plant Image */}
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-40 rounded-xl mb-3"
              resizeMode="cover"
            />

            {/* Plant Info */}
            <View className="items-center">
              <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-green-600 font-bold text-base mt-1">${item.price}</Text>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity className="mt-4 bg-green-600 py-2 rounded-full">
              <Text className="text-white font-semibold text-center">Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperClassName="justify-between"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default Index
