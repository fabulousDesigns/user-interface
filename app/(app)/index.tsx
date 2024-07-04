import JournalHome from "@/components/JournalHome/JournalHome";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
export default function HomeScreen() {
  return (
    <ProtectedRoute>
      <JournalHome />
    </ProtectedRoute>
  );
}
