const home = async(req,res) => {
    res.status(200).send("Data for showing at router part");
}

const login = async(req,res) => {
    console.log("End point hit");
    res.status(200).send(req.body);
}


module.exports = {home, login};