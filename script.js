let btnOfXhr=document.getElementById("searchbtn")
let btnOfFetch=document.getElementById("searchFetchPromise")
let btnOfasync=document.getElementById("searchFetchAsyncAwait")
let input = document.getElementsByTagName("input")[0]
let searchResults = document.getElementById("searchResults")


const apikey = "xHlqKHmZp1fVGiFIyALdsFbIvQCuFmkt";
btnOfXhr.addEventListener("click",function (){
   let q = input.value
   getImagesUsingXHR(q)

})

btnOfFetch.addEventListener("click",function(){
let q =input.value
getImagesUsingFetch(q)

})
btnOfasync.addEventListener("click",function(){
    let q =input.value
    getImagesUsingasync(q)
    
})

function getImagesUsingXHR(q){

    let images = [];
    //send a http get using api
    let xhr = new XMLHttpRequest();
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState=== 4 && xhr.status ===200){
    let respText = xhr.responseText;
    let respOBJ = JSON.parse(respText)
    
    
    for(let item of respOBJ.data){
        images.push(item.images.downsized_medium.url)
    }
    generateImgElements(images)

}
    }
    
    
    xhr.open("GET",url,true)
    xhr.send();

}
async function  getImagesUsingasync(q){
    images=[];
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;
    let response = await  fetch(url)
    let responseOBJ = await response.json()

    for(let item of responseOBJ.data){
        images.push(item.images.downsized_medium.url)
    }
    generateImgElements(images)

}

//fetch with promises
function getImagesUsingFetch(q){
   
   images=[];
    let url = "https://api.giphy.com/v1/gifs/search?api_key="+apikey+"&q="+q;


    fetch(url)
    .then((response)=>{
      return  response.json();
    })
    .then((respOBJ)=>{
        for(let item of respOBJ.data){
            images.push(item.images.downsized_medium.url)
        }
        generateImgElements(images)


    })
    .catch((e)=>{
        console.log("error",e)
    })
}


function generateImgElements(imageURLS){
   for(let imageUrl of imageURLS){
        let imgElement = document.createElement("img")
        imgElement.src=imageUrl
        searchResults.appendChild(imgElement)
}}

