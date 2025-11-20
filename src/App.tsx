import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import { AppColors } from "./theme/colors";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: AppColors.backgroundGradientStartDark,
              },
              headerTintColor: AppColors.primaryTextDark,
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ title: "Create account" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default App;
