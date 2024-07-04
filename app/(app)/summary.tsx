import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const mockData = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [3, 2, 4, 3, 5, 1, 2],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [14, 18, 21, 15],
  },
  monthly: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [45, 52, 60, 58, 62, 55, 50, 48, 53, 57, 59, 61],
  },
};

export default function Summary() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const router = useRouter();

  const chartConfig = {
    backgroundGradientFrom: colors.bg,
    backgroundGradientTo: colors.bg,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(app)")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Journal Summary</Text>
        </View>
        <View style={styles.periodSelector}>
          {["daily", "weekly", "monthly"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodButton, period === p && styles.activePeriod]}
              onPress={() => setPeriod(p as "daily" | "weekly" | "monthly")}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  period === p && styles.activePeriodText,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: mockData[period].labels,
              datasets: [{ data: mockData[period].data }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            showValuesOnTopOfBars={true}
            fromZero={true}
            withInnerLines={false}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {mockData[period].data.reduce((a, b) => a + b, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.max(...mockData[period].data)}
            </Text>
            <Text style={styles.statLabel}>Most Entries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.min(...mockData[period].data)}
            </Text>
            <Text style={styles.statLabel}>Least Entries</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsButtonText}>View Detailed Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  periodSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.dark,
  },
  activePeriod: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    color: colors.light,
    fontWeight: "bold",
  },
  activePeriodText: {
    color: colors.white,
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  statLabel: {
    color: colors.light,
    marginTop: 5,
  },
  viewDetailsButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  viewDetailsButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
