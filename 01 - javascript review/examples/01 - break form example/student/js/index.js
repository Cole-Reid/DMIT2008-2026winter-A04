// 1. Select both of the topic list and the new topic form

let topicList = document.querySelector(".topics-list");
let newTopicForm = document.querySelector(".new-topic-form");

// 5. Create a function addTopicToPage that will take a name & a list element as its params
const addTopicToPage = (topicName, topicListElement) => {
    // 6a. Create a new inner list element and update the HTML
    let newTopicElement = `<li class="list-group-item">
        ${topicName}
    </li>`
    topicListElement.innerHTML += newTopicElement
}

// 2. Add an event listener on the form and stop the event from propogating.

newTopicForm.addEventListener("submit",
    (myEvent) => { // here we are creating a function that is limited to just this event listener
        myEvent.preventDefault()
        // 3. grab input element & extract/store value
        let topicInput = myEvent.target.elements["new-topic"]
        let newTopic = topicInput.value
        console.log(newTopic)
        // 4. Validation - check for empty, use bootstrap classes
        if (newTopic === "") {
            topicInput.classList.add("is-invalid")
        } else {
            topicInput.classList.remove("is-invalid")
        }
        // 6b. Don't forget to call the function inside the event listener
        addTopicToPage(newTopic, topicList)
    }
)