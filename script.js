const wholePage = document.querySelectorAll(".wholePage");
const heroBackground = document.getElementById("hero-bg");
const switchIcon = document.getElementById("icon");
const listContainer = document.getElementById('list-container')
const inputBox = document.getElementById("input")
const addCircle=document.getElementById("add")
let taskCount =document.getElementById('count-task')

switchIcon.onclick=function(){
    document.body.classList.toggle('dark-switch')
    if(document.body.classList.contains('dark-switch')){
        icon.src='/images/icon-sun.svg';
        heroBackground.classList.remove("hero-image")
        heroBackground.classList.add("dark-hero")

    }
    else{
        icon.src='/images/icon-moon.svg';
        heroBackground.classList.remove("dark-hero")
        heroBackground.classList.add("hero-image")

    }
    console.log('clicked');
}

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
    }
}

const saveData=()=>{
    localStorage.setItem("data", listContainer.innerHTML)
}

function showData(){
    listContainer.innerHTML=localStorage.getItem("data")
}

function countTask(){
   getData=localStorage.getItem("data")
  let showme=JSON.parse(getData)
  return showme
}
showData()
countTask()