var q = 1;
function addQuestions(){
var questions = document.getElementById('lastQuestion');
questions.appendChild(document.createElement("Div")).innerHTML=
    '<br><label>Question:'+
    `<input type="text" name="question${q}" placeholder="Required" required></label><br>`+
    '<label>Answers: <br>'+
    `<input type="text" name="a${q}0" placeholder="Required" required>  `+
    `<input type="text" name="a${q}1" placeholder="Required" required>  `+
    `<input type="text" name="a${q}2" placeholder="Optional">  `+
    `<input type="text" name="a${q}3" placeholder="Optional"></label>  `
;
q++;
}