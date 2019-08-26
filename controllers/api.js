const Users = require('../models/survey');

function index(req,res)
{
    res.render('api/index')
}

function show(req,res)
{
    Users.findOne({googleId:`${req.params.id}` })
    .then((x)=>{
        x.surveys.forEach((s)=>{
         if(s._id==req.params.survey)
         {
            res.status(200).json(s);
         }})
         res.render('api/404');     
})}


module.exports = 
{
    index,
    show
}