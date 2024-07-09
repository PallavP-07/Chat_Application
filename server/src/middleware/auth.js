import jwt from 'jsonwebtoken';


const isAuthenticated = async(req,res,next)=>{
  try{
    let cookie = await req.cookies["chat-token"]
    if(!cookie)
    return res.status(401).json({message:"please login to access this page"})
const decoderdData = jwt.verify(cookie,process.env.JWT_KEY)
  req.user= decoderdData._id
  next()
//    res.status(200).json({message:"you have access for this page now!"})
}
  catch(error){
    console.log(error)

  }
}
export{isAuthenticated};