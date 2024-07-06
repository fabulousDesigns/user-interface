import { StyleSheet } from "react-native";
import colors from "@/constants/Colors";

const SummaryStyles = StyleSheet.create({
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

export default SummaryStyles;
