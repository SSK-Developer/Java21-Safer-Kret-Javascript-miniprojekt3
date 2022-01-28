//Hämtar button från html-filen och lagrar i en variabel
const btn = document.querySelector("button");

//skapar en everntlistener med click function, här hämtar jag användarens input value till sökresultatet och för att bygga URL.
btn.addEventListener("click", function (event) {
    clearImages();
    const input = document.querySelector("input");
    const KEY = '92dba6f72da7a64852c838f608c1a577';
    let searchText = input.value;

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1&sort=relevance`;

    fetch(url).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            getImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function (error) {
            alert("There is no result with the specified search \n try again with a new word!");
        }
    );
})

//funktion för att sätta ihop URL till img
function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    displayImg(imgUrl);
}

//funktion för att display bilden på sidan
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

//funktion för att rensa alla tidigare bilder.
function clearImages(){
    const images = document.querySelectorAll('img');
    
    for(const img of images){
        img.remove();
    }
}