const multer = require('multer');
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./images')
    },
    filename : function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})
//|| file.mimetype=='image/jpeg'
const filefilter = function(req,file,cb){
    if(file.mimetype =='image/png'||'image/jpg'|| 'application/pdf'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
//if there is image then only, upload otherwise show error message.)
const upload = multer({
    storage:storage,
    fileFilter:filefilter
});

module.exports= upload;