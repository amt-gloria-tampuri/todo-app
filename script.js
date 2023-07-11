const wholePage = document.querySelectorAll(".wholePage");
const heroBackground = document.getElementById("hero-bg");
const switchIcon = document.getElementById("icon");
const listContainer = document.getElementById('list-container')
const inputBox = document.getElementById("input")
const addCircle=document.getElementById("add")
const taskCount =document.getElementById('count-task')
const filterDiv=document.getElementById('action')
const clearTasks=document.getElementById('clearTask')
const selectedItems =document.getElementsByClassName('checked')
const mobileSort = document.getElementById('mobileSort')
const mediaQuery =window.matchMedia("(max-width:400px)")



document.addEventListener("DOMContentLoaded",function(){
    function enableDarkMode(){
    document.body.classList.add('dark-switch')
}
function disableDarkMode(){
     document.body.classList.remove('dark-switch')
}
switchIcon.onclick=function(){
   const isDarkMode = localStorage.getItem('mode')==='dark';
   if(isDarkMode){
    disableDarkMode()
    localStorage.setItem('mode','light')

   }else{
    enableDarkMode()
    localStorage.setItem('mode','dark')      

   }

   let preferredmode = localStorage.getItem('mode')
    if(preferredmode==='dark'){
        icon.src='/images/icon-sun.svg';
        heroBackground.classList.remove("hero-image")
        heroBackground.classList.add("dark-hero")
        console.log('dark');
        enableDarkMode()

    }
    else if(preferredmode==='light'){
        icon.src='/images/icon-moon.svg';
        heroBackground.classList.remove("dark-hero")
        heroBackground.classList.add("hero-image")
        disableDarkMode()
    }

  
   
}
})





addCircle.onclick=function(){
    if(inputBox.value ===''){
        alert('Please type a task!')
    }
    else{
    
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li)
        let span=document.createElement("span");
       let img =document.createElement('img');
       img.src='images/icon-cross.svg'
       span.appendChild(img)
        li.appendChild(span)
      
        location.reload();    

    }
    inputBox.value=''
    saveData()
}



listContainer.onclick=function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle('checked')
        saveData()
    }
    else if(e.target.tagName=== 'IMG'){
        e.target.parentElement.parentElement.remove();
        saveData()
        location.reload()
    }
}


const saveData=()=>{
    localStorage.setItem("data", listContainer.innerHTML)
}


function showData(){
    listContainer.innerHTML=localStorage.getItem("data")
  
}
showData()
console.log(listContainer.childElementCount);
if(listContainer.childElementCount>=1){
  filterDiv.style.display="flex"
}
if (mediaQuery.matches || listContainer.childElementCount>=1){
    mobileSort.classList.add('.sortOnMobile') 
}
showNumberOftask=()=>{
    let number = listContainer.childElementCount
    console.log(number);
    const item = number===1?'item':'items'
    taskCount.innerText=`${number} ${item} left`
}
showNumberOftask()


clearTasks.onclick=function(){
    console.log(selectedItems);
const completedArray = Array.from(selectedItems)
console.log(completedArray);
completedArray.forEach(function(selectedItem){
    selectedItem.parentNode.removeChild(selectedItem)
})
    saveData()
    location.reload()
}
