import React from "react";
import './Loader.css'

function Loader() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="loader mb-6"></div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading News</h3>
        <p className="text-gray-500 text-sm">Fetching the latest stories...</p>
      </div>
    </div>
  );
}

export default Loader;
