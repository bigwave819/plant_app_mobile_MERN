import { Tabs } from "expo-router";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

// Reusable Tab Icon Component
export const TabIcon = ({ focused, name, lib }: any) => {
  const IconLib = lib;
  return (
    <View
      style={{
        backgroundColor: focused ? "#22c55e" : "#e5e7eb",
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconLib name={name} size={24} color={focused ? "#ffffff" : "#5D5F6D"} />
    </View>
  );
};

const _layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // Loading

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 100,
            paddingBottom: 10,
            paddingTop: 20,
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} lib={Ionicons} name="home-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} lib={Ionicons} name="search-outline" />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} lib={Feather} name="shopping-cart" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} lib={AntDesign} name="user" />
            ),
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
};

export default _layout;
