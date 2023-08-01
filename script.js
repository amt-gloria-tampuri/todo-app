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



// remove  task my clicking close icon
listContainer.onclick=(e)=>{
   
     if(e.target.tagName=== 'IMG'){
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





document.addEventListener('DOMContentLoaded', () => {
 
  const listItems = document.querySelectorAll('#list-container li');
  
  // Load the active filter state from localStorage or set to 'all' by default
  let activeFilter = localStorage.getItem('activeFilter') || 'all';
  updateFilter(activeFilter);


  const allElements = document.querySelectorAll('.all');
allElements.forEach((all) =>
all.addEventListener('click', () => {
  activeFilter = 'all';
  updateFilter(activeFilter);
  location.reload()

}))

const completedElements = document.querySelectorAll('.completed');
completedElements.forEach((completed) =>
  completed.addEventListener('click', () => {
    activeFilter = 'completed';
    updateFilter(activeFilter);
    location.reload()

  })
);

const activeElements =document.querySelectorAll('.active')
activeElements.forEach((active)=>
active.addEventListener('click', () => {
  activeFilter = 'active';
    updateFilter(activeFilter);
    location.reload()

}))


//display items by filter
  function updateFilter(filter) {
    
    listItems.forEach((listItem) => {
      switch (filter) {
        case 'all':
          listItem.style.display = 'block';
          all.classList.add('activecolor');
          completed.classList.remove('activecolor');
          active.classList.remove('activecolor');
          break;
        case 'active':
          if (!listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
          } else {
            listItem.style.display = 'none';
          }
          active.classList.add('activecolor');
      all.classList.remove('activecolor');
      completed.classList.remove('activecolor');
          
          break;
        case 'completed':
          if (listItem.classList.contains('checked')) {
            listItem.style.display = 'block';
          } else {
            listItem.style.display = 'none';
          }
          completed.classList.add('activecolor');
          all.classList.remove('activecolor');
          active.classList.remove('activecolor');
          break;
      }
    });

    // Update the active filter state in localStorage
    localStorage.setItem('activeFilter', filter);
  }

  // Add event listener for list items by the filter
  listItems.forEach((listItem) => {
    listItem.addEventListener('click', () => {
      if (activeFilter === 'all') {
        // Toggle the 'checked' class on click in 'all' filter
        listItem.classList.toggle('checked');

      } else if (activeFilter === 'active') {
        // Add 'checked' class on click in 'active' filter
        listItem.classList.add('checked');
      } else if (activeFilter === 'completed') {
        // Remove the list item on click in 'completed' filter
        listItem.classList.remove('checked');
      }
  location.reload()

      saveData();
    });
  });

 saveData() 
});





//_______________________________________________________________________________________________________  
//Drag and drop
//to get all li elements
const draggables=document.getElementsByTagName('li')

//to put all li elements in an array
const draggablesArray = Array.from(draggables);

//when we start dragging a li
draggablesArray.forEach(draggable=>{
  draggable.addEventListener('dragstart', ()=>{
    //when the drag starts we add the dragging class.to make it visible
    draggable.classList.add('dragging')
  })
  //remove the dragging class when the drag stops
  draggable.addEventListener('dragend',()=>{
    draggable.classList.remove('dragging')
  })
})



// function to show where(the position) of the drag element
function getDragAfterElement(container, y) {

  //selecting elements that can be dragged.
  const draggableElements = [...container.querySelectorAll(':not(.dragging)')];


  //loop through the list of elements that are draggable and determine which single element which is directly after our mouse cursor position that we pass in.y=position of our mouse cursor.
  return draggableElements.reduce((closest, child) => {

    //child is each element which is draggable
    //closest is the element we are closest to after our mouse cursor
    
    //box is the bounding box of each elements. shows positions of each elementt on the screen
    const box = child.getBoundingClientRect();
      console.log(box);
    //getting the center of the box
    //if offset is negative shows we are hovering above the element. if its positive we are hovering below
    //getting center of our box
    const offset = y - box.top - box.height / 2;

/// Here, we are looking for elements that less than negative and finding the onwwhich closest to offset
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element; //this makes sure our initial offset has the greatest negative number
}
  

// 
//function used when we are dragging an element within the list container
listContainer.addEventListener('dragover', (e) => {
  e.preventDefault(); //allows dropping the element
  //selecting the element which is currently being dragged. it has the dragging class.
  const draggable = document.querySelector('.dragging');

  //getting the y position of our cursor from the event.(e.clientY is the position of the cursor on our screen)
  const afterElement = getDragAfterElement(listContainer, e.clientY);

  if (afterElement && listContainer.contains(afterElement)) {
    listContainer.insertBefore(draggable, afterElement);
  } else {
    listContainer.appendChild(draggable);
  }
});

