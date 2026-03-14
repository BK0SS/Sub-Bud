import { calculateSubscriptionMetrics, subscriptions } from "@/utils";

export default function SubSummary() {
  const summary = calculateSubscriptionMetrics(subscriptions);
  const emojis = [
    "🔥",
    "✅",
    "⭐️",
    "⚡️",
    "🎉",
    "✨",
    "🏆",
    "🌼",
    "🌱",
    "🐛",
    "🐙",
    "🪼",
  ];
  console.log(summary);
  return (
    <section>
      <h2>Subscription analytics</h2>
      <div className="analytics-card">
        {Object.keys(summary).map((metric, metricIndex) => (
          <div key={metricIndex} className="analytics-item">
            <p>
              {emojis[metricIndex]} {metric.replaceAll("_", " ")}
            </p>
            <h4>{summary[metric]}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
