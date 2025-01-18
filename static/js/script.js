const cities = ["Madrid", "Barcelona", "Lisbon", "Nice", "Marseille", "Venice", "Rome", "Napoli"];

const addcitydiv = document.getElementById("addcitydiv");
const textdiv = document.getElementById("textdiv");
const yourcity = document.getElementById("yourcity");
const linkdiv = document.getElementById("linkdiv");

yourcity.addEventListener("input", listreader);

function listreader(){
    const text = yourcity.value.toLowerCase().trim();
    const listbox = document.getElementById("listbox");
    listbox.innerHTML = ""; //clears the odd items as you type

    const mcities = cities.filter(city => city.toLowerCase().startsWith(text));

    mcities.forEach(cityy => {
        const opt = document.createElement("option");
        opt.value = cityy; 
        listbox.appendChild(opt);
    });

}

let imgdisplay = false;

function linkremover(){
    // linkdiv = document.getElementById("linkdiv");
    const links = linkdiv.querySelectorAll("div > a[dy='true']");

    if(links.length){
        const parentn = links[links.length-1].parentNode;
        linkdiv.removeChild(parentn);

    }
}


document.querySelectorAll("#linkdiv > a").forEach(a => {
    a.onclick = function(){
        if(!imgdisplay){
            obtweather(this.textContent.trim());
        }
    }});


document.getElementById("cl").onclick = function(){
    if(addcitydiv.classList.contains("see")){
        addcitydiv.classList.remove("see");
    }
    else{
        addcitydiv.classList.add("see");
    }
};

let imgremovelinkf = function(imgremovelink, imgyourcity){
        if(imgdisplay){
            alert("Weather data are being fetched");
            return;
        }

        linkremover();


        const cl = linkdiv.querySelector("img[id='cl']");
        const tldiv = linkdiv.querySelectorAll("div > a[dy='true']");

        if(!cl && !(tldiv.length)){
            imgyourcity.setAttribute("id", "cl");
            linkdiv.appendChild(imgyourcity);
            return;
        }
    


        // #these lines are just for removing a br
    
        
        const parentn = tldiv[tldiv.length-1].parentNode
        parentn.removeChild(parentn.querySelector("br"));

        parentn.appendChild(imgremovelink);
        parentn.appendChild(imgyourcity);
    };



async function addcity(){
    const text = yourcity.value.trim();

    const links = Array.from(linkdiv.querySelectorAll("a"));

    if (!text) {
        alert("No text is entered");
        return;
    }

    else if (imgdisplay) {
        alert("Weather data are being fetched");
        return;
    }

    addcitydiv.classList.remove("see");

    if (links.some(link => link.textContent.trim().toLowerCase() === text.toLowerCase())) {
        alert("The city already has been added");

        yourcity.value = "";
        addcitydiv.classList.add("see");
        return;
    }


    const linkclass = document.createElement("a");
    linkclass.href="#";
    linkclass.textContent = text;
    linkclass.setAttribute("dy", "true");
    linkclass.onclick = function() {
        if (!imgdisplay) {
            obtweather(this.textContent);
        }
    };

    //linkdiv = document.getElementById("linkdiv");


    const cl = linkdiv.querySelector("img[id='cl']");
    if(cl){
        linkdiv.removeChild(cl);
    }

    const imgyourcity = document.createElement("img");
    imgyourcity.src = "/static/images/add.png";
    imgyourcity.width = 16;
    imgyourcity.onclick = function() {
        if(addcitydiv.classList.contains("see")){
            addcitydiv.classList.remove("see");
        }
        else{
            addcitydiv.classList.add("see");
        }
    };




    const imgremovelink = document.createElement("img");
    imgremovelink.src = "/static/images/remove.png";
    imgremovelink.width = 16;
    imgremovelink.onclick = function(){
        imgremovelinkf(imgremovelink, imgyourcity);

        
    };




    //trying to delete all previous images

    linkdiv.querySelectorAll("div img").forEach(img => img.remove());

    const alldiv = document.createElement("div");
    alldiv.appendChild(linkclass);
    alldiv.appendChild(imgremovelink);
    alldiv.appendChild(imgyourcity);
    alldiv.appendChild(document.createElement("br"));

    linkdiv.appendChild(alldiv);


    yourcity.value = "";

    try{
        await obtweather(text);
    }
    catch(error){
        imgremovelinkf(imgremovelink, imgyourcity);
    }
}


async function obtweather(city) {

    imgdisplay = true;

    if (!city) {
        alert("Enter the city please");
        imgdisplay = false;
        return;
    }

    try{

        const response = await fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"city": city})
        });

        const data = await response.json();

        if (data.Error) {
            console.log("Error", data.Error);
            alert(data.Error);
            throw new Error("Error while fetching the data");

        }
        else if (data.weather) {
            textdiv.innerText = `${city}: ${data.weather.weather}`;

            if(data.weather.path.split(" ").length === 2){
                textdiv.innerHTML += `<br/> No image to display`;

                await showimg();

            }
            else{
                await showimg(data.weather.path);
            }
        }
    }
    catch(error){
        alert(error);
        throw error;
    }
    finally{
        imgdisplay = false;
    }
}                             

function delay(s){
    return new Promise(resolve => setTimeout(resolve,s));
}


async function showimg(path) {
    
    imgdisplay = true;

    if(!path){
        textdiv.classList.add("see");
        await delay(5000);
        textdiv.classList.remove("see");
        
        imgdisplay = false;
        return;
    }

    let img = document.createElement("img");
    img.src = path;
    img.width = 128;

    const imgdiv = document.getElementById("imgdiv");

    imgdiv.innerHTML = "";
    imgdiv.appendChild(img);

    imgdiv.classList.add("see");
    textdiv.classList.add("see");

    await delay(2000);

    imgdiv.classList.remove("see");
    textdiv.classList.remove("see");

    imgdisplay = false;  

    img = null;

}


