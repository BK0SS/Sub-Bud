"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function UserAccount() {
  const { deleteAccount, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function confirmDeletion() {
    let result = confirm("Are you sure?");
    if (result) {
      setIsDeleting(true);
      setError("");

      try {
        await deleteAccount();
      } catch (err) {
        if (err.code === "auth/requires-recent-login") {
          setError(
            "For security reasons, please log out and log back in before deleting your account.",
          );
        } else {
          setError("Failed to delete account: " + err.message);
        }
        setIsDeleting(false);
      }
    }
  }

  return (
    <div>
      <h1>This is your account</h1>
      <h2>Your Profile: {currentUser?.email}</h2>
      <br />
      {error && (
        <div className="card" style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      <br />
      <button onClick={confirmDeletion}>
        {isDeleting ? "Deleting..." : "Delete profile?"}
      </button>
      <span style={{marginLeft:'1rem'}}><Link href={"/dashboard"}><button>Go Back</button></Link></span>
    </div>
  );
}
