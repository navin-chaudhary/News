import React from 'react';

function NewsCard({ article, index }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleImageError = (e) => {
    e.target.src = "/superJumbo.jpg";
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={article?.multimedia?.[0]?.url || "/superJumbo.jpg"}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {article.section.toUpperCase()}
          </span>
        </div>
        {article.multimedia?.[0]?.url && (
          <div className="absolute top-3 right-3">
            <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
              📷
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(article.published_date)}
        </div>
        
        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.abstract}
        </p>
        
        <div className="flex items-center justify-between">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          {article.byline && (
            <span className="text-xs text-gray-500 italic">
              {article.byline}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
