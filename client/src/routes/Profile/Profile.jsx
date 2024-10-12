import React, { Suspense, useContext, useEffect, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import List from "../../components/List/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { LogOut, Edit, Plus, Loader, MessageCircle, X } from 'lucide-react';

function Profile() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { updateUser, currentUser } = useContext(AuthContext);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    currentUser && (
      <div className="bg-gray-100 overflow-y-scroll pb-16">
        <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">User Information</h2>
                <Link to="/profile/update" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Profile
                </Link>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Avatar</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <img src={currentUser.avatar} alt="" className="h-20 w-20 rounded-full" />
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.username}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.email}</dd>
                  </div>
                </dl>
              </div>
              <div className="px-4 py-4 sm:px-6">
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My List</h2>
                <Link to="/add" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <Suspense fallback={<div className="p-4 flex justify-center"><Loader className="h-8 w-8 animate-spin text-indigo-600" /></div>}>
                  <Await
                    resolve={data.postResponse}
                    errorElement={<p className="p-4 text-red-600">Error loading posts!</p>}
                  >
                    {(postResponse) => <List posts={postResponse.data.userPosts} />}
                  </Await>
                </Suspense>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900">Saved List</h2>
              </div>
              <div className="border-t border-gray-200">
                <Suspense fallback={<div className="p-4 flex justify-center"><Loader className="h-8 w-8 animate-spin text-indigo-600" /></div>}>
                  <Await
                    resolve={data.postResponse}
                    errorElement={<p className="p-4 text-red-600">Error loading posts!</p>}
                  >
                    {(postResponse) => (
                      postResponse.data.savedPosts.length > 0 ? (
                        <List posts={postResponse.data.savedPosts} />
                      ) : (
                        <p className="p-4 text-gray-500">No saved posts yet.</p>
                      )
                    )}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed bottom-0 right-0 w-full sm:w-96 h-[600px] bg-white shadow-lg rounded-t-lg transition-transform duration-300 ease-in-out ${
            isChatOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="px-4 py-3 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Chats</h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="h-[calc(100%-48px)] overflow-y-auto">
            <Suspense fallback={<div className="p-4 flex justify-center"><Loader className="h-8 w-8 animate-spin text-indigo-600" /></div>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p className="p-4 text-red-600">Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data} />}
              </Await>
            </Suspense>
          </div>
        </div>

        {/* Chat Toggle Button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    )
  );
}

export default Profile;