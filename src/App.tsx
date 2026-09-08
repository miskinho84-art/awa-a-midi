import { CartProvider } from "@/context/CartContext";
import { DishDetailProvider } from "@/context/DishDetailContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { CartBar } from "@/components/cart/CartBar";
import { DishDetailModal } from "@/components/menu/DishDetailModal";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { FeaturedDish } from "@/components/sections/FeaturedDish";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { Hours } from "@/components/sections/Hours";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function App() {
  return (
    <CartProvider>
      <DishDetailProvider>
        <SeoJsonLd />
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-terracotta-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lift"
        >
          Aller directement au menu
        </a>

        <Navbar />

        <main>
          <Hero />
          <MenuSection />
          <FeaturedDish />
          <About />
          <Stats />
          <Reviews />
          <Gallery />
          <Hours />
          <Contact />
          <FinalCTA />
        </main>

        <Footer />

        {/* Système de commande */}
        <DishDetailModal />
        <CartDrawer />
        <CartToast />
        <CartBar />
        <FloatingWhatsApp />
      </DishDetailProvider>
    </CartProvider>
  );
}
