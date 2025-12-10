import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppColors } from "../../theme/colors";
import { useUser } from "../../context/UserContext";

type WeatherAndGreetingProps = {
  name?: string;
  subtitle?: string;
  temperature?: number;
};

function WeatherAndGreeting({
  name,
  subtitle = "Ready to earn some rewards?",
  temperature = 24,
}: WeatherAndGreetingProps) {
  const { user } = useUser();
  const displayName = name || user?.full_name || "User";

  return (
    <View style={styles.row}>
      {/* title and subtitle */}
      <View style={styles.textBlock}>
        <Text numberOfLines={1} style={styles.greeting}>
          {`Good Afternoon, ${displayName}!`}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* weather  */}
      <View style={styles.weatherBlock}>
        <Image
          source={require("../../assets/home/weather.png")}
          style={styles.weatherIcon}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.temperature}>
            {temperature.toFixed(1)}
            <Text style={styles.temperatureUnit}>°C</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  textBlock: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.primaryTextDark,
  },
  subtitle: {
    marginTop: 4,
    color: AppColors.primaryTextDark,
    fontSize: 14,
  },
  weatherBlock: {
    alignItems: "flex-end",
    gap: 8,
  },
  weatherIcon: {
    width: 56,
    height: 42,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  temperature: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primaryTextDark,
    textAlign: "right",
  },
  temperatureUnit: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default WeatherAndGreeting;
