"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SubscriptionForm(props) {

    const {onSubmit, closeInput, formData, handleChangeInput, handleReset} = props;
    const {addSub} = useAuth();
    


    //form submit
    function handleFormSubmit(e){
        e.preventDefault(); //prevents reloading on submit 
        addSub(formData)
        handleReset()
        closeInput()
        
    }

  return (
    <section>
      <h2>Add new</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Subscription name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChangeInput}
            placeholder="Netflix, Amazon, Spotify ..."
            required
          ></input>
        </label>
        <label>
          <span>Category</span>
          <select name="category" value={formData.category}
            onChange={handleChangeInput} required>
            {[
              "Entertainment",
              "Music",
              "Software",
              "Web Services",
              "Health & Fitness",
              "Food",
              "Travel",
              "Utility",
              "Other",
            ].map((cat, catIndex) => {
              return <option key={catIndex}>{cat}</option>;
            })}
          </select>
        </label>

        <label>
          <span>Cost</span>
          <input type="number" name="cost" step="0.01"placeholder="9.99"
          value={formData.cost}
            onChange={handleChangeInput} required></input>
        </label>

        <label>
            <span>Currency</span>
            <select name="currency"
            value={formData.currency}
            onChange={handleChangeInput} required>
                {['CAD','USD','EUR','RUB','UAH'].map((cur,curIndex)=>{
                    return (
                        <option key={curIndex}>
                            {cur}
                        </option>
                    )
                })}
            </select>
        </label>
        <label>
            <span>Billing frequency</span>
            <select name="billingFrequency"
            value={formData.billingFrequency}
            onChange={handleChangeInput}>
                {['Monthly','Yearly','Quarterly','One-time'].map((bil,bilIndex)=>{
                    return (
                        <option key={bilIndex}>
                            {bil}
                        </option>
                    )
                })}
            </select>
        </label>

        <label>
            <span>Payment method</span>
            <select name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChangeInput} required>
                {['Credit Card','Debit Card','Paypal','Bank Transfer','Other'].map((pay,payIndex)=>{
                    return (
                        <option key={payIndex}>
                            {pay}
                        </option>
                    )
                })}
            </select>
        </label>

        <label>
            <span>Subscription Start Date</span>
            <input type="date" name="startDate"value={formData.startDate}
            onChange={handleChangeInput} required></input>

        </label>

        <label>
            <span>Status</span>
            <select name="status"value={formData.status}
            onChange={handleChangeInput} required>
                {['Active','Paused','Cancelled'].map((sta,staIndex)=>{
                    return (
                        <option key={staIndex}>
                            {sta}
                        </option>
                    )
                })}
            </select>
        </label>

        <label className="fat-column">
            <span>Notes</span>
            <textarea name="notes" value={formData.notes}
            onChange={handleChangeInput} placeholder="Leave a note to act as a reminder for yourself. For example 'Pause this subscription next month' or 'Shared with Girlfriend'"></textarea>
        </label>
        
        <div className="fat-column form-submit-btns">
            <button onClick={closeInput}>Cancel</button>
            <button type="submit">
                Add
            </button>
        </div>

      </form>
    </section>
  );
}
