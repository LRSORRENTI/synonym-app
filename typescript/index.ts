const wordSearchForm = document.getElementById('word-search-form');
const copyBtn = document.getElementById('copy-btn');
const wordAppBody = document.querySelector('.word-app-body');
const wordListContainer = document.getElementById('word-list');
const loadingSpinner = document.getElementById('spinner');

let wordsNotFound: boolean = true;


const getInputWord = () => {
    wordSearchForm?.addEventListener('submit', (evt) => {
        evt.preventDefault();
        let searchWord = wordSearchForm.search_word.value;
        fetchSynWords(searchWord);
    })
}

getInputWord()

const fetchSynWords = async(searchWord: string) => {
    console.log(searchWord)
    let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`
    try {
        loadingSpinner!.style.display = "flex";
        let res = await fetch(url);
        let 
    }
}