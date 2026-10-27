import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import BlogCard from '../components/BlogCard';
import blogsData from '../data/blogs.json';

const categories = ['All', 'Sustainability', 'Conservation', 'Climate', 'Technology', 'Waste Management', 'Water'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = blogsData.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Blog"
            subtitle="Stories, insights, and updates from Eco Club"
          />
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  src={blogsData[0].image}
                  alt={blogsData[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12">
                <span className="text-sm font-medium text-[#3FAE5C] mb-2 block">Featured</span>
                <h2 className="text-3xl font-bold text-[#222] mb-4">{blogsData[0].title}</h2>
                <p className="text-muted mb-6">{blogsData[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">{blogsData[0].date}</span>
                  <Link
                    to={`/blog/${blogsData[0].id}`}
                    state={{ from: '/blog' }}
                    className="text-[#3FAE5C] font-medium hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-[#3FAE5C] text-white'
                      : 'bg-white text-[#222] border border-[#ECECEC] hover:border-[#3FAE5C]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="search"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-[#3FAE5C] bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </motion.div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted">No blogs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}