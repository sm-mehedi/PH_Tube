const loadData = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => showData(data.categories))
    .catch(err=>console.error('error',err));
}

const showData = (data)=>{
console.log(data);

}
loadData();