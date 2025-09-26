import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // If you use expo-router, otherwise use navigation

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // remove stored JWT
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.replace("/(auth)/sign-in"); // redirect to login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      {/* Hardcoded profile info for now */}
      <View className="bg-white p-6 rounded-2xl shadow-md w-full items-center">
        <Text className="text-2xl font-bold text-gray-800">John Doe</Text>
        <Text className="text-gray-600 mt-1">johndoe@email.com</Text>
        <Text className="text-green-600 font-semibold mt-2">Premium User</Text>

        {/* Logout Button */}
        <TouchableOpacity
          className="mt-6 bg-red-500 py-3 px-6 rounded-full w-full"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
