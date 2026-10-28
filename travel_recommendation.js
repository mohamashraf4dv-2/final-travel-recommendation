const getTravelRelatedDetails = async ()=>{
 const dataInJSON = await fetch("travel_recommendation_api.json");
const data = await dataInJSON.json();
console.log(data);
return data;
}

const getCities = async ()=>{
    const data = await getTravelRelatedDetails();
    const cities = data.map(d=> {
    return d.cities
    }
)
return cities
}

const searchKeyWords = async(word)=>{
    const data = await getTravelRelatedDetails();
    const beachOptions = ["beach","Beaches","BEACH"]
    const templeOptions = ["temple","Temples","TEMPLES"]
    const countryOptions = ["country","Countries","COUNTRIES"]
    if(beachOptions.includes(word))
        return data.beaches
    else if(templeOptions.includes(word))
        return data.temples
    else if(countryOptions.includes(word))
        return data.countries

        return [];
}
const searchResultElementContainer = document.getElementById("searchResult");
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const resetBtn = document.getElementById("resetBtn");

const setResults = (result)=>{
    searchResultElementContainer.innerHTML= result.map(e=>`
    <div>
    <img src=${e.imageUrl} >  
    <h3>${e.name}</h3>
    <p>${e.description}</p>
</div>
`).join('')
}
const clear = ()=>{
    searchResultElementContainer.innerHTML="";
}
searchBtn.addEventListener("click", async()=>{

let data = await searchKeyWords(searchBar.value)
searchResultElementContainer.innerText= data;

if(data.length==0){
    searchResultElementContainer.innerText= '0 results found';
return
}
     setResults(data);   
})
resetBtn.addEventListener("click", clear)