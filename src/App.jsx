import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'
import Navbar from './components/Navbar'
import Loader from "./components/Loader";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 
 const [section,setsection]=useState("")

  useEffect(() => {
    const fetchNews = async () => {
      try{
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`    
      );
      const data = response.data;     
      setNews(data.results);
      setLoading(false);
    }
    catch(error){ 
      setError(true);
      setLoading(false);
    }
    };
    
    fetchNews();
  }, []);
   
 const handleHealth=async()=>{
  try{
    setLoading(true)    
    const newresponse = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/Health.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`    
    );
    const datas = newresponse.data;     
    setNews(datas.results);
    setLoading(false);
  }
  catch(error){ 
    setError(true);
    setLoading(false);
  }
 }
 const handlehome=async()=>{
  try{
    setLoading(true)
    const newresponse = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`    
    );
    const datas = newresponse.data;     
    setNews(datas.results);
    setLoading(false);
  }
  catch(error){ 
    setError(true);
    setLoading(false);
  }
 }
 const handletechnology=async()=>{
  try{
    setLoading(true)   
    const newresponse = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`    
    );
    const datas = newresponse.data;     
    setNews(datas.results);
    setLoading(false);
  }
  catch(error){ 
    setError(true);
    setLoading(false);
  }
 }
 const handlebusiness=async()=>{
  try{
    setLoading(true)   
    const newresponse = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=AOFvSfzLSamsmw3uggBysZ3UgrIu2Kqk`    
    );
    const datas = newresponse.data;     
    setNews(datas.results);
    setLoading(false);
  }
  catch(error){ 
    setError(true);
    setLoading(false);
  }
 }

  if (error) {
    return (
      <div className="w-full h-screen ">
        <Navbar/>
        <div className=" w-full h-[85%] flex justify-center items-center flex-col">
        <h1 className="text-red-500 text-3xl">Something went wrong!</h1>
        <button onClick={()=>{
          setError(false)
          setLoading(true)
        }}
        className="h-16 bg-black text-white text-3xl  rounded-lg  p-3 mt-2"
        >Go Back</button>
        </div>
      </div>
    )
  }
 


  return (
    <>
     <Navbar/>
     {loading ? (
        <Loader/>
      ) : (
        <div className="w-full">
          <div className="w-auto  flex justify-center md:gap-10 sm:gap-8 gap-2 lg:gap-11 lg:mt-4 lg:mb-4">
          <div className="lg:text-2xl md:text-2xl hover:bg-black hover:text-white p-1 lg:p-2 rounded-xl cursor-pointer " onClick={handlehome}>Home</div>
          <div className="lg:text-2xl md:text-2xl hover:bg-black hover:text-white p-1 lg:p-2 rounded-xl cursor-pointer" onClick={handleHealth}>Health</div>
          <div className="lg:text-2xl md:text-2xl hover:bg-black hover:text-white p-1 lg:p-2 rounded-xl cursor-pointer" onClick={handletechnology}>Technology</div>
          <div className="lg:text-2xl md:text-2xl hover:bg-black hover:text-white p-1 lg:p-2 rounded-xl cursor-pointer" onClick={handlebusiness}>Business</div>
          </div>
          
          <div className="w-full flex justify-center">
        <div className="max-w-[1400px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ">
        
        {news.map((article, index) => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden " key={index}>
            <div className="bg-slate-400 m-2 rounded-3xl overflow-hidden">
            <img 
              src={article?.multimedia?.[0]?.url || "/superJumbo.jpg"} 
              alt="News" 
              className="w-full h[300px] md:h-[213px] lg:h-[213px] object-cover  hover:scale-[1.3] transition-all ease-out delay-0 duration-700 rounded-3xl "
            />
            </div>
            <div className="p-4">
              <div className="flex justify-between text-gray-500 text-sm">
                <p>{new Date(article.published_date).toDateString()}</p>
                <span>{article.section.toUpperCase()}</span>
              </div>
              <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
              <p className="text-gray-700 mt-2">{article.abstract}</p>
              <a href={article.url} className="text-blue-500 mt-4 inline-block relative bottom-0">Read More</a>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
      )}
    </>
  )
}

export default App;