"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const wordSearchForm = document.getElementById('word-search-form');
;
const copyBtn = document.getElementById('copy-btn');
const wordAppBody = document.querySelector('.word-app-body');
const wordListContainer = document.getElementById('word-list');
const loadingSpinner = document.getElementById('spinner');
let wordsNotFound = true;
const getInputWord = () => {
    wordSearchForm === null || wordSearchForm === void 0 ? void 0 : wordSearchForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        let searchWord = wordSearchForm.search_word.value;
        fetchSynWords(searchWord);
        wordAppBody.style.display = "none";
    });
};
getInputWord();
const fetchSynWords = (searchWord) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(searchWord);
    let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
    try {
        // Show the loading spinner
        loadingSpinner.style.display = "flex";
        // Set a minimum display time for the loading spinner (e.g., 500 milliseconds)
        yield new Promise(resolve => setTimeout(resolve, 500));
        let res = yield fetch(url);
        let fetchedData = yield res.json();
        // Hide the loading spinner
        loadingSpinner.style.display = "none";
        // console.log(fetchedData);
        renderWords(fetchedData);
    }
    catch (err) {
        console.log(err);
        console.error(err);
        // Ensure the loading spinner is hidden in case of error as well
        loadingSpinner.style.display = "none";
    }
});
const renderWords = (wordsArr) => {
    let htmlCode;
    if (wordsArr.length > 0) {
        wordsNotFound = false;
        htmlCode = wordsArr.map(word => {
            return `<span class="word-item">${word.word}</span>`;
        });
        wordListContainer.innerHTML = htmlCode.join("");
    }
    else {
        wordsNotFound = true;
        htmlCode = "no results found";
        wordListContainer.innerHTML = htmlCode;
    }
    wordAppBody.style.display = "block";
};
const copyWordList = () => {
    if (!wordsNotFound) {
        // This will get all the span elements with the class 'word-item', ensuring only the text content of those elements is copied.
        let wordItems = wordListContainer.querySelectorAll('.word-item');
        let words = Array.from(wordItems).map(item => item.textContent.trim());
        let wordToCopy = words.join(", ");
        navigator.clipboard.writeText(wordToCopy).then(() => {
            console.log('Words copied to clipboard successfully.');
        }, err => {
            console.error('Could not copy words to clipboard: ', err);
        });
    }
    else {
        console.log("Nothing to copy");
    }
};
copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.addEventListener('click', copyWordList);
