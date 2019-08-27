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
        tab.parentElement.style.transform = "rotate(90)"
    })
    evt.target.nextElementSibling.style.display = "block"; 
    tab.parentElement.style.transform = "rotate(0)"
  
}