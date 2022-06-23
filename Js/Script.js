function getOffset(id) {
    let elemento = document.getElementById(id)
    let _x = 0
    let _y = 0
    while(elemento && !isNaN(elemento.offsetLeft) && !isNaN(elemento.offsetTop)) {
        _x += elemento.offsetLeft - elemento.scrollLeft
        _y += elemento.offsetTop - elemento.scrollTop
        elemento = elemento.offsetParent
    }
    return {top: _y,left: _x}
}
function header() {scroll(0,0)}
function structures() {scroll(0,getOffset('graphs').top)}