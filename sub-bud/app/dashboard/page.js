'use client'


import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubSummary from "@/components/SubSummary";
import { useState } from "react";

export default function DashboardPage() {
  const isAuthenticated = false;
  const [isAddEntry, setIsAddEntry] = useState(false);

  function handleToggleInput(){
    setIsAddEntry(!isAddEntry)
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <SubSummary />
      <SubscriptionsDisplay handleShowInput ={isAddEntry ? ()=>{}:handleToggleInput}/>
      {isAddEntry && (<SubscriptionForm onSubmit = {()=>{}} closeInput={handleToggleInput}/>)}
    </>
  );
}
