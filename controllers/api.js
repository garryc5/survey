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
            var divToSend = '';
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
            divToSend +=  `<h4>${q.question}</h4>`;
            keyString = keyString.split('*');
            keyString.forEach((k)=>{ 
            divToSend +=`<h6>${k}</h6>`;
             }) 
            divToSend+=`<div class="pieChart" style="background-image: ${gradString}; height: 200px; width: 200px;   border-radius: 50%;" ></div>`;
            })
            res.status(200).json(divToSend);
        }) 
         
    })}

function line(req,res)
{
    Users.findOne({googleId:`${req.params.id}` })
    .then((x)=>
    {
        x.surveys.forEach((s)=>
        {
            var lineString = []; 
            var keyStringLG = [];
            s.questions.forEach((q)=>
            { 
            var forGraph = [0,0];
            var colors = ['red','blue','green','purple'];    
                for(let [key,value] of Object.entries(q.answer)) { 
                forGraph[0]++; forGraph[1]+=parseInt(value); }
                for(let [key,value] of Object.entries(q.answer)) 
                { 
                var currentColor = colors.pop(); 
                var currentPercent=(parseInt(value)/forGraph[1]);  
                lineString.push(`background-color: ${currentColor}; height: ${currentPercent*100}%; width: 20px;`);
                keyStringLG.push(`${key}: ${value}: `);
                }
            })
            var lgString = '<div style= "display: flex;flex-direction: row;align-items: flex-end;border-left: 1vw solid black;border-bottom: 1vw solid black; width: 200px;height: 200px;">';
            lineString.forEach((style,idx)=>
            {
            lgString += `<div style="transform: rotate(270deg); position: relative; top: -25%;" >${keyStringLG[idx]}</div>`;
            lgString += ` <div style = " ${style} "></div>`;
            })
        lgString += '</div>'
        res.status(200).json(lgString);
        })
    })
    
}

module.exports = 
{
    index,
    show,
    pie,
    line
}