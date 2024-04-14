const wordSearchForm = document.getElementById('word-search-form');
const copyBtn = document.getElementById('copy-btn');
const wordAppBody: HTMLElement | null = document.querySelector('.word-app-body');
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
        let fetchedData = await res.json();
        loadingSpinner!.style.display = "none";
        // console.log(fetchedData);
        renderWords(fetchedData)
    }
    catch(err) {
        console.log(err)
        console.error(err)
    }
}

const renderWords = (wordsArr: string[] | string) => {
    let htmlCode;
    if(wordsArr.length > 0) {
        wordsNotFound = false;
        htmlCode = wordsArr.map(word => {
            return `<span class="word-item">${word.word}</span>`;
        });
        wordListContainer!.innerHTML! = htmlCode.join("");
    } else {
        htmlCode = "no results found"
        wordListContainer!.innerHTML! = htmlCode;
    }
    wordAppBody!.style.display = "block";
}