import prisma from "../lib/prisma.js";
import jwt from 'jsonwebtoken'
export const getPosts = async (req, res) => {
    const query = req.query;
    console.log("Query Parameters:", query);

    try {
        // Prepare the filters
        const filters = {
            city: query.city ? query.city.trim() : undefined,
            type: query.type || "rent",
            property: query.property || "house",
            bedroom: query.bedroom ? {
                gte: parseInt(query.bedroom, 10),
                lte: parseInt(query.bedroom, 10)
            } : undefined,
            price: {}
        };

        // Handle minPrice and maxPrice
        if (query.minPrice) {
            const minPrice = parseInt(query.minPrice, 10);
            if (!isNaN(minPrice) && minPrice >= 0) {
                filters.price.gte = minPrice;
            }
        } else {
            filters.price.gte = 0; // Default minimum price
        }

        if (query.maxPrice) {
            const maxPrice = parseInt(query.maxPrice, 10);
            if (!isNaN(maxPrice) && maxPrice > 0) {
                filters.price.lte = maxPrice;
            } else {
                filters.price.lte = 10000000; // Default maximum price
            }
        } else {
            filters.price.lte = 10000000; // Default maximum price
        }

        // Remove undefined properties from filters
        Object.keys(filters).forEach(key => 
            filters[key] === undefined && delete filters[key]
        );

        console.log("Filters:", filters);

        // Fetch posts from the database
        const posts = await prisma.post.findMany({
            where: filters
        });

        console.log("Fetched Posts:", posts);
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Failed to get Posts!" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                },
            }
        });
        let userId = null;
        const token = req.cookies?.token;

        if(token)
        {
            jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
                if(!err)
                {
                    const saved = await prisma.savedPost.findUnique({
                        where:{
                            userId_postId: {
                                postId:id,
                                userId: payload.id
                            }
                        }
                    })
                    res.status(200).json({...post, isSaved:saved ? true : false})
                }
            })
        }
        else
        {
            res.status(200).json({...post, isSaved:false})
        }
    } catch (err) {
        console.error('Error getting post:', err);
        res.status(500).json({ message: "Failed to get Post!" });
    }
};

export const addPost = async(req,res)=>
{
    const body = req.body;
    const tokenUserId =req.userId;
    try{
        const { postData, postDetail, userId } = req.body;

    if (!postData || !postDetail || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = await prisma.post.create({
      data: {
        title: postData.title,
        price: postData.price,
        address: postData.address,
        city: postData.city,
        bedroom: postData.bedroom,
        bathroom: postData.bathroom,
        type: postData.type,
        property: postData.property,
        latitude: postData.latitude,
        longitude: postData.longitude,
        images: postData.images,
        user: {
          connect: {
            id: userId,
          },
        },
        postDetail: {
          create: postDetail,
        },
      },
    });
    console.log("created post")
        res.status(200).json(newPost);
        console.log(newPost);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to create Posts!"});
    }
};

export const updatePost = async(req,res)=>
{
    try{

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to Update Posts!"});
    }
}

export const deletePost = async(req,res)=>
{
    const id=req.params.id;
    const tokenUserId =req.userId;

    try{
        const post = await prisma.post.findUnique({
            where:{
                id
            }
        });

        if(post.userId !== tokenUserId)
        {
            return res.status(403).json({message: "Not Authorized!"});
        }

        await prisma.post.delete({
            where:{
                id
            },
        })
        res.status(200).json({message: "Post Deleted!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to Delete Posts!"});
    }
}