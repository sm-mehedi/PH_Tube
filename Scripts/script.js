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

const loadVideos = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => showVideo(data.videos))
    .catch(err=>console.error('error',err));
}

const showVideo = (data) =>{
    const video = document.getElementById('videoSection');
    data.forEach((element)=>{
        const card = document.createElement("div");
        card.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "transition-transform", "duration-300", "hover:scale-105", "m-4"); 
        card.innerHTML=`
    <figure class=" h-2/4">

    <img
      src="${element.thumbnail}"
      alt="Shoes" 
      class="h-full w-full object-cover"
      />
  </figure">
  <div class="px-0 py-5 flex gap-2">
 <div>
 <img class="w-10 rounded-full h-10 ml-3 mt-2 object-cover"src=${element.authors[0].profile_picture}>
 </div>
 <div>
 <h2 class="font-bold text-xl ml-2">${element.title} </h2>
 <div class="flex gap-2 ml-2">

 <h3>
 ${element.authors[0].profile_name}
 </h3>
 <img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=p9jKUHLk5ejE&format=png">
 </div>
 </div>
     
  </div>
        
        `
        video.append(card);

    })
   

}
loadData();
loadVideos();