"use client";

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubSummary from "@/components/SubSummary";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useState } from "react";

const blankSub = {
  name: "",
  category: "Entertainment",
  cost: "",
  currency: "CAD",
  billingFrequency: "Monthly",
  nextBillingData: "",
  paymentMethod: "Credit Card",
  startDate: "",
  renewalType: "",
  notes: "",
  status: "Active",
};

export default function DashboardPage() {
  const { deleteSub, userData, currentUser, loading } = useAuth();
  const isAuthenticated = !!currentUser;

  const [isAddEntry, setIsAddEntry] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(blankSub);

  function handleChangeInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleEditSubscription(index) {
    if (!userData?.subscriptions) return;

    const data = userData.subscriptions[index];
    setFormData(data);

    deleteSub(index);

    setIsEditing(true);
    setIsAddEntry(true);
  }

  function handleReset() {
    setFormData(blankSub);
  }

  function handleToggleInput() {
    setIsAddEntry(!isAddEntry);
    if (isAddEntry) {
      setIsEditing(false);
      handleReset();
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    );
  }

  function handleFormSubmit() {
    handleToggleInput();
  }

  return (
    <>
      <SubSummary />
      <SubscriptionsDisplay
        handleEditSubscription={handleEditSubscription}
        handleShowInput={isAddEntry ? () => {} : handleToggleInput}
      />

      {isAddEntry && (
        <SubscriptionForm
          handleReset={handleReset}
          onSubmit={handleFormSubmit}
          closeInput={handleToggleInput}
          formData={formData}
          handleChangeInput={handleChangeInput}
          isEditing={isEditing}
        />
      )}
    </>
  );
}