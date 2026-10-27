import { motion } from 'framer-motion';

export default function MemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.15) }}
    >
      <div className="bg-white rounded-2xl p-6 text-center shadow-card hover-lift">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full rounded-full object-cover border-4 border-[#3FAE5C]/20 hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-[#222]">
          {member.name}
        </h3>

        {/* Position (shown only if available) */}
        {member.position && (
          <p className="text-[#3FAE5C] font-medium mt-2">
            {member.position}
          </p>
        )}
      </div>
    </motion.div>
  );
}