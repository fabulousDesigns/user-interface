import colors from "@/constants/Colors";
import { useMemo } from "react";

const useTheme = () => {
  return useMemo(() => ({ colors }), []);
};

export default useTheme;
