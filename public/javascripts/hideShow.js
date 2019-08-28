let currentlyOpen = " ";

var clickable = document.querySelectorAll('h3');
clickable.forEach((tab)=>
{
    tab.addEventListener('click',showPre);

})

function showPre(evt)
{
    document.querySelectorAll('.hidden').forEach((tab)=>
    {
        tab.style.display = "none";
        tab.previousElementSibling.firstElementChild.textContent = "^";
    })
    if(!(currentlyOpen == evt.target.id)){
        evt.target.nextElementSibling.style.display = "block"; 
        evt.target.firstElementChild.textContent="v"
        currentlyOpen = evt.target.id;
}else{currentlyOpen = " "}
}