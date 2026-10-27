import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

export default function BlogCard({ blog, index }) {
  const location = useLocation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover-lift h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#222] mb-3 group-hover:text-[#3FAE5C] transition-colors">
            {blog.title}
          </h3>
          <p className="text-muted mb-4 flex-grow line-clamp-3">{blog.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-[#ECECEC]">
            <div className="flex items-center text-sm text-muted">
              <FiCalendar className="w-4 h-4 mr-2 text-[#3FAE5C]" />
              {blog.date}
            </div>
            <Link
              to={`/blog/${blog.id}`}
              state={{ from: location.pathname }}
              className="text-sm font-medium text-[#3FAE5C] group-hover:underline"
            >
              Continue Reading
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}