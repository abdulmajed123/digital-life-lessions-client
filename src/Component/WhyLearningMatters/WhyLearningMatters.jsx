export default function WhyLearningMatters() {
  const benefits = [
    {
      title: "Grow Through Real Experiences",
      desc: "Life teaches lessons no classroom ever can. Every success, every failure, every moment shapes who we become.",
      icon: "🌱",
    },
    {
      title: "Build Emotional Strength",
      desc: "Understanding your past helps you control your future. Emotional maturity comes from reflecting on your own journey.",
      icon: "💛",
    },
    {
      title: "Make Better Decisions",
      desc: "Learning from life gives clarity. It helps you avoid old mistakes and choose what truly aligns with your purpose.",
      icon: "🧠",
    },
    {
      title: "Inspire Others",
      desc: "Your life lessons can guide someone else who is struggling. Sharing wisdom always multiplies its value.",
      icon: "✨",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Learning From Life <span className="text-blue-600">Matters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md hover:shadow-lg transition-all rounded-2xl p-6 border border-gray-100"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
