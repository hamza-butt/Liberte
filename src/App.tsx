import { StatusBar, StyleSheet, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getRememberMe } from "./utils/storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import TabNavigator from "./navigation/TabNavigator";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import { AppColors } from "./theme/colors";
import Toast from "react-native-toast-message";
import Welcome from "./screens/Welcome";
import OTP from "./screens/OTP";
import WalkAndEarn from "./screens/WalkAndEarn";
import { UserProvider } from "./context/UserContext";
import Profile from "./screens/Profile";
import ReferAndEarn from "./screens/ReferAndEarn";
import DigitalVault from "./screens/DigitalVault";
import { commonHeaderOptions } from "./navigation/NavigationOptions";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";

const Stack = createNativeStackNavigator();

function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const rememberMe = await getRememberMe();
      // setInitialRoute(rememberMe ? "Main" : "Welcome");
      setInitialRoute("Profile");
    };
    checkAuth();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={[styles.root, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={AppColors.primaryTextDark} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={styles.root}>
      <UserProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: AppColors.navBarBackground,
                },
                headerTintColor: AppColors.primaryTextDark,
              }}
              initialRouteName={initialRoute}
            >
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="DigitalVault"
                component={DigitalVault}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OTP"
                component={OTP}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="WalkAndEarn"
                component={WalkAndEarn}
                options={{ headerShown: false }}
              />


              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  ...commonHeaderOptions,
                  headerShown: true,
                  headerTitle: "Profile",
                  headerLeft: undefined,
                  headerRight: undefined,
                }}
              />

              <Stack.Screen
                name="ReferAndEarn"
                component={ReferAndEarn}
                options={{
                  ...commonHeaderOptions,
                  headerShown: true,
                  headerTitle: "Refer & Earn",
                  headerLeft: undefined,
                  headerRight: undefined,
                }}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
        <Toast />
      </UserProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
