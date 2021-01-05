module.exports = {

    //nen redirect toi mot trang bao loi bat nguoi dung dn bang tk gi truoc da

    auth(req,res,next){
        if(req.session.auth===false){
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }
        next();
    },

    authUser(req,res,next){
        if(req.session.auth===false || req.session.authUser.role!==0){
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }
        next();
    },

    authLecturer(req,res,next){
        if(req.session.auth===false || req.session.authUser.role!==1){
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }
        next();
    },

    authAdmin(req,res,next){
        if(req.session.auth===false || req.session.authUser.role!==2){
            req.session.retUrl = req.originalUrl;
            return res.redirect('/account/login');
        }
        next();
    }
}