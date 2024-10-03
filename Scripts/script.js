function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => showVideo(data.category))
        .catch(err => console.error('error', err));
}

const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showData(data.categories))
        .catch(err => console.error('error', err));
}

const showData = (data) => {
    const categories = document.getElementById('displayCategory');
    data.forEach((element) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button class="button-container youtube-category-button" onclick="loadCategoryVideos('${element.category_id}')">
                ${element.category}
            </button>
        `;
        categories.append(buttonContainer);
    });
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => showVideo(data.videos))
        .catch(err => console.error('error', err));
}

const loadDetails = async (videoId) => {
    try {
        console.log(videoId);
        const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
        const res = await fetch(url);
        const data = await res.json();
        displayDetails(data.video);
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById('modal-content');
    document.getElementById("showModalData").click(); // This simulates opening the modal
    detailContainer.innerHTML = `
        <img src="${video.thumbnail}" alt="Thumbnail" class="w-full">
        <p>${video.description}</p>
    `;
};

const showVideo = (data) => {
    const video = document.getElementById('videoSection');
    video.classList.remove("grid");
    video.innerHTML = "";
    if (data.length === 0) {
        video.innerHTML = `
        <div class="min-h-[600px] flex flex-col justify-center items-center">
            <img src="images/Icon.png">
            <h2>No Content Here</h2>
        </div>`;
        return;
    } else {
        video.classList.add("grid");
    }

    data.forEach((element) => {
        const card = document.createElement("div");
        card.classList.add("bg-white", "rounded-lg", "shadow-lg", "overflow-hidden", "transition-transform", "duration-300", "hover:scale-105", "m-4");
        card.innerHTML = `
        <figure class="h-2/4 relative">
            <img src="${element.thumbnail}" alt="Thumbnail" class="h-full w-full object-cover" />
            ${element.others.posted_date?.length === 0 ? "" : `
                <span class="absolute right-1 bottom-2 bg-black rounded-lg text-white p-1">
                    ${getTimeString(element.others.posted_date)}
                </span>`}
        </figure>
        <div class="px-0 py-5 flex gap-2">
            <div>
                <img class="w-10 rounded-full h-10 ml-3 mt-2 object-cover" src="${element.authors[0].profile_picture}">
            </div>
            <div>
                <h2 class="font-bold text-xl ml-2">${element.title}</h2>
                <div class="flex gap-2 ml-2">
                    <h3>${element.authors[0].profile_name}</h3>
                    ${element.authors[0].verified === true ? `
                        <img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=p9jKUHLk5ejE&format=png">
                    ` : ""}
                </div>
                <p>
                <button onclick="loadDetails('${element.videoId}')" class="btn btn-sm btn-error">
                  Details
                </button>
                </p>
            </div>
        </div>`;
        video.append(card);
    });
}


loadData();
loadVideos();
