import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { AppColors } from "../../theme/colors";
import { useDailyClaimViewModel } from "./useDailyClaimViewModel";
import { DailyItem } from "../../types/DailyClaimTypes";

const { width } = Dimensions.get("window");

function YachtRewardCard() {
  const { data, loading, claimReward, formattedTime } = useDailyClaimViewModel();

  const days = data?.daily_list.map((item: DailyItem) => {
    let status = "upcoming";
    const currentDay = data.current_day || 1;

    // Logic for status
    if (item.day < currentDay) {
      status = "completed";
    } else if (item.day === currentDay) {
      status = data.today_claimed ? "completed" : "active";
    } else {
      status = "upcoming";
    }

    return {
      label: `Day ${item.day}`,
      status: status,
      value: item.points
    };
  }) || [];


  return (
    <View style={styles.container}>
      {/* Top Section with Image */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../../assets/home/ship.png")}
          style={styles.cardImage}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Win a Yacht Trip Gift Card!</Text>
            <Text style={styles.heroSubtitle}>
              Claim Daily Rewards in the next 7 days and earn an entry into
              Prize Draw each day!
            </Text>
          </View>
        </ImageBackground>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <View style={styles.checkinLeft}>
          <Image
            source={require("../../assets/home/calender.png")}
            style={styles.calendarIcon}
          />
          <View>
            <Text style={styles.checkinTitle}>Daily</Text>
            <Text style={styles.checkinSubtitle}>Checkin</Text>
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Image
            source={require("../../assets/home/clock.png")}
            style={styles.clockIcon}
          />
          <View style={styles.timerTextContainer}>
            <Text style={styles.timerLabel}>Time left</Text>
            <Text style={styles.timerValue}>{formattedTime}</Text>
          </View>
        </View>

        <View style={[styles.claimButton, data?.today_claimed && { backgroundColor: AppColors.greenDark }]}>
          <Text style={styles.claimText} onPress={!data?.today_claimed ? claimReward : undefined}>
            {data?.today_claimed ? "Claimed" : "Claim"}
          </Text>
        </View>
      </View>

      {/* Bottom Section (Days) */}
      <View style={styles.daysSection}>
        <View style={styles.progressRow}>
          {days.length > 0 ? days.map((day: any, index: number) => (
            <View key={index} style={styles.dayItem}>
              <View
                style={[
                  styles.circle,
                  day.status === "completed" && styles.circleCompleted,
                  day.status === "active" && styles.circleActive,
                  day.status === "upcoming" && styles.circleUpcoming,
                ]}
              >
                {day.status === "completed" && (
                  <Image
                    source={require("../../assets/home/tick.png")}
                    style={styles.checkIcon}
                    resizeMode="contain"
                  />
                )}
                {day.status !== "completed" && (
                  <Text style={styles.dayValue}>{day.value}</Text>
                )}
              </View>
              <Text style={styles.dayLabel}>{day.label}</Text>
            </View>
          )) : (
            // Render placeholders if no data yet
            Array.from({ length: 7 }).map((_, i) => (
              <View key={i} style={styles.dayItem}>
                <View style={[styles.circle, styles.circleUpcoming]} />
                <Text style={styles.dayLabel}>Day {i + 1}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    marginHorizontal: 4,
    borderColor: AppColors.whiteTranslucent,
    borderWidth: 1,
  },
  imageContainer: {
    height: 280, // Adjust height as needed
    width: "100%",
  },
  cardImage: {
    flex: 1,
    justifyContent: "space-between", // Push content to top and wave to bottom
  },
  heroContent: {
    padding: 20,
    paddingTop: 30,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "left",
  },
  heroSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 20,
    opacity: 0.9,
  },
  middleSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 20,
    backgroundColor: AppColors.backgroundColorDark,
  },
  daysSection: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: AppColors.whiteTranslucent,
  },
  checkinLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  calendarIcon: {
    width: 32,
    height: 32,
    tintColor: AppColors.orangeDark, // Make it orange as in design
  },
  checkinTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  checkinSubtitle: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  clockIcon: {
    width: 24,
    height: 24,
  },
  timerTextContainer: {
    justifyContent: 'center',
  },
  timerLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    opacity: 0.8,
  },
  timerValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  claimButton: {
    backgroundColor: AppColors.orangeDark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  claimText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  dayItem: {
    alignItems: "center",
    gap: 8,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  circleCompleted: {
    backgroundColor: AppColors.greenDark,
  },
  circleActive: {
    backgroundColor: AppColors.orangeDark,
  },
  circleUpcoming: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  dayValue: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  dayLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.9,
  },
});

export default YachtRewardCard;
