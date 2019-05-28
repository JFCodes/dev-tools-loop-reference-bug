const theList = [
    { name: 'item1', order: 1 },
    { name: 'item2', order: 2 },
    { name: 'item3', order: 3 },
    { name: 'item4', order: 4 },
    { name: 'item5', order: 5 },
    { name: 'item6', order: 6 }
]

// Element we are injecting the new elements
const ELEMENT_LIST = document.querySelector('#list')

// Compiles the element template string literal
// to be incremented to ELEMENT_LIST.innerHTML
const templateItem = function(item) {
    return `
        <li data-item="${item.name}">
            <button>${item.name} (${item.order})</button>
        </li>
    `
}

const attachButtonClick = function (item) {
    const selector = `[data-item="${item.name}"] button`
    // Reference to the element queried on the DOM
    const buttonElement = document.querySelector(selector)
    /**
     * THE BUG
     * 
     * When we increment innertHTML, it somehow breaks the reference
     * between the buttonElement and the current the DOM (after the forEach completes
     * Note how the last button reference works properly.)
     * 
     * If you hover this printed element in the console.log DevTools just breaks.
     * 
     * Something about updating innerHTML with the increment operator +=
     * breaks the reference which DevTools cannot resolve.
     * The selector is valid, the element query works, the button reference is valid
     * but on the next item iteration, that reference is broken.
     */
    console.log(buttonElement)
    
    // A smaller issue
    // Since the reference to the previous buttons is lost
    // the eventListenners on all items (except the last) do not work
    buttonElement.addEventListener('click', () => {
        console.log(`Button of item ${item.order} clicked`)
        // We can also check if this reference works or breaks.
        console.log(buttonElement)
    })
}

const renderFunction = function() {
    /**
     * PREPARING THE BUG
     * 
     * The idea is to incrementally add to a target element.innerHTML
     * and, on each interaction, create a reference to an element added in that iteration.
     * When pointing to the element inside the function closure,
     * devTools has the referente but cannot link back to the document DOM
     */

    // Clear the inner HTML
    ELEMENT_LIST.innerHTML = ''
    // Loop the items to inject the template and create the button reference.
    theList.forEach(item => {
        // Increament list innerHTML
        ELEMENT_LIST.innerHTML += templateItem(item)
        // Attach the button event listener
        attachButtonClick(item)
    })
}

renderFunction()
