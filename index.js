import { storiesArray } from './data.js'



const loginBtnEl = document.getElementById('login-btn')
const loginModalEl = document.getElementById('login-modal')
const loginModalClose = document.getElementById('close')

const cardsEl = document.getElementById('cards')

const addStoryBtn = document.getElementById('add-story')
const addStoryModal = document.getElementById('add-Story-Modal')
const addStoryCloseModalBtn = document.getElementById('close-add-Story-Modal')
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

    addStoryCloseModalBtn.addEventListener('click', function(){
        addStoryModal.classList.add('hidden')
    }) 

   
    
        storiesArray.push(
                {
                    id: storiesArray.length,
                    title: newTitleField.value,
                    wordCount: newWordCountField.value,
                    isSubmitted: false,
                    totalSubCount: newSubCountField.value
                })
        render()  
        addStoryModal.classList.add('hidden')

        newTitleField.value = ''
        newWordCountField.value = ''
        newSubCountField.value = ''
    })

 








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