import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'
import Navbar from './components/Navbar'
import Loader from "./components/Loader";
import NewsCard from "./components/NewsCard";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const location = useLocation();

  const categories = [
    { id: 'home', name: 'Home', endpoint: 'home' },
    { id: 'health', name: 'Health', endpoint: 'health' },
    { id: 'technology', name: 'Technology', endpoint: 'technology' },
    { id: 'business', name: 'Business', endpoint: 'business' },
    { id: 'science', name: 'Science', endpoint: 'science' },
    { id: 'sports', name: 'Sports', endpoint: 'sports' }
  ];

  const fetchNews = async (category = 'home') => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`
      );
      const data = response.data;
      setNews(data.results);
      setFilteredNews(data.results);
      setActiveCategory(category);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.abstract.toLowerCase().includes(query.toLowerCase()) ||
        article.section.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCategoryChange = (category) => {
    setSearchQuery('');
    fetchNews(category);
  };

  const handleRetry = () => {
    setError(false);
    fetchNews(activeCategory);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
            <p className="text-gray-600 mb-6">We couldn't load the news. Please try again.</p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Search and Category Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="py-4">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2 pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.endpoint)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.endpoint
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Counter */}
          {searchQuery && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Found <span className="font-semibold text-blue-600">{filteredNews.length}</span> article{filteredNews.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNews.map((article, index) => (
              <NewsCard key={index} article={article} index={index} />
            ))}
          </div>
          
          {filteredNews.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchQuery ? 'No articles found for your search' : 'No articles found'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search terms or selecting a different category.' : 'Try selecting a different category.'}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Chatbot */}
      <Chatbot news={news} activeCategory={activeCategory} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;