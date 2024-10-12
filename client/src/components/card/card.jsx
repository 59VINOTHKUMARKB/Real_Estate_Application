import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Bed, Bath, MapPin, MessageCircle } from 'lucide-react';

function Card({ item, showMessageButton, onChatClick }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-2xl shadow-md transition-transform duration-300 hover:scale-105">
      <Link to={`/${item.id}`} className="block relative aspect-video overflow-hidden">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          <Link to={`/${item.id}`} className="hover:text-indigo-600 transition-colors duration-200">{item.title}</Link>
        </h2>
        <p className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1 text-indigo-600" />
          <span>{item.address}</span>
        </p>
        <p className="text-2xl font-bold text-indigo-600 mb-4">${item.price.toLocaleString()}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-600">
              <Bed size={18} className="mr-1" />
              <span>{item.bedroom} bed</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath size={18} className="mr-1" />
              <span>{item.bathroom} bath</span>
            </div>
          </div>
          {currentUser && showMessageButton && (
            <button
              onClick={onChatClick}
              className="bg-indigo-600 text-white px-3 py-1 rounded-full hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            >
              <MessageCircle size={18} className="mr-1" />
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;