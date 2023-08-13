'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuote = void 0;

var getQuote = function getQuote() {
  var quoteElement, authorElement, fetchedData, fetchedDataJSON, randomNumber, randomQuote, quote, author, afterComma, cleanedAuthorString;
  return regeneratorRuntime.async(function getQuote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          quoteElement = document.querySelector('.quote');
          authorElement = document.querySelector('.author');
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://type.fit/api/quotes"));

        case 4:
          fetchedData = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(fetchedData.json());

        case 7:
          fetchedDataJSON = _context.sent;
          randomNumber = Math.floor(Math.random() * 16);
          randomQuote = fetchedDataJSON[randomNumber];
          quote = randomQuote.text;
          author = randomQuote.author;
          afterComma = false;
          cleanedAuthorString = author.split('').reduce(function (result, element) {
            if (element === ',') {
              afterComma = true;
            }

            if (afterComma === false) {
              return result + element;
            } else if (afterComma === true) {
              return result;
            }
          });
          quoteElement.textContent = "\"".concat(quote, "\"");
          authorElement.textContent = "~ ".concat(cleanedAuthorString);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getQuote = getQuote;