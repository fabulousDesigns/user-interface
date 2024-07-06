import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SummaryStyles from "@/styles/SummaryStyles";
import { chartConfig } from "@/constants/utils";

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

  return (
    <SafeAreaView style={SummaryStyles.safeArea}>
      <ScrollView style={SummaryStyles.container}>
        <View style={SummaryStyles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(app)")}
            style={SummaryStyles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={SummaryStyles.title}>Journal Summary</Text>
        </View>
        <View style={SummaryStyles.periodSelector}>
          {["daily", "weekly", "monthly"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                SummaryStyles.periodButton,
                period === p && SummaryStyles.activePeriod,
              ]}
              onPress={() => setPeriod(p as "daily" | "weekly" | "monthly")}
            >
              <Text
                style={[
                  SummaryStyles.periodButtonText,
                  period === p && SummaryStyles.activePeriodText,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={SummaryStyles.chartContainer}>
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

        <View style={SummaryStyles.statsContainer}>
          <View style={SummaryStyles.statItem}>
            <Text style={SummaryStyles.statValue}>
              {mockData[period].data.reduce((a, b) => a + b, 0)}
            </Text>
            <Text style={SummaryStyles.statLabel}>Total Entries</Text>
          </View>
          <View style={SummaryStyles.statItem}>
            <Text style={SummaryStyles.statValue}>
              {Math.max(...mockData[period].data)}
            </Text>
            <Text style={SummaryStyles.statLabel}>Most Entries</Text>
          </View>
          <View style={SummaryStyles.statItem}>
            <Text style={SummaryStyles.statValue}>
              {Math.min(...mockData[period].data)}
            </Text>
            <Text style={SummaryStyles.statLabel}>Least Entries</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
