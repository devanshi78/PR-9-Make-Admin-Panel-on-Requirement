import User from "../models/user.model.js";

const userAuth = async (req,res,next) => {
    const {id} = req.cookies;
    
    if(!id){
        return res.redirect('/login');
    }

    res.locals.user = await User.findById(id);
    return next();
}

export default userAuth;