// app/(auth)/sign-up.tsx
import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    ActivityIndicator 
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        // Basic validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://10.32.186.76:5000/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to AsyncStorage
                await AsyncStorage.setItem('token', data.token);
                
                Alert.alert("Success", data.message, [
                    { 
                        text: "OK", 
                        onPress: () => router.replace("/(tabs)") 
                    }
                ]);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert("Error", "Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        router.replace("/(auth)/sign-in");
    };

    return (
        <View className="flex-1 bg-white px-6 justify-center">
            {/* App Title */}
            <Text className="text-center text-lg mb-2">
                Plants <Text className="text-green-600">Fresher</Text>
            </Text>
            <Text className="text-center font-bold mb-6 text-3xl">
                Create Account
            </Text>

            {/* Name Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-4">
                <Ionicons name="person" size={20} color="gray" />
                <TextInput
                    className="flex-1 ml-2 py-3"
                    placeholder="Enter Full Name"
                    value={name}
                    onChangeText={setName}
                    editable={!loading}
                />
            </View>

            {/* Email Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-4">
                <Ionicons name="mail-outline" size={20} color="gray" />
                <TextInput
                    className="flex-1 ml-2 py-3"
                    placeholder="Enter email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />
                {email.includes("@") && email.includes(".") && (
                    <Ionicons name="checkmark-circle" size={20} color="green" />
                )}
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 mb-6">
                <Ionicons name="lock-closed-outline" size={20} color="gray" />
                <TextInput
                    className="flex-1 ml-2 py-3"
                    placeholder="Create password (min. 6 characters)"
                    secureTextEntry={secure}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    editable={!loading}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)} disabled={loading}>
                    <Ionicons
                        name={secure ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
                className={`py-3 rounded-lg mb-6 ${loading ? 'bg-green-400' : 'bg-green-700/80'}`}
                onPress={handleSignUp}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text className="text-center text-white text-lg font-semibold">
                        Create Account
                    </Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">Or sign up with</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Buttons */}
            <View className="gap-3 mb-8">
                {/* Google */}
                <TouchableOpacity 
                    className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full"
                    disabled={loading}
                >
                    <AntDesign name="google" size={20} color="red" />
                    <Text className="ml-2 text-base">Continue with Google</Text>
                </TouchableOpacity>

                {/* Apple */}
                <TouchableOpacity 
                    className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full"
                    disabled={loading}
                >
                    <Ionicons name="logo-apple" size={20} color="black" />
                    <Text className="ml-2 text-base">Continue with Apple</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center">
                <Text className="text-gray-500">Already have an account? </Text>
                <TouchableOpacity onPress={handleNavigate} disabled={loading}>
                    <Text className="text-green-600 font-semibold">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUp;