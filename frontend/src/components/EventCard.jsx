import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import Button from './Button';

export default function EventCard({ event, index }) {
  const statusColors = {
    upcoming: 'bg-[#3FAE5C] text-white',
    ongoing: 'bg-amber-500 text-white',
    past: 'bg-gray-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status]}`}>
            {event.status}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#222] mb-3">{event.title}</h3>
          <p className="text-sm text-muted mb-2">Organized by: {event.organizer}</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted">
              <FiCalendar className="w-4 h-4 mr-2 text-[#3FAE5C]" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-muted">
              <FiClock className="w-4 h-4 mr-2 text-[#3FAE5C]" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted">
              <FiMapPin className="w-4 h-4 mr-2 text-[#3FAE5C]" />
              {event.location}
            </div>
          </div>
          <p className="text-muted mb-4 flex-grow line-clamp-3">{event.description}</p>
          {
            event.status == 'upcoming'?
              <Button variant="primary" className="w-full">
                <a href={event.link}>Register Now</a>
              </Button>:null
          }
        </div>
      </div>
    </motion.div>
  );
}