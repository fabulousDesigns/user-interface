import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function Summary() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [mockData, setMockData] = useState({
    daily: { labels: [], data: [] },
    weekly: { labels: [], data: [] },
    monthly: { labels: [], data: [] },
  });

  const router = useRouter();

  useEffect(() => {
    fetchData("daily");
    fetchData("weekly");
    fetchData("monthly");
  }, []);

  const fetchData = async (periodType: any) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `http://localhost:5001/api/summary/${periodType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching data");
      }

      const data = await response.json();
      setMockData((prevMockData) => ({
        ...prevMockData,
        [periodType]: {
          labels: data[periodType].labels,
          data: data[periodType].data,
        },
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const chartConfig = {
    backgroundGradientFrom: colors.bg,
    backgroundGradientTo: colors.bg,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    propsForLabels: {
      fontSize: 14,
    },
    propsForVerticalLabels: {
      fontSize: 16,
    },
    barColors: ["#3F3FFF"],
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
            height={250}
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
});
