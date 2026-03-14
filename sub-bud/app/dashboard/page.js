import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubSummary from "@/components/SubSummary";

export default function DashboardPage() {
  const isAuthenticated = true;
  const isAddEntry = true;
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <SubSummary />
      <SubscriptionsDisplay />
      {isAddEntry && (<SubscriptionForm/>)}
    </>
  );
}
