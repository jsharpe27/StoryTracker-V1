//setting up Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shortstorytracker-v1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const storiesInDB = ref(database, "stories")


const cardsEl = document.getElementById('cards')
const addStoryBtn = document.getElementById('add-story')
const addStoryModal = document.getElementById('add-Story-Modal')
const addStoryCloseModalBtn = document.getElementById('close-add-Story-Modal')
const newTitleField = document.getElementById('new-title')
const newWordCountField = document.getElementById('new-word-count')
const newSubCountField = document.getElementById('new-sub-count')
const addNewStoryBtn = document.getElementById('add-new-story')


/* event listeners */

addStoryBtn.addEventListener('click', function(){
    addStoryModal.classList.remove('hidden')
})



/* add new story listener and function */

addNewStoryBtn.addEventListener('click', function addNewStory(){

    addStoryCloseModalBtn.addEventListener('click', function(){
        addStoryModal.classList.add('hidden')
    }) 

    
    
        push(storiesInDB,
                {
                    title: newTitleField.value,
                    wordCount: newWordCountField.value,
                    isSubmitted: false,
                    totalSubCount: newSubCountField.value
                })

        addStoryModal.classList.add('hidden')

        newTitleField.value = ''
        newWordCountField.value = ''
        newSubCountField.value = ''
    })

 

/* render current stories from firebase */

onValue(storiesInDB, function(snapshot){

        if (snapshot.exists()){
        let storiesArray = Object.values(snapshot.val())

        storiesArray.forEach(function(storiesArray){
            addStory(storiesArray)
            //console.log(snapshot.val())
        })

        }else {
            console.log("add a story!")
        }

        
})



/*adding a new story to firebase*/
function addStory(story){

    let storyId = story[0]
    let storyCardEl = document.createElement('div')

    storyCardEl.innerHTML = `
    
        <h1>${story.title}</h1>
        <h1>${story.wordCount}</h1>
        <h1>${story.isSubmitted}</h1>
        <h1>${story.totalSubCount}</h1>
        <button id="remove-btn">remove story</button>
    `
    cardsEl.prepend(storyCardEl)
    const removeStoryEl = document.getElementById('remove-btn')

    removeStoryEl.addEventListener('click', function(){
        
        let locationInStoriesDB = ref(database, `stories/${storyId}`)
        console.log(story.val())
        remove(locationInStoriesDB)
    })

}
