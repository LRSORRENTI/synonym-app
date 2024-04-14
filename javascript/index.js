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
    });
};
getInputWord();
const fetchSynWords = (searchWord) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(searchWord);
    let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
    try {
        loadingSpinner.style.display = "flex";
        let res = yield fetch(url);
        let fetchedData = yield res.json();
        loadingSpinner.style.display = "none";
        // console.log(fetchedData);
        renderWords(fetchedData);
    }
    catch (err) {
        console.log(err);
        console.error(err);
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
        htmlCode = "no results found";
        wordListContainer.innerHTML = htmlCode;
    }
    wordAppBody.style.display = "block";
};
