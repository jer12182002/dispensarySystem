//Styling helper functions
export function REMOVE_QUERY_CLASS (target,className){
	document.querySelectorAll(target).forEach(select =>select.classList.remove(className));
}

export function ADD_CLASS (target, className) {
	target.classList.add(className);
}

export function REMOVE_CLASS(target, className) {
	target.classList.remove(className);
}

export function TOGGLE_CLASS (target, className, rule) {
	alert(rule);
	target.classList.toggle(className, eval(rule));
}

export function SET_ATTRIBUTE(target, attribute, value="") {
	document.querySelector(target).setAttribute(attribute,value);
}

export function REMOVE_ATTRIBUTE (target, attribute) {
	document.querySelector(target).removeAttribute(attribute);
}

export function SET_INPUT_VALUE (target,value) {
	document.querySelector(target).value = value;
}

export function CLEAR_CHILDREN_INPUT_VALUE (target) {
	document.querySelectorAll(target).forEach(select =>select.value = "");
}




