import { restaurant } from "@/config/restaurant";

export function Stats() {
  return (
    <section className="bg-terracotta-500 py-16 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
        {restaurant.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold md:text-4xl">
              {stat.value}{stat.suffix}
            </p>
            <p className="mt-1 text-sm text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
