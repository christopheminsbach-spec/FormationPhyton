import { ShoppingCart, Star } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: .8 }}
      className="flex flex-wrap gap-5"
    >
      <Link
        to="/shop"
        className="flex items-center gap-3 rounded-xl bg-yellow-400 px-8 py-4 text-lg font-bold text-red-700 transition hover:scale-105 hover:bg-yellow-300"
      >
        <ShoppingCart />
        Découvrir la boutique
      </Link>

      <Link
        to="/promotions"
        className="flex items-center gap-3 rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-red-600"
      >
        <Star />
        Voir les promotions
      </Link>
    </motion.div>
  );
}