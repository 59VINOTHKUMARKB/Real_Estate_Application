import React, { useState, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import Filter from "../../components/filter/filter";
import Card from "../../components/card/card";
import Map from "../../components/map/map";
import Chat from "../../components/chat/Chat";
import { XCircle } from 'lucide-react';

export default function ListPage() {
  const data = useLoaderData();
  console.log(data);
  const [activeChatUser, setActiveChatUser] = useState(null);

  const handleChatClick = async (userId) => {
    try {
      const response = await fetch(`/chats/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setActiveChatUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-y-scroll bg-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md mb-8">
              <Filter />
            </div>
            <Suspense fallback={<div className="text-center py-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div></div>}>
              <Await
                resolve={data.postResponse}
                errorElement={<div className="text-red-600 text-center py-8">Something Wrong! Please give Correct Filters</div>}
              >
                {(postResponse) => (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
      {activeChatUser && (
        <div className="fixed bottom-0 right-0 w-full sm:w-96 h-96 bg-white shadow-lg rounded-t-lg overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Chat</h3>
            <button onClick={() => setActiveChatUser(null)} className="text-white hover:text-indigo-200">
              <XCircle size={24} />
            </button>
          </div>
          <div className="p-4 h-full">
            <Chat chats={activeChatUser} />
          </div>
        </div>
      )}
    </div>
  );
}