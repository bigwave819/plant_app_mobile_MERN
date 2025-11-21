import { Tabs } from "expo-router";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

const TabIcon = ({ focused, name, lib }: any) => {
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
      <IconLib name={name} size={24} color={focused ? "#fff" : "#5D5F6D"} />
    </View>
  );
};

export default function TabLayout() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ 
            title: "Home",
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} lib={Ionicons} name="home-outline" /> 
          }}
        />
        <Tabs.Screen
          name="search"
          options={{ 
            title: "Search",
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} lib={Ionicons} name="search-outline" /> 
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{ 
            title: "Cart",
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} lib={Feather} name="shopping-cart" /> 
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{ 
            title: "Profile",
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} lib={AntDesign} name="user" /> 
          }}
        />
      </Tabs>
    </KeyboardAvoidingView>
  );
}
