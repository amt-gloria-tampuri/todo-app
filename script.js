const wholePage = document.querySelectorAll(".wholePage");
const heroBackground = document.getElementById("hero-bg");
const darkModeToggle  = document.getElementById("icon");
const listContainer = document.getElementById('list-container')
const inputBox = document.getElementById("input")
const addCircle=document.getElementById("add")
const taskCount =document.getElementById('count-task')
const filterDiv=document.getElementById('action')
const clearTasks=document.getElementById('clearTask')
const selectedItems =document.getElementsByClassName('checked')
const mobileSort = document.getElementById('mobileSort')
const mediaQuery =window.matchMedia("(max-width:400px)")
const all= document.getElementById('all')
const active= document.getElementById('active')
const completed=document.getElementById('completed')
const sall= document.getElementById('sall')
const sactive= document.getElementById('sactive')
const scompleted=document.getElementById('scompleted')

const extra=document.getElementById('extra')


darkModeToggle.addEventListener('click', function() {
  const darkModeEnabled = document.body.classList.toggle('dark-switch');
 
  localStorage.setItem('darkMode', darkModeEnabled);

  // Change the src attribute based on the dark mode state
  if (darkModeEnabled) {
    darkModeToggle.src='images/icon-sun.svg';
    heroBackground.classList.remove('hero-image')
    heroBackground.classList.add('dark-hero')
  } else {
    heroBackground.classList.remove('dark-hero')
    heroBackground.classList.add('hero-image')
    darkModeToggle.src = 'images/icon-moon.svg';
  }
});

window.addEventListener('load', function() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    
    if (darkModeEnabled) {
      document.body.classList.add('dark-switch');
    darkModeToggle.src='images/icon-sun.svg';
    heroBackground.classList.add('dark-hero')

    }
  });
  



//Add Task
addCircle.onclick=function(){
    if(inputBox.value ===''){
        alert('Please type a task!')
    }
    else{
    
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        li.draggable=true;
        let span=document.createElement("span");
       let img =document.createElement('img');
       img.src='images/icon-cross.svg'
       span.appendChild(img)
        li.appendChild(span)
        li.classList.add=('draggable')
        location.reload();

    }
    inputBox.value=''
    saveData()
    
}


//check completed task and removed task my clicking class icon
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

//show summary and sort
if(listContainer.childElementCount>=1){
  filterDiv.style.display="flex"
  extra.style.display='block'
}
if (mediaQuery.matches && listContainer.childElementCount>=1){
    mobileSort.classList.add('.sortOnMobile')
    // mobileSort.style.display='flex' 
}

//show number of task in list
const showNumberOftask=()=>{
    let number = listContainer.childElementCount
    console.log(number);
    const item = number===1?'item':'items'

    taskCount.textContent=(`${number} ${item} left`)
}
showNumberOftask()

//clear completed task
clearTasks.onclick=function(){
    
const completedArray = Array.from(selectedItems)

completedArray.forEach(function(selectedItem){
    selectedItem.parentNode.removeChild(selectedItem)
})
    saveData()
    location.reload()
}

//filter task
all.addEventListener('click', function() {
    filterList('all');
  });
  
  completed.addEventListener('click', function() {
    filterList('completed');
  });
  
  active.addEventListener('click', function() {
    filterList('active');
  });
  
  function filterList(filter) {
    const listItems = listContainer.children;
  
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      switch (filter) {
        case 'all':
          listItem.style.display = 'block';
          all.classList.add('activecolor'); // Add a class to the "All" element
          completed.classList.remove('activecolor'); // Remove the class from other elements
          active.classList.remove('activecolor'); 
          break;
        case 'completed':
          if (listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
            all.classList.remove('activecolor'); // Add a class to the "All" element
            completed.classList.add('activecolor'); // Remove the class from other elements
            active.classList.remove('activecolor'); 
            
          } else {
            listItem.style.display = 'none';
          }
          break;
        case 'active':
          all.classList.remove('activecolor'); // Add a class to the "All" element
          completed.classList.remove('activecolor'); // Remove the class from other elements
          active.classList.add('activecolor'); 
          if (!listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
          } else {
            listItem.style.display = 'none';
          }
          break;
      }
    }
  }


//sort on small Screen

sall.addEventListener('click', function() {
  filterListSmall('all');
});

scompleted.addEventListener('click', function() {
  filterListSmall('completed');
});

sactive.addEventListener('click', function() {
  filterListSmall('active');
});

function filterListSmall(filter) {
  const listItems = listContainer.children;

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    switch (filter) {
      case 'all':
        listItem.style.display = 'block';
        sall.classList.add('activecolor'); // Add a class to the "All" element
        scompleted.classList.remove('activecolor'); // Remove the class from other elements
        sactive.classList.remove('activecolor'); 
        break;
      case 'completed':
        if (listItem.classList.contains('checked')) {
          listItem.style.display = 'block';
          sall.classList.remove('activecolor'); // Add a class to the "All" element
          scompleted.classList.add('activecolor'); // Remove the class from other elements
          sactive.classList.remove('activecolor'); 
          
        } else {
          listItem.style.display = 'none';
        }
        break;
      case 'active':
        sall.classList.remove('activecolor'); // Add a class to the "All" element
        scompleted.classList.remove('activecolor'); // Remove the class from other elements
        sactive.classList.add('activecolor'); 
        if (!listItem.classList.contains('checked')) {
          listItem.style.display = 'block';
        } else {
          listItem.style.display = 'none';
        }
        break;
    }
  }
}


//_______________________________________________________________________________________________________  
//Drag and drop

const draggables=document.getElementsByTagName('li')
const draggablesArray = Array.from(draggables);

console.log(draggablesArray);
draggablesArray.forEach(draggable=>{
draggable.draggable=true;
})
draggablesArray.forEach(draggable=>{
  draggable.addEventListener('dragstart', ()=>{
  console.log('dragstart');
    draggable.classList.add('dragging')
  })
  draggable.addEventListener('dragend',()=>{
    draggable.classList.remove('dragging')
  })
})

// 

listContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(listContainer, e.clientY);

  if (afterElement && listContainer.contains(afterElement)) {
    listContainer.insertBefore(draggable, afterElement);
  } else {
    listContainer.appendChild(draggable);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(':not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}
