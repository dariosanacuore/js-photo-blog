const cardPrint = document.getElementById("card-container");

axios.get("https://lanciweb.github.io/demo/api/pictures/")
    .then((resp) => {
        const cardArray = resp.data;
        console.log(cardArray);
        let cardOutput = "";
        cardArray.forEach(function (cardElem) {
            cardOutput += `
            <div class="col">
                    <div class="card">
                        <div class="card-image"><img src="${cardElem.url}" />
                            <figcaption>${cardElem.date}<br> ${cardElem.title}</figcaption>
                        </div>
                    </div>
                </div>
            `
            console.log(cardElem.url);
        });
        cardPrint.innerHTML = cardOutput;


    });