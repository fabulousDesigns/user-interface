import JournalHome from "@/components/JournalHome/JournalHome";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function HomeScreen() {
  return (
    <ProtectedRoute>
      <JournalHome />
    </ProtectedRoute>
  );
}
