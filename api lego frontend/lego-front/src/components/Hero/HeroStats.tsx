import { motion } from "framer-motion";

const stats = [
  {
    value: "1200+",
    label: "Sets LEGO",
  },
  {
    value: "20",
    label: "Univers",
  },
  {
    value: "50000+",
    label: "Clients",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-8">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * .2 }}
        >
          <h2 className="text-4xl font-bold text-yellow-300">
            {item.value}
          </h2>

          <p className="text-white">
            {item.label}
          </p>

        </motion.div>

      ))}

    </div>
  );
}