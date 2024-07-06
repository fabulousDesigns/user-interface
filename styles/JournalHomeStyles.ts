import { StyleSheet } from "react-native";
import colors from "@/constants/Colors";
const JournalHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  startText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  subText: {
    fontSize: 16,
    color: colors.light,
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    fontWeight: "bold",
  },
  entriesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default JournalHomeStyles;
