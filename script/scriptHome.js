const catagories = document.querySelector('.catagories'),
  lists = document.querySelector('.catagory_lists'),
  items = lists.querySelectorAll('li'),
  currentItem = catagories.querySelector('p');


  

catagories.addEventListener('click', ()=>{
  lists.classList.toggle('active');
});

items.forEach(item =>{
  item.addEventListener('click', ()=>{
    currentItem.innerText = item.innerText;
  })
})