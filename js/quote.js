'use strict'



export const getQuote = async () => {
    const quoteElement = document.querySelector('.quote');
    const authorElement = document.querySelector('.author')
    const fetchedData = await fetch("https://type.fit/api/quotes");
    const fetchedDataJSON = await fetchedData.json();
    const randomNumber = Math.floor(Math.random() * 16);
    const randomQuote = fetchedDataJSON[randomNumber]
    const quote = randomQuote.text;
    const author = randomQuote.author;
    let afterComma = false;
    const cleanedAuthorString = author.split('').reduce((result, element) => {
        if (element === ',') {
            afterComma = true;
        }
        if (afterComma === false) {
            return result + element;
        } else if (afterComma === true) {
            return result
        }
    })
    quoteElement.textContent = `"${quote}"`;
    authorElement.textContent = `~ ${cleanedAuthorString}`;
}