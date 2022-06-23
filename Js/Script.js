class Pelicula {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q) {
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion = descripcion
        this.puntuacion_star = puntuacion_star
        this.precio_Q = precio_Q
    }
}

class Cliente {
    constructor(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono) {
        this.dpi = dpi
        this.nombre_completo = nombre_completo
        this.nombre_usuario = nombre_usuario
        this.correo = correo
        this.contrasenia = contrasenia
        this.telefono = telefono
    }
}

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

function reset() {
    localStorage.clear()
}

function deleteMovies() {
    localStorage.removeItem('moviesCharged')
    alert('Películas Eliminados')
}

function deleteClients() {
    localStorage.removeItem('clientsCharged')
    alert('Clientes Eliminados')
}

function createMovie(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q) {
    if(localStorage.getItem('moviesCharged') != null) {
        let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
        moviesCharged.push(JSON.parse(JSON.stringify(new Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q))))
        localStorage.setItem('moviesCharged',JSON.stringify(moviesCharged))
        return
    }
    localStorage.setItem('moviesCharged',JSON.stringify([JSON.parse(JSON.stringify(new Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q)))]))
}

function createClient(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono) {
    if(localStorage.getItem('clientsCharged') != null) {
        let clientsCharged = JSON.parse(localStorage.getItem('clientsCharged'))
        clientsCharged.push(JSON.parse(JSON.stringify(new Cliente(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono))))
        localStorage.setItem('clientsCharged',JSON.stringify(clientsCharged))
        return
    }
    localStorage.setItem('clientsCharged',JSON.stringify([JSON.parse(JSON.stringify(new Cliente(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono)))]))
}

function chargeMovies() {
    let file = document.getElementById('filemovies').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let users = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            users.forEach(element =>
                createMovie(element['id_pelicula'],element['nombre_pelicula'],element['descripcion'],element['puntuacion_star'],element['precio_Q'])
            )
            alert('Clientes Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('filemovies').value = ''
}

function chargeClients() {
    let file = document.getElementById('fileclients').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let users = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            users.forEach(element =>
                createClient(element['dpi'],element['nombre_completo'],element['nombre_usuario'],element['correo'],element['contrasenia'],element['telefono'])
            )
            alert('Películas Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('fileclients').value = ''
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