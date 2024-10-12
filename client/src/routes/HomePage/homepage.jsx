import { useContext, useState, useEffect, Suspense } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { motion } from 'framer-motion'
import { Home, Award, Building, Users, ChevronRight, ChevronLeft } from 'lucide-react'
import { Await, Link } from 'react-router-dom'
import {  useLoaderData } from 'react-router-dom';
import Card from '../../components/card/card.jsx'


export default function Homepage() {
  const { currentUser } = useContext(AuthContext)
  const [currentSlide, setCurrentSlide] = useState(0)
  const data=useLoaderData();
  console.log(data);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    }
  ]
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  return(
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-scroll">
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </motion.div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-8"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Find Your Dream Home
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl text-white mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover the perfect property that fits your lifestyle
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
            </motion.div>
              <SearchBar />
              <div className="rounded-b-xl max-w-full text-white bg-indigo-600 p-2 hover:bg-indigo-800 ml-auto p-3 ">
                <Link to="/list">View All</Link>
              </div>
          </div>
        </div>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose DreamHome?</h2>
            <p className="text-xl text-gray-600">We're committed to helping you find the perfect property</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "16+ Years", subtitle: "of Experience" },
              { icon: Award, title: "200+ Awards", subtitle: "for Excellence" },
              { icon: Building, title: "1500+ Properties", subtitle: "Ready for You" },
              { icon: Users, title: "10,000+ Clients", subtitle: "Satisfied" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-center text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <item.icon className="mx-auto h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-indigo-100">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Explore our handpicked selection of stunning properties</p>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {postResponse.data.map((property, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.city}</p>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div> */}
             <Suspense fallback={<div className="text-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div></div>}>
              <Await
                resolve={data.postResponse}
                errorElement={<div className="text-red-600 text-center py-8">Error loading posts!</div>}
              >
                {(postResponse) => (
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-fit rounded-sm">
                    {postResponse.data.length === 0 ? (
                      <h2 className="text-2xl font-semibold text-gray-700 col-span-full text-center py-8">No Data found</h2>
                    ) : (
                      postResponse.data.map((post) => (
                        <Card
                          key={post.id}
                          item={post}
                          showMessageButton={true}
                          onChatClick={() => handleChatClick(post.userId)}
                        />
                      ))
                    )}
                  </div>
                )}
              </Await>
            </Suspense>
        </div>
      </div>
    </div>
  )
}