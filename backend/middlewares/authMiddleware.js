import jwt from 'jsonwebtoken'


// export const userJwtMiddleware = (req,res,next)=>{
//     const token = req.header('x-auth-token');
//     if(!token){
//         return res.status(401).json({msg:'No token, authorization denied'})
//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.userId = decoded.id;
//         next();
//     }catch(err){
//         res.status(401).json({msg:'Token is not valid'})
//     }
// }


export const userJwtMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expected format: 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};


