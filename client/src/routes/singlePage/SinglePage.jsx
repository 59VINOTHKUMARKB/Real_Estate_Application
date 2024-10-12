import './SinglePage.scss';
import Slider from '../../components/slider/slider';
import Map from '../../components/map/map';
import { MapPin, DollarSign, User, PawPrint, Briefcase, Zap, Maximize, Bed, Bath, School, Utensils, Bus, MessageCircle, Bookmark } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
function SinglePage(){
    const navigate = useNavigate();
    const post = useLoaderData();
    const [saved,setSaved] = useState(post.isSaved)
    const {currentUser} = useContext(AuthContext);
    const handleSave = async () =>{
        setSaved((prev)=>!prev)
        if(!currentUser)
        {
            navigate("/login");
        }
        try{
            const response = await fetch('http://localhost:8800/api/users/savepost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: post.id,userId:currentUser.id,
                }),
                credentials: 'include',
            });
        
            if (!response.ok) {
                throw new Error('Failed to save post');
            }
        
            const data = await response.json();
            console.log(data.message); 
        }
        catch(err){
            console.log(err);
            setSaved((prev)=>!prev)
        }
    }
    return (
        <div className="bg-gray-100 overflow-y-scroll">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Slider images={post.images} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                      <span>{post.address}</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      <DollarSign className="inline w-6 h-6 mr-1" />
                      <span>{post.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <img src={post.user.avatar || "/noavatar.png"} alt={post.user.username} className="w-12 h-12 rounded-full mr-3" />
                    <span className="text-gray-700 font-medium">{post.user.username}</span>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <div className="text-black  p-2 rounded max-w-none" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.postDetail.desc)}} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <PawPrint className="w-6 h-6 text-indigo-600 mr-3" />
                        <div>
                          <span className="block text-sm text-gray-500">Pet Policy</span>
                          <p className="text-gray-700">{post.postDetail.pets === "Allowed" ? "Pets Allowed" : "Pets Not Allowed"}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-6 h-6 text-indigo-600 mr-3" />
                        <div>
                          <span className="block text-sm text-gray-500">Income Policy</span>
                          <p className="text-gray-700">{post.postDetail.income}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-6 h-6 text-indigo-600 mr-3" />
                        <div>
                          <span className="block text-sm text-gray-500">Utilities</span>
                          <p className="text-gray-700">{post.postDetail.utilities === "owner" ? "Owner is Responsible" : "Tenant is Responsible"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Size</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center">
                        <Maximize className="w-6 h-6 text-indigo-600 mr-2" />
                        <span className="text-gray-700">{post.postDetail.size} sqft</span>
                      </div>
                      <div className="flex items-center">
                        <Bed className="w-6 h-6 text-indigo-600 mr-2" />
                        <span className="text-gray-700">{post.bedroom} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-6 h-6 text-indigo-600 mr-2" />
                        <span className="text-gray-700">{post.bathroom} baths</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Places</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <School className="w-6 h-6 text-indigo-600 mr-3" />
                      <div>
                        <span className="block text-sm text-gray-500">Schools</span>
                        <p className="text-gray-700">{post.postDetail.school}m away</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="w-6 h-6 text-indigo-600 mr-3" />
                      <div>
                        <span className="block text-sm text-gray-500">Restaurant</span>
                        <p className="text-gray-700">{post.postDetail.restaurant}m away</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Bus className="w-6 h-6 text-indigo-600 mr-3" />
                      <div>
                        <span className="block text-sm text-gray-500">Bus Stands</span>
                        <p className="text-gray-700">{post.postDetail.bus}m away</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <Map items={[post]} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send a Message
                  </button>
                  <button 
                    onClick={handleSave}
                    className={`flex-1 px-6 py-3 rounded-md transition duration-300 flex items-center justify-center ${
                      saved ? "bg-yellow-400 text-gray-900" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <Bookmark className="w-5 h-5 mr-2" />
                    {saved ? "Saved!" : "Save the Place"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SinglePage;