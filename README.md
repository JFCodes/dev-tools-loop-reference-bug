# Chrome DevTools element reference bug
 
Should we consider this to convoluted case to consider it a problem?
Anyway:
> Adding references incrementally while we update an element innerHTML with string concatenation, breaks the elements references. If the element reference is printed on the console, both the Web page and DevTools crashes on Chrome.

The main issue here is: both the page and the DevTools break on Chrome. (Firefox handles the missing reference properly).

A secondary issue may be consider: should updating a element innerHTML break the references to elements present before the update? We may discuss if it should or not, even according with specifications, but since there are other - and more appropriate ways to update an element children - it does not concerns this issue.


# How to reproduce

1. Clone the repository.
2. Open index.html in Chrome.
3. Open DevTools, observe how the code printed the reference to the button elements.
4. Hover the reference to any button (except the last one).

Instantly when hovering the element reference on DevTools console the page should have crashed and DevTools `was disconnected from the page.`

## The code

The mechanism to generate the bug is to incrementally add HTML code to an `element.innerHTML`.
On each iteration, also query and reference an element that was added on that iteration. Like such: 
```
theList.forEach(item  => {
	// Increament list innerHTML
	ELEMENT_LIST.innerHTML  +=  templateItem(item)
	// Attach the button event listener
	attachButtonClick(item)
})
``` 

Inside `attachButtonClick` we create and print a reference to a piece of code that was generated on `templateItem`, in this example: a button.
```
const  selector  =  `[data-item="${item.name}"] button`
const  buttonElement  =  document.querySelector(selector)
console.log(buttonElement)
```
