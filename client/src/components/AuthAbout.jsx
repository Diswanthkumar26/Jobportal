import { motion } from "framer-motion";

export default function AuthAbout() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full w-full rounded-2xl p-10 flex flex-col justify-between
                 bg-white/10 backdrop-blur-xl border border-white/20 text-white"
    >
      <div>
        <h1 className="text-4xl font-bold mb-4">
          Build Your Career With Us
        </h1>
        <p className="text-white/80 max-w-md leading-relaxed">
          Our platform connects candidates, employers, and partners
          through a trusted job consultancy ecosystem.  
          Find the right opportunities, hire the right talent, and
          grow together — all in one place.
        </p>
      </div>

      <div className="mt-8 space-y-3 text-sm text-white/85">
        <p>✔ Verified job opportunities</p>
        <p>✔ Role-based dashboards for candidates & employers</p>
        <p>✔ Simple application and hiring workflow</p>
        <p>✔ Secure and reliable platform</p>
      </div>

          </motion.div>
  );
}
