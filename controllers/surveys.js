function index(req, res, next) {
    if(req.user){req.user.save()};
        res.render('survey/index', {
        user : req.user,
     })
    };

function create(req, res)
{
    // get numbers of questions
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
                console.log(tempq);
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

module.exports = 
  {
      index,
      create,
      new : newSurvey, 
  };