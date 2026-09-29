import ReadinessDashboard from "../components/ReadinessDashboard";
import { initialReadinessHistory } from "../data/readiness";

export default function Home() {
  return <ReadinessDashboard initialHistory={initialReadinessHistory} />;
}
