// app/(auth)/sign-in.tsx - Updated with full functionality
import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    ActivityIndicator,
    SafeAreaView 
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: 'YOUR_GOOGLE_EXPO_CLIENT_ID',
        iosClientId: 'YOUR_GOOGLE_IOS_CLIENT_ID',
        androidClientId: 'YOUR_GOOGLE_ANDROID_CLIENT_ID',
    });

    // Handle Google auth response
    React.useEffect(() => {
        if (response?.type === 'success') {
            handleGoogleSignIn(response.authentication?.accessToken);
        }
    }, [response]);

    

    const handleSignIn = async () => {
        // Basic validation
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://172.28.134.76:5000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to AsyncStorage
                await AsyncStorage.setItem('token', data.token);
                
                Alert.alert("Success", "Sign in successful!", [
                    { 
                        text: "OK", 
                        onPress: () => router.replace("/(tabs)") 
                    }
                ]);
            } else {
                Alert.alert("Error", data.message || "Sign in failed");
            }
        } catch (error) {
            console.error('Signin error:', error);
            Alert.alert("Error", "Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async (accessToken?: string) => {
        if (!accessToken) {
            Alert.alert("Error", "Google authentication failed");
            return;
        }

        setGoogleLoading(true);

        try {
            const response = await fetch(`http://172.28.134.76:5000/api/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: accessToken
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                
                Alert.alert("Success", "Google sign in successful!", [
                    { 
                        text: "OK", 
                        onPress: () => router.replace("/(tabs)") 
                    }
                ]);
            } else {
                Alert.alert("Error", data.message || "Google sign in failed");
            }
        } catch (error) {
            console.error('Google signin error:', error);
            Alert.alert("Error", "Network error during Google sign in.");
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleNavigate = () => {
        router.replace("/(auth)/sign-up");
    };

    const handleForgotPassword = () => {
        // Implement forgot password functionality
        Alert.alert("Forgot Password", "Redirect to password reset screen");
    };

    return (
        <View className="flex-1 bg-white px-6 justify-center">
            {/* App Title */}
            <Text className="text-center text-lg mb-2">
                Plants <Text className="text-green-600">Fresher</Text>
            </Text>
            <Text className="text-center font-bold mb-6 text-3xl">
                Let's Get Started!
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
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />
                {email.includes("@") && email.includes(".") && (
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

            {/* Forgot Password */}
            <TouchableOpacity className="mb-6" onPress={handleForgotPassword} disabled={loading}>
                <Text className="text-green-600 text-right">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity 
                className={`py-3 rounded-lg mb-6 ${loading ? 'bg-green-400' : 'bg-green-700/80'}`}
                onPress={handleSignIn}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text className="text-center text-white text-lg font-semibold">
                        Sign In
                    </Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-gray-500">Or sign in with</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Buttons */}
            <View className="gap-3 mb-8">
                {/* Google */}
                <TouchableOpacity 
                    className="flex-row items-center justify-center border border-gray-300 py-3 rounded-full"
                    onPress={() => promptAsync()}
                    disabled={googleLoading || loading}
                >
                    {googleLoading ? (
                        <ActivityIndicator size="small" color="red" />
                    ) : (
                        <>
                            <AntDesign name="google" size={20} color="red" />
                            <Text className="ml-2 text-base">Continue with Google</Text>
                        </>
                    )}
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
                <Text className="text-gray-500">Don't have an account? </Text>
                <TouchableOpacity onPress={handleNavigate} disabled={loading}>
                    <Text className="text-green-600 font-semibold">Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignIn;