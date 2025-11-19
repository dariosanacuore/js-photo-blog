const cardPrint = document.getElementById("card-container");
//Progress bar
const barContainer = document.querySelector(".bar");
const progressBar = document.querySelector(".progress-bar");
let progress = 0;
let intervalId = null;
function startProgressBar() {
    if (intervalId === null) {
        intervalId = setInterval(function () {
            if (progress === 100) {
                clearInterval(intervalId);
                progress = 0;
                intervalId = null;
                barContainer.style.display = "none";
                //stampa cards
                axios.get("https://lanciweb.github.io/demo/api/pictures/")
                    .then((resp) => {
                        const cardArray = resp.data;
                        console.log(cardArray);
                        cardsPrint(cardArray);


                    });
            } else {
                progress++;
                progressBar.style.width = progress + "%";
                progressBar.innerHTML = progress + "%";
            }
        }, 50);
    }
}
startProgressBar();

function cardsPrint(cardArray) {
    let cardOutput = "";
    cardPrint.innerHTML = "";
    cardArray.forEach(function (cardElem) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("card-image");

        const img = document.createElement("img");
        img.src = cardElem.url;
        img.alt = cardElem.title;
        //Button overlay
        const overlayContainer = document.querySelector(".overlay-container");
        const overlayContent = document.querySelector(".overlay-content");
        const btnClose = document.querySelector(".btn-close");
        img.addEventListener("click", function () {
            overlayContainer.style.display = "flex";
            overlayContent.style.display = "inline-block";
            btnClose.style.display = "inline-block";
        });

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `${cardElem.date}<br><span class="text-title-card"><strong>${cardElem.title}</strong></span>`;

        const pinSpan = document.createElement("span");
        pinSpan.classList.add("pin");
        const pinImg = document.createElement("img");
        pinImg.src = "../img/pin.svg";
        pinImg.alt = "pin";
        pinSpan.appendChild(pinImg);

        imageDiv.appendChild(img);
        imageDiv.appendChild(figcaption);
        imageDiv.appendChild(pinSpan);

        cardDiv.appendChild(imageDiv);
        colDiv.appendChild(cardDiv);

        cardPrint.appendChild(colDiv);
        //cardOutput += `
        //<div class="col">
        // <div class="card">
        //<div class="card-image"><img src="${cardElem.url}" />
        //<figcaption>${cardElem.date}<br> <span class="text-title-card"><strong>${cardElem.title}</strong></span></figcaption>
        //<span class="pin"><img src="../img/pin.svg" />
        //</div>
        //</div>
        //</div>
        //`
        //console.log(cardElem.url);
    });
    //cardPrint.innerHTML = cardOutput;
}


