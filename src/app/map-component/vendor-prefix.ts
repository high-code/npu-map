
let styles = window.getComputedStyle(document.documentElement, "");

export let lowercase : string = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/))[1];

export let dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + lowercase + ')', 'i'))[1];

export let css = '-' + lowercase + '-';

export let js = lowercase[0].toUpperCase() + lowercase.substr(1);
