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

class Actor {
    constructor(dni,nombre_actor,correo,descripcion) {
        this.dni = dni
        this.nombre_actor = nombre_actor
        this.correo = correo
        this.descripcion = descripcion
    }
}

class Categoria {
    constructor(id_categoria,company) {
        this.id_categoria = id_categoria
        this.company = company
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

function statusMovies() {
    if(localStorage.getItem('moviesCharged') != null) {
        document.getElementById('status-movies').innerHTML = '¡Películas Cargadas!'
        return
    }
    document.getElementById('status-movies').innerHTML = '¡No Hay Películas Cargadas!'
}

function statusClients() {
    if(localStorage.getItem('clientsCharged') != null) {
        document.getElementById('status-clients').innerHTML = '¡Clientes Cargados!'
        return
    }
    document.getElementById('status-clients').innerHTML = '¡No Hay Clientes Cargados!'
}

function statusActors() {
    if(localStorage.getItem('actorsCharged') != null) {
        document.getElementById('status-actors').innerHTML = '¡Actores Cargados!'
        return
    }
    document.getElementById('status-actors').innerHTML = '¡No Hay Actores Cargados!'
}

function statusCategories() {
    if(localStorage.getItem('categoriesCharged') != null) {
        document.getElementById('status-categories').innerHTML = '¡Categorías Cargadas!'
        return
    }
    document.getElementById('status-categories').innerHTML = '¡No Hay Categorías Cargadas!'
}

function deleteMovies() {
    localStorage.removeItem('moviesCharged')
    statusMovies()
    alert('Películas Eliminadas')
}

function deleteClients() {
    localStorage.removeItem('clientsCharged')
    statusClients()
    alert('Clientes Eliminados')
}

function deleteActors() {
    localStorage.removeItem('actorsCharged')
    statusActors()
    alert('Actores Eliminados')
}

function deleteCategories() {
    localStorage.removeItem('categoriesCharged')
    statusCategories()
    alert('Categorías Eliminadas')
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

function createActor(dni,nombre_actor,correo,descripcion) {
    if(localStorage.getItem('actorsCharged') != null) {
        let actorsCharged = JSON.parse(localStorage.getItem('actorsCharged'))
        actorsCharged.push(JSON.parse(JSON.stringify(new Actor(dni,nombre_actor,correo,descripcion))))
        localStorage.setItem('actorsCharged',JSON.stringify(actorsCharged))
        return
    }
    localStorage.setItem('actorsCharged',JSON.stringify([JSON.parse(JSON.stringify(new Actor(dni,nombre_actor,correo,descripcion)))]))
}

function createCategory(id_categoria,company) {
    if(localStorage.getItem('categoriesCharged') != null) {
        let categoriesCharged = JSON.parse(localStorage.getItem('categoriesCharged'))
        categoriesCharged.push(JSON.parse(JSON.stringify(new Categoria(id_categoria,company))))
        localStorage.setItem('categoriesCharged',JSON.stringify(categoriesCharged))
        return
    }
    localStorage.setItem('categoriesCharged',JSON.stringify([JSON.parse(JSON.stringify(new Categoria(id_categoria,company)))]))
}

function chargeMovies() {
    let file = document.getElementById('filemovies').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let clients = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            clients.forEach(element =>
                createMovie(element['id_pelicula'],element['nombre_pelicula'],element['descripcion'],element['puntuacion_star'],element['precio_Q'])
            )
            statusMovies()
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
            let clients = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            clients.forEach(element =>
                createClient(element['dpi'],element['nombre_completo'],element['nombre_usuario'],element['correo'],element['contrasenia'],element['telefono'])
            )
            statusClients()
            alert('Clientes Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('fileclients').value = ''
}

function chargeActors() {
    let file = document.getElementById('fileactors').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let actors = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            actors.forEach(element =>
                createActor(element['dni'],element['nombre_actor'],element['correo'],element['descripcion'])
            )
            statusActors()
            alert('Actores Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('fileactors').value = ''
}

function chargeCategories() {
    let file = document.getElementById('filecategory').files[0]
    if(file) {
        let reader = new FileReader()
        reader.readAsText(file,'UTF-8')
        reader.onload = function(evt) {
            let categories = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            categories.forEach(element =>
                createCategory(element['id_categoria'],element['company'])
            )
            statusCategories()
            alert('Actores Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('filecategory').value = ''
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

function getGraphMovies() {
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t-clicked">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphClients() {
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t-clicked">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphActors() {
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t-clicked">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphCategories() {
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t-clicked">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function download() {

}

function header() {scroll(0,0)}

function structures() {scroll(0,getOffset('graphs').top)}