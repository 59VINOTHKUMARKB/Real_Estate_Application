import { defer } from "react-router-dom"
import apiRequest from "./apiRequest"

export const singlePageLoader =async  ({request,params})=>{
    const res = await apiRequest("/posts/"+params.id)
    return res.data
}

export const listPageLoader = async ({ request, params }) => {
  try {
    const queryParams = new URL(request.url).searchParams.toString();
    const postPromise = apiRequest(`/posts?${queryParams}`);
    postPromise.then(response => console.log(response.data));
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.error('Error while fetching posts:', error);
    throw new Error("Failed to load posts");
  }
};


export const profilePageLoader = async () => {
    const postPromise = apiRequest("/users/profileposts/")
    const chatPromise = apiRequest("/chats");
    console.log((await chatPromise).data);  
    return defer({
        postResponse: postPromise,
        chatResponse: chatPromise
    });
};