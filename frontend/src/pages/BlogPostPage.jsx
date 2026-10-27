import { useEffect } from 'react';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogsData from '../data/blogs.json';

export default function BlogPostPage() {
  const { blogId } = useParams();
  const location = useLocation();
  const blog = blogsData.find((item) => String(item.id) === blogId);
  const backPath = location.state?.from || '/blog';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] pt-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          <Link
            to={backPath}
            className="inline-flex items-center gap-2 text-[#3FAE5C] font-medium hover:underline"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-20">
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <Link
          to={backPath}
          className="inline-flex items-center gap-2 text-[#3FAE5C] font-medium mb-8 hover:underline"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl overflow-hidden shadow-soft"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />

          <div className="p-8 md:p-12">
            <span className="text-sm font-medium text-[#3FAE5C]">{blog.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#222] mt-3 mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm text-muted border-b border-[#ECECEC] pb-6 mb-8">
              <span className="inline-flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-[#3FAE5C]" />
                {blog.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <FiUser className="w-4 h-4 text-[#3FAE5C]" />
                {blog.author}
              </span>
            </div>

            <div className="space-y-5 text-lg leading-8 text-muted">
              {(blog.content || [blog.excerpt]).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  );
}
