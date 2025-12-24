import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getMonthIndex, getDaysInMonth, getStartDayOfWeek } from "../../utils/CalendarUtils";
import { AppColors } from "../../theme/colors";

export interface MonthlySteps {
    monthly_steps: {
        month: string;
        year: string;
        total_steps: number;
        daily_goal: number;
        goal_achieved_days: number;
        missed_days: number;
        daily_steps: { [date: string]: number };
    };
}

interface CalendarGridProps {
    data: MonthlySteps["monthly_steps"];
}

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const CalendarGrid = ({ data }: CalendarGridProps) => {
    const year = parseInt(data.year);
    const monthIndex = getMonthIndex(data.month);
    if (monthIndex === -1) return null;

    const daysInMonth = getDaysInMonth(year, monthIndex);
    const startOffset = getStartDayOfWeek(year, monthIndex);
    const today = new Date();

    const getDateKey = (day: number) => {
        const mm = String(monthIndex + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        return `${year}-${mm}-${dd}`;
    };

    const renderDays = () => {
        const cells = [];

        // Padding for start of month
        for (let i = 0; i < startOffset; i++) {
            cells.push(
                <View key={`pad-${i}`} style={styles.dayCell}>
                    <View style={{ height: 42 }} />
                </View>
            );
        }

        // Actual Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = getDateKey(day);
            const steps = data.daily_steps[dateKey] || 0;

            // Check if day is in the future
            // Construct a Date object for this specific day to compare strictly
            const currentDayDate = new Date(year, monthIndex, day);
            // Reset time part for accurate comparison
            const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            let status: "completed" | "missed" | "upcoming" = "upcoming";

            if (currentDayDate > todayReset) {
                status = "upcoming";
            } else {
                if (steps > 0) {
                    status = "completed";
                } else {
                    status = "missed";
                }
            }

            cells.push(
                <View key={`day-${day}`} style={styles.dayCell}>
                    <View style={styles.iconContainer}>
                        {status === "completed" && (
                            <Image source={require("../../assets/profile/calender/check.png")} style={styles.statusIcon} resizeMode="contain" />
                        )}
                        {status === "missed" && (
                            <Image source={require("../../assets/profile/calender/cross.png")} style={styles.statusIcon} resizeMode="contain" />
                        )}
                        {status === "upcoming" && (
                            <Image source={require("../../assets/profile/calender/lock.png")} style={styles.statusIcon} resizeMode="contain" />
                        )}
                    </View>
                    <Text style={styles.dayText}>{String(day).padStart(2, '0')}</Text>
                </View>
            );
        }

        return cells;
    };

    return (
        <View style={styles.gridContainer}>
            {/* Week Headers */}
            <View style={styles.weekRow}>
                {WEEK_DAYS.map((day, index) => (
                    <View key={`header-${index}`} style={styles.dayCell}>
                        <Text style={styles.weekHeaderText}>{day}</Text>
                    </View>
                ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysGrid}>
                {renderDays()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        borderWidth: 1,
        borderColor: AppColors.whiteTranslucent,
        borderRadius: 16,
        paddingVertical: 10,
    },
    weekRow: {
        flexDirection: "row",
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.whiteTranslucent,
        paddingBottom: 8,
    },
    daysGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayCell: {
        width: `${100 / 7}%`, // 7 days a week
        alignItems: "center",
        marginVertical: 6,
    },
    weekHeaderText: {
        color: AppColors.primaryTextDark,
        fontSize: 14,
        fontWeight: "700",
    },
    dayText: {
        color: AppColors.primaryTextDark,
        fontSize: 12,
        marginTop: 4,
        opacity: 0.9,
    },

    // Status Badges
    iconContainer: {
        marginBottom: 2,
    },
    statusIcon: {
        width: 30,
        height: 30,
    },
});
