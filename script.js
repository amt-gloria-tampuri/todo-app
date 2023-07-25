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


darkModeToggle.addEventListener('click', ()=> {
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

window.addEventListener('load',()=> {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    
    if (darkModeEnabled) {
      document.body.classList.add('dark-switch');
    darkModeToggle.src='images/icon-sun.svg';
    heroBackground.classList.add('dark-hero')

    }
  });
  



inputBox.addEventListener("keyup", (event) => {
  // Check if the inputBox value is empty
  if (inputBox.value === '') {
    alert('Please type something');
  } else if (event.key === "Enter" || event.keyCode === 13) {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    li.draggable = true;

    let span = document.createElement("span");
    let img = document.createElement('img');
    img.src = 'images/icon-cross.svg';
    span.appendChild(img);
    li.appendChild(span);

    // Clear the input box after adding the item
    inputBox.value = "";
    
    saveData();
    location.reload();
  }
});



//check completed task and remove  task my clicking close icon
listContainer.onclick=(e)=>{
    if(e.target.tagName==="LI"){
        e.target.classList.toggle('checked')
        saveData()
        location.reload()
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


const showData=()=>{
    listContainer.innerHTML=localStorage.getItem("data")
  
}
showData()

//show summary and sort buttons
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
    // let number = listContainer.childElementCount
   
   const itemsLeft=document.querySelectorAll('li:not(.checked)')
   const num = itemsLeft.length

    const item = num===1?'item':'items'

    taskCount.textContent=(`${num} ${item} left`)
}
showNumberOftask()



//clear completed task
clearTasks.onclick=()=>{
    
const completedArray = Array.from(selectedItems)

completedArray.forEach((selectedItem)=>{
    selectedItem.parentNode.removeChild(selectedItem)
})
    saveData()
    location.reload()
}

//filter task
all.addEventListener('click', ()=> {
    filterList('all');
  });
  
  completed.addEventListener('click', ()=> {
    filterList('completed');

  });
  
  active.addEventListener('click',()=> {
    filterList('active');

  });
  
  const filterList=(filter)=> {
    const listItems = listContainer.children;
    console.log(listItems);
  
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      console.log(listItem);
      switch (filter) {

        case 'completed':
          if (listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
          } else {
            listItem.style.display = 'none';
          }
          all.classList.remove('activecolor'); 
            completed.classList.add('activecolor'); 
            active.classList.remove('activecolor'); 
            
          break;
        case 'active':
         
          if (!listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
            
          } else {
            listItem.style.display = 'none';
          }
          all.classList.remove('activecolor'); 
          completed.classList.remove('activecolor');
          active.classList.add('activecolor'); 
          break;
          case 'all':
            listItem.style.display = 'block';
            all.classList.add('activecolor'); 
            completed.classList.remove('activecolor'); 
            active.classList.remove('activecolor');
  
            break;
      }
    
   // Save the active filter state to localStorage
  localStorage.setItem('activeFilter', filter);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const activeFilter = localStorage.getItem('activeFilter');

  switch (activeFilter) {
    case 'all':
      all.classList.add('activecolor');
      completed.classList.remove('activecolor');
      active.classList.remove('activecolor');
      break;
    case 'completed':
      all.classList.remove('activecolor');
      completed.classList.add('activecolor');
      active.classList.remove('activecolor');
      break;
    case 'active':
      all.classList.remove('activecolor');
      completed.classList.remove('activecolor');
      active.classList.add('activecolor');
      break;
  }
});


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
        sall.classList.add('activecolor'); 
        scompleted.classList.remove('activecolor'); 
        sactive.classList.remove('activecolor'); 
        break;
      case 'completed':
        if (listItem.classList.contains('checked')) {
          listItem.style.display = 'block';
          sall.classList.remove('activecolor'); 
          scompleted.classList.add('activecolor'); 
          sactive.classList.remove('activecolor'); 
          
        } else {
          listItem.style.display = 'none';
        }
        break;
      case 'active':
        sall.classList.remove('activecolor'); 
        scompleted.classList.remove('activecolor');
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

draggablesArray.forEach(draggable=>{
draggable.draggable=true;
})
draggablesArray.forEach(draggable=>{
  draggable.addEventListener('dragstart', ()=>{
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
  
