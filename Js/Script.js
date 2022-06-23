function login() {
    let user = document.getElementById('user').value
    let pass = document.getElementById('password').value
    let admin = document.getElementById('rol').checked
    if(user.replace(' ','') == '' || pass.replace(' ','') == '') {
        alert('Todos los campos son obligatorios')
        document.getElementById('rol').checked = false
        return
    }
    if(admin) {
        if(user == 'EDD' && pass == '123') {
            window.location.href = 'AdminProfile.html'
            alert('Bienvenido Wilfred Perez')
            return
        }
        alert('Verifique sus credenciales')
        document.getElementById('user').value = ''
        document.getElementById('password').value = ''
        return
    }
}

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