export function REMOVE_QUERY_CLASS (target,className){
	document.querySelectorAll(target).forEach(select =>select.classList.remove("clicked"));
}

export function ADD_CLASS (target, className) {
	target.classList.add(className);
}