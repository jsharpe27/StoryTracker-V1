import { storiesArray } from './data.js'



const loginBtnEl = document.getElementById('login-btn')
const loginModalEl = document.getElementById('login-modal')
const loginModalClose = document.getElementById('close')

const cardsEl = document.getElementById('cards')

const addStoryBtn = document.getElementById('add-story')
const addStoryModal = document.getElementById('add-Story-Modal')
const newTitleField = document.getElementById('new-title')
const newWordCountField = document.getElementById('new-word-count')
const newSubCountField = document.getElementById('new-sub-count')
const addNewStoryBtn = document.getElementById('add-new-story')


/* event listeners */

loginBtnEl.addEventListener('click', function(){
    loginModalEl.classList.remove('hidden')
})

loginModalClose.addEventListener('click', function(){
    loginModalEl.classList.add('hidden')
})

addStoryBtn.addEventListener('click', function(){
    addStoryModal.classList.remove('hidden')
})


/* add new story listener and function */

addNewStoryBtn.addEventListener('click', function addNewStory(){

    if (newTitleField.value && newWordCountField.value && newSubCountField.value ){
    
        let newStoryArray = []
        newStoryArray.push(storiesArray.length)
        newStoryArray.push(newTitleField.value)
        newStoryArray.push(newWordCountField.value)
        newStoryArray.push(false)
        newStoryArray.push(newSubCountField.value)
        
        let newStoryObj = {...newStoryArray}

        const newkeys = { 0: "id", 1: "title", 2: "wordCount", 3:"isSubmitted", 4:"totalSubCount"};
        const renamedNewStoryObj = renameKeys(newStoryObj,newkeys)
        

        storiesArray.push(renamedNewStoryObj)
        render()  
        addStoryModal.classList.add('hidden')

        newTitleField.value = ''
        newWordCountField.value = ''
        newSubCountField.value = ''
    }
    else {
        alert('please fill every field')
    }
})


/* function that renames my keys */

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }







/* render current stories from data file */

function getStoriesHtml(){
    let storiesHtml = ''

    storiesArray.forEach(function(story){

        storiesHtml += `
        <div class="story-card">
            <h3>Title: ${story.title}</h3>
            <h4>Wordcount: ${story.wordCount} words</h4>
            <p>Submission count: ${story.totalSubCount}</p>
        </div>
        `


    })
    return storiesHtml
}


function render(){
    cardsEl.innerHTML = getStoriesHtml()
}

render()