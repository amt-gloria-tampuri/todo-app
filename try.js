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

  // Load the active filter from localStorage (if exists)
  const activeFilter = localStorage.getItem('activeFilter') || 'all';
  filterList(activeFilter);

  inputBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const task = inputBox.value.trim();
        if (task !== '') {
          addTaskToList(task);
          inputBox.value = '';
          saveData();
        }
    }
  });

  // Toggle between all, active, and completed filters
  all.addEventListener('click', () => filterList('all'));
  active.addEventListener('click', () => filterList('active'));
  completed.addEventListener('click', () => filterList('completed'));

  function addTaskToList(task) {
    const li = document.createElement('li');
        li.textContent = task;
        listContainer.appendChild(li);

        // Add event listener to toggle the 'checked' class on click
        li.addEventListener('click', () => {
          li.classList.toggle('checked');
          saveData();
        });
  }



 // Function to filter the list based on the selected filter
 function filterList(filter) {
    const listItems = listContainer.children;
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      switch (filter) {
        case 'completed':
          listItem.style.display = listItem.classList.contains('checked') ? 'block' : 'none';
          break;
        case 'active':
          listItem.style.display = listItem.classList.contains('checked') ? 'none' : 'block';
          break;
        case 'all':
          listItem.style.display = 'block';
          break;
      }
    }
    // Update the active filter state in localStorage
    localStorage.setItem('activeFilter', filter);
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

   // Function to save the tasks data to localStorage
   function saveData() {
    const tasks = [];
    const listItems = listContainer.children;
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      tasks.push({
        task: listItem.textContent,
        checked: listItem.classList.contains('checked'),
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from localStorage on page load
  function loadData() {
    const data = localStorage.getItem('tasks');
    if (data) {
      const tasks = JSON.parse(data);
      tasks.forEach((task) => {
        addTaskToList(task.task);
        if (task.checked) {
          const li = listContainer.lastChild;
          li.classList.add('checked');
        }
      });
    }
  }

  loadData();

  //show summary and sort buttons
if(listContainer.childElementCount>=1){
    filterDiv.style.display="flex"
    extra.style.display='block'
  }
  if (mediaQuery.matches && listContainer.childElementCount>=1){
      mobileSort.classList.add('.sortOnMobile')
      // mobileSort.style.display='flex' 
  }

  const showNumberOftask=()=>{
    // let number = listContainer.childElementCount
   
   const itemsLeft=document.querySelectorAll('li:not(.checked)')
   const num = itemsLeft.length

    const item = num===1?'item':'items'

    taskCount.textContent=(`${num} ${item} left`)
}
showNumberOftask()