"use client";

export default function SubscriptionForm() {
  return (
    <section>
      <h2>Add new</h2>
      <form onSubmit={() => {}}>
        <label>
          <span>Subscription name</span>
          <input
            type="text"
            name="name"
            placeholder="Netflix, Amazon, Spotify ..."
            required
          ></input>
        </label>
        <label>
          <span>Category</span>
          <select name="category" required>
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
          <input type="number" name="cost" step="0.01"placeholder="9.99" required></input>
        </label>

        <label>
            <span>Currency</span>
            <select name="currency">
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
            <select name="billingFrequency">
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
            <select name="paymentMethod">
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
            <input type="date" name="startDate" required></input>

        </label>

        <label>
            <span>Status</span>
            <select name="status">
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
            <textarea name="notes" placeholder="Leave a note to act as a reminder for yourself. For example 'Pause this subscription next month' or 'Shared with Girlfriend'"></textarea>
        </label>
        
        <div className="fat-column form-submit-btns">
            <button>Cancel</button>
            <button type="submit">
                Add
            </button>
        </div>

      </form>
    </section>
  );
}
