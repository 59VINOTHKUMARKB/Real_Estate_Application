import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) =>{
    const token =req.cookies.token
    if(!token) return res.status(401).json({message:'Not Authenticated'});

    jwt.verify(token,cdbyuilaheu1skue7nd2hduAsD=, async(err,payload) => {
        if(err) return res.status(401).json({message:"Invalid token"});
        req.userId=payload.id;
        next();
    })
}