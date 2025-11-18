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
    cardArray.forEach(function (cardElem) {
        cardOutput += `
            <div class="col">
                    <div class="card">
                        <div class="card-image"><img src="${cardElem.url}" />
                            <figcaption>${cardElem.date}<br> <span class="text-title-card"><strong>${cardElem.title}</strong></span></figcaption>
                            <span class="pin"><img src="../img/pin.svg" />
                        </div>
                    </div>
                </div>
            `
        console.log(cardElem.url);
    });
    cardPrint.innerHTML = cardOutput;
}
