import { StyleSheet } from "react-native";
import colors from "@/constants/Colors";
const SignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 25,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 40,
  },
  headerText: {
    color: colors.light,
    marginRight: 5,
    letterSpacing: 1,
  },
  loginText: {
    color: colors.primary,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.bg,
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "justify",
    marginBottom: 35,
    letterSpacing: 1,
  },
  signUpButton: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 27,
    alignItems: "center",
    marginTop: 30,
    shadowColor: colors.bg,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  signUpButtonText: {
    color: colors.bg,
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    letterSpacing: 1,
  },
  successText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default SignupStyles;
