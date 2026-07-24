import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-yellow-400">

      {/* Image de fond */}
      <img
        src="/images/hero/hero-lego.jpg"
        alt="LEGO Hero"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenu */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6">

        <div className="max-w-3xl">

          <motion.span
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-block rounded-full bg-yellow-400 px-4 py-2 font-bold text-red-700"
          >
            🧱 Nouveau Catalogue 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-7xl"
          >
            Construisez
            <br />
            votre univers LEGO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mb-10 text-lg text-gray-100 md:text-2xl"
          >
            Découvrez des centaines de sets LEGO :
            Star Wars, Marvel, Harry Potter,
            Technic, City, Disney et bien plus encore.
          </motion.p>

          <HeroButtons />

          <HeroStats />

        </div>

      </div>

      {/* Décoration */}
      <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-white to-transparent"></div>

    </section>
  );
}