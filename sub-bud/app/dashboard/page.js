import Login from "@/components/Login";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubSummary from "@/components/SubSummary";

export default function DashboardPage() {
  const isAuthenticated = false;
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <SubSummary />
      <SubscriptionsDisplay />
    </>
  );
}
