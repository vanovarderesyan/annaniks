const fs = require("fs");

const findByLanguage = function(lng){
    let Banner = this;
    return Banner.findOne({language : lng, isActive : true});
};

const findAll = function(lng){
    let Banner = this;
    return Banner.find();
};

const createImageById = function(bannerId, image){
    console.log(image)
    if(!image){
        return Promise.reject({
            name : "uploadError",
            message : "file is not send"
        });
    }
    let path = image.path;
    let Banner = this;
    
    return Banner.findById(bannerId)
        .then((result) => {
            if(!result){
                return Promise.reject({
                    name: "searchError",
                    message : "Can not get it banner"
                })
            }
            return Banner.findOneAndUpdate({ _id : bannerId }, {$set : {image : path}})
                .then((result) => {
                    if(result.image){
                        fs.unlinkSync(result.image);
                    }else{
                        console.log("this is 1");
                    }
                })
                .catch((err) => {

                })
        })
        .catch((err) => {
            return Promise.reject({
                name: "searchError",
                message : "Can not get it banner"
            })
        })
};



module.exports = {
    findByLanguage,
    findAll,
    createImageById
}