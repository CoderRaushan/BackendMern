import jwt from "jsonwebtoken";
const jwtTokenFunction=(userId,name,email,photo,res)=>
{
   const jwtToken=jwt.sign({userId,name,email,photo},process.env.JwtTokenKEY,{expiresIn:"2d"});
   res.cookie('jwt', jwtToken, 
   {
      maxAge: 24 * 60 * 60 * 1000, 
      httpOnly: true,              
      secure: true,                
      sameSite: 'None', 
      path: '/',             
    });
};
export default jwtTokenFunction;