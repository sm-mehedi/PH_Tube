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
        <figure>
    <img
      src="${element.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
        
        `
        video.append(card);

    })
   

}
loadData();
loadVideos();