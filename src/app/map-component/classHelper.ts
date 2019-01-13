
export function addClass(element: Element, cssClass: string) {
   if(!element.classList.contains(cssClass))
     element.classList.add(cssClass);
}


export function removeClass(element: Element, cssClass: string) {
   if(element.classList.contains(cssClass))
     element.classList.remove(cssClass);
}