const submitBtn = document.querySelector("#submit_btn")
submitBtn.addEventListener("click", posts)
const textArea = document.querySelector("#text_area")
const displayDiv = document.querySelector("#disp")
const reverseBtn = document.querySelector(".reverse-btn")
reverseBtn.addEventListener("click", reverse)

let spanCount = 0
let spanCountStore = spanCount
let messages = []
let orderCheck = 1


if(!localStorage.getItem("spancount")){
    localStorage.setItem("spancount", `${spanCountStore}`)
}

function posts(){
    textValue = textArea.value
    if(textArea.value){
        if(JSON.parse(localStorage.getItem("spancount")) < 12){
            spanCount++ 
            spanCountStore = spanCount
            saveMessages()
            render(messages)
            console.log(spanCountStore)
        }
        else{
            alert("Max posts reached")
        }
        textArea.value = ""
    }
    else{
        alert("The field cannot be empty")
    }
}

// Reverse the display order
function reverse(){
    orderCheck = orderCheck * -1
    messages = JSON.parse(localStorage.getItem("messages"))
    render(messages)
}

// Save the messages to localStorage
function saveMessages(){
    textValue = textArea.value
    if(JSON.parse(localStorage.getItem("messages"))){
        messages = JSON.parse(localStorage.getItem("messages"))
    }
    messages.push(textValue)
    localStorage.setItem("messages", JSON.stringify(messages))
    localStorage.setItem("spancount", `${spanCountStore}`)
}

function render(messages){
    if(JSON.parse(localStorage.getItem("messages"))){
        let listItems = ""
        let textValue = ""
        if(orderCheck > 0){
            for(let i = 0; i < messages.length; i++){
                textValue = messages[i]
                listItems += `
                <span class="text_disp">
                    ${textValue}
                </span>`
            }
        }
        else{
            for(let i = messages.length - 1; i >= 0; i--){
                textValue = messages[i]
                listItems += `
                <span class="text_disp">
                    ${textValue}
                </span>`
            }
        }
        displayDiv.innerHTML = listItems
    }
}
if(JSON.parse(localStorage.getItem("messages"))){
    render(JSON.parse(localStorage.getItem("messages")))
}