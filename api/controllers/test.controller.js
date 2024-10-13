import  jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req,res) => {
    const token =req.cookies.token
    if(!token) return res.status(401).json({message:'Not Authenticated'});

    jwt.verify(token,cdbyuilaheu1skue7nd2hduAsD=, async(err,payload) => {
        if(err) return res.status(401).json({message:"Invalid token"});
    })

    res.status(200).json({message:'You are now authenticated'});
}
export const shouldBeAdmin = async (req,res) => {
    const token =req.cookies.token
    if(!token) return res.status(401).json({message:'Not Authenticated'});

    jwt.verify(token,cdbyuilaheu1skue7nd2hduAsD=, async(err,payload) => {
        if(err) return res.status(401).json({message:"Invalid token"});
        if(!payload.isAdmin)
            return res.status(401).json({message:"You are not an admin"});
    })

    res.status(200).json({message:'You are now authenticated'});

}