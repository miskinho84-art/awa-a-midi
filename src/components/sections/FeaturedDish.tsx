import { featuredDish } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export function FeaturedDish() {
  const { addItem } = useCart();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img src={featuredDish.image} alt={featuredDish.name} className="rounded-2xl shadow-lift" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-terracotta-600">Notre incontournable</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-cocoa-900">{featuredDish.name}</h2>
            <p className="mt-4 text-cocoa-600">{featuredDish.longDescription || featuredDish.description}</p>
            <p className="mt-4 text-2xl font-bold text-terracotta-600">{formatPrice(featuredDish.price)}</p>
            <Button className="mt-6" onClick={() => addItem(featuredDish)}>Ajouter au panier</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
