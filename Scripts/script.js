const loadData = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => showData(data.categories))
    .catch(err=>console.error('error',err));
}

const showData = (data)=>{
    const categories = document.getElementById('displayCategory')
    data.forEach((element) => {
     const button = document.createElement("button");
     button.classList.add("button-container", "youtube-category-button", "youtube-category-button:hover", "youtube-category-button:focus");
     button.innerText=element.category;
     categories.append(button);
      
        
    });


}
loadData();