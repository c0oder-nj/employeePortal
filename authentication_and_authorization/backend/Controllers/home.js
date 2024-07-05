const home = async(req,res)=> {
    try{
        res.status(200).send("Home page using controller");
    }catch(err){
        res.status(400).send({msg: err});
    }
}

module.exports = home;