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
         res.render('api/four04');     
})}

function pie(req,res)
{
    Users.findOne({googleId:`${req.params.id}` })
    .then((x)=>
    {
        x.surveys.forEach((s)=>
        {
            s.questions.forEach((q)=>
            { 
                var forGraph = [0,0];
                for(let [key,value] of Object.entries(q.answer))
                { 
                    forGraph[0]++; forGraph[1]+=parseInt(value); 
                } 
                var keyString = 'Key:  '; 
                var gradString ='linear-gradient(0deg, black 50%, transparent 50%)'; 
                var deg=0; 
                var colors = ['red','blue','green','purple'];
                for(let [key,value] of Object.entries(q.answer))
                { 
                    var currentColor = colors.pop(); 
                    keyString += ` * ${key}: ${value}: ${currentColor}`;
                    deg += ((parseInt(value)/forGraph[1])*180);
                    gradString += `, linear-gradient(${deg}deg, ${currentColor} 50%, transparent 50%)`;
                } 
        var divToSend =  
        `<h4>${q.question}</h4>`;
        keyString = keyString.split('*');
        keyString.forEach((k)=>{ 
        divToSend +=`<h6>${k}</h6>`;
        }) 
        divToSend+=`<div class="pieChart" style="background-image: ${gradString}; height: 200px; width: 200px;   border-radius: 50%;" ></div>`
        res.status(200).json(divToSend);
            })
        })  
    }).catch(res.render('api/four04'))
}

module.exports = 
{
    index,
    show,
    pie,
}