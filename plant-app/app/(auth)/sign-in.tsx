import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons"; // Expo icons
import { router } from "expo-router";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);

    const handleNavigate = () => {
            router.replace("/(auth)/sign-up")
    }
    return (
        <View className="flex-1 bg-white px-6 justify-center">
            {/* App Title */}
            <Text className="text-center text-lg mb-2">
                Plants <Text className="text-green-600">Fresher</Text>
            </Text>
            <Text className="text-center font-bold mb-6 text-3xl">
                Let’s Get Started!
            </Text>

            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-4">
                <Ionicons name="mail-outline" size={20} color="gray" />
                <TextInput
                    className="flex-1 ml-2 py-3"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {email.includes("@") && (
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                )}
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-2">
                <Ionicons name="lock-closed-outline" size={20} color="gray" />
                <TextInput
                    className="flex-1 ml-2 py-3"
                    placeholder="Password"
                    secureTextEntry={secure}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                        name={secure ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="mb-6">
                <Text className="text-green-600 text-right">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity className="bg-green-700/80 py-3 rounded-lg mb-6">
                <Text className="text-center text-white text-lg font-semibold">
                    Sign In
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text className="text-center mb-4">Or sign Up with</Text>

            {/* Social Buttons */}
            <View className="gap-3">
                {/* Google */}
                <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full">
                    <AntDesign name="google" size={20} color="red" />
                    <Text className="ml-2 text-base">Continue with Google</Text>
                </TouchableOpacity>

                {/* Apple */}
                <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full">
                    <Text className="ml-2 text-base">Continue with Apple</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-8">
                <Text className="text-gray-500">Don’t have an account? </Text>
                <TouchableOpacity onPress={handleNavigate}>
                    <Text className="text-green-600 font-semibold">Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn