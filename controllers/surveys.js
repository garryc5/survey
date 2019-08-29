Users = require('../models/survey');

function index(req, res) {
    if(req.user){req.user.save()};
        res.render('survey/index', {
        user : req.user,
     })
    }

function create(req, res)
{
    let temp = 
  {
      name : req.body.name,
      questions:[]
  }
  let tempq = {};
    for (let [key, value] of Object.entries(req.body)) {
        if(key=='name'){}
        if(key.split('').shift()=='q')
        {
             tempq = {};
             tempq.question = value;
             tempq.answer={};
        }
        if(key.split("").shift()=='a')
        {
            if(value){tempq.answer[value] = 0}
            if(key.split("").pop()=='3')
            {
                temp.questions.push(tempq);
            }
        }
      }
    req.user.surveys.push(temp);
    req.user.save();
    res.redirect('/')
}

function newSurvey(req, res)
{
    res.render('survey/create',
    {
    user : req.user
    });
}

function surveyDelete(req,res)
{
req.user.surveys.forEach((s,idx)=>{
        if(s._id==req.params.id){req.user.surveys.splice(idx,1)}
    })
req.user.save();
res.redirect('/');
}

function show(req,res)
{ 
       Users.find({googleId:`${req.params.id}` })
       .then((x)=>{
           x[0].surveys.forEach((s)=>{
            if(s._id==req.params.survey)
            {
                    res.render('survey/show',
                    {
                        user : req.user,
                        survey : s,
                        uid : req.params.id,
                        sid : req.params.survey,
                    })}})})  
}

function takeSurvey(req,res)
{ 
       Users.findOne({googleId:`${req.params.id}` })
       .then((x)=>{
           x.surveys.forEach((s)=>{
            if(s._id==req.params.survey)
            {
            s.questions.forEach((q,qIdx)=>
            {
                q.answer[req.body[`q${qIdx}`]]++;  
                q.markModified('answer');
            })}
                console.log(x.surveys)

                x.save().then(()=>{
                    res.render('parts/thanks',
                    {
                        s,
                        user : req.user,
                    });
                });     
        }) 
    })    
}

function edit(req ,res)
{
    req.user.surveys.forEach((s)=>{
        if(s._id==req.params.id){
            res.render('survey/edit',
            {
                user : req.user,
                survey : s,
            });
        }
    })
}

function updateSurvey(req,res)
{
    req.user.surveys.forEach((s)=>{
        if(s._id==req.params.id)
        {
            s.questions.forEach((q,idx)=>
            {
                q.question = req.body[`q${idx}`];
                let x = 0;
                let temp ={};
                for (let [key] of Object.entries(q.answer)) 
                {
                    delete q.answer[key];
                    temp[req.body[`a${idx}${x}`]] =0;
                    x++;
                }
                Object.assign(q.answer,temp);
                q.markModified('answer');
                s.markModified('question');
            })
            req.user.save().then(
            res.redirect('/'));
        }
    })
}



module.exports = 
  {
      index,
      create,
      new : newSurvey, 
      delete : surveyDelete,
      show,
      takeSurvey,
      update : updateSurvey,
      edit,
  }
