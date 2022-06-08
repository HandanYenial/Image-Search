//we access the input box by getELementById and give it a name as input
const input = document.getElementById("input");
//for the search result image container witht he class name grid
const grid = document.getElementsByClassName("grid")[0];

window.addEventListener('load' , dayNightMode); //as soon as you open up the page it will load

//adding an eventListenerso the user can clcik on the enter key
input.addEventListener("keydown" , function(event){ //will be activated on keydown
    if(event.key == "Enter") //if statement to check if the user hits the Enter
       loadImg(); //if the user hit the enter key tan run loadImage function
});

function loadImg(){ 
    removeImages(); //so it will clean the page before the new search
    //first we need to make the url to make  request to
    const url = "https://api.unsplash.com/search/photos/?query="+input.value+"&per_page=15&client_id=AG2HqRzOn_PCqBxh3Yrf30iPsYx2T5OcN3KsWMxpEJs";

    //we'll make a request to this url by using fetch
    fetch(url)
    .then(response =>{
        //console.log(response) //--ok:true
        if(response.ok) //will check if the response is true
           return response.json(); //then will return data from the request
        else
           alert(response.status)//this will tell us why our request was unsuccessful
    })
    //we'll create another promise which will return the data
    .then(data => {
        //to display the data on the screen
        //first we'll retrieve it and place it in array called imageNodes
        const imageNodes = [];
        //then we'll use a for loop to go through the data
        for(let i=0 ; i < data.results.length; i++){
        imageNodes[i] = document.createElement('div');
        imageNodes[i].className = 'img';
        imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
        imageNodes[i].addEventListener('click' , function(){
            window.open(data.results[i].links.download,'_blank');
        })
        grid.appendChild(imageNodes[i]);
        }
    });
}

//we'll write a function to remove images from the screen
function removeImages(){
    grid.textContent = "";
}

//this function is to check if it is day or night. If it is day, we'll use day theme if it is night
//we'll use night theme.
function dayNightMode(){
    const date = new Date(); //we start by getting the date by getting the date class.
    const hour = date.getHours(); //getHours is a built in function
    //Javascript Date getHours() method returns the hour in the specified date according to 
    //local time. The value returned by getHours() is an integer between 0 and 23.

    //we'll check if the hour is between 7am-7pm
    if(hour >=7 && hour<=19){
        document.body.style.backgroundColor = "white"; //if the hour is btw 7-19change background color to white
        document.body.style.color = "black"; //and text color to black
    }
    else{
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
}
