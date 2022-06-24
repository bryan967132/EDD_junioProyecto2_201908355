class NodoA {
    constructor(objeto,id) {
        this.objeto = objeto
        this.id = id
        this.izquierda = null
        this.derecha = null
        this.altura = 0
    }
}

class NodoH {
    constructor(indice) {
        this.indice = indice
        this.siguiente = null
        this.acceso = new LS()
    }
}

class NodoS {
    constructor(indice,objeto) {
        this.indice = indice
        this.objeto = objeto
        this.siguiente = null
    }
}

class AB {
    constructor() {
        this.raiz = null
        this.dot = ''
        this.id = 0
    }
    insert(nuevo) {
        this.raiz = this.add(nuevo,this.raiz)
        this.id ++
    }
    add(nuevo,actual) {
        if(!actual) {
            return new NodoA(nuevo,this.id)
        }
        if(nuevo.dni > actual.objeto.dni) {
            actual.derecha = this.add(nuevo,actual.derecha)
        }else {
            actual.izquierda = this.add(nuevo,actual.izquierda)
        }
        return actual
    }
    preorden() {
        this.pre_orden(this.raiz)
    }
    pre_orden(actual) {
        if(actual) {
            console.log('Valor:',actual.objeto)
            this.pre_orden(actual.izquierda)
            this.pre_orden(actual.derecha)
        }
    }
    inorden() {
        this.in_orden(this.raiz)
    }
    in_orden(actual) {
        if(actual) {
            this.in_orden(actual.izquierda)
            console.log('Valor:',actual.objeto)
            this.in_orden(actual.derecha)
        }
    }
    posorden() {
        this.pos_orden(this.raiz)
    }
    pos_orden(actual) {
        if(actual) {
            this.pos_orden(actual.izquierda)
            this.pos_orden(actual.derecha)
            console.log('Valor:',actual.objeto)
        }
    }
    getBranchesDot(actual) {
        let etiqueta = ''
        if(!actual.izquierda && !actual.derecha) {
            etiqueta = `nodo${actual.id} [label="${actual.objeto.nombre_actor}"];`
        }else {
            etiqueta = `nodo${actual.id} [label="<C0> | ${actual.objeto.nombre_actor} | <C1>"];`
        }
        if(actual.izquierda) {
            etiqueta += `${this.getBranchesDot(actual.izquierda)}nodo${actual.id}:C0 -> nodo${actual.izquierda.id};`
        }
        if(actual.derecha) {
            etiqueta += `${this.getBranchesDot(actual.derecha)}nodo${actual.id}:C1 -> nodo${actual.derecha.id};`
        }
        return etiqueta
    }
    getDot() {
        return `digraph G{rankdir=TB;node [shape = record];${this.getBranchesDot(this.raiz)}}`
    }
}

class AVL {
    constructor(){
        this.raiz = null;
        this.id = 0
    }
    getHeight(nodo) {
        if(!nodo) {
            return -1
        }
        return nodo.altura
    }
    getMaxHeight(izquierda,derecha) {
        if(izquierda > derecha) {
            return izquierda
        }
        return derecha
    }
    insert(valor) {
        this.raiz = this.insertElement(valor,this.raiz)
        this.id ++
    }
    insertElement(nuevo,nodo) {
        if(!nodo) {
            return new NodoA(nuevo,this.id)
        }
        if(nuevo.id_pelicula < nodo.objeto.id_pelicula) {
            nodo.izquierda = this.insertElement(nuevo,nodo.izquierda)
            if(this.getHeight(nodo.izquierda) - this.getHeight(nodo.derecha) == 2) {
                if(nuevo.id_pelicula < nodo.izquierda.objeto.id_pelicula) {
                    nodo = this.rotateWithLeftChild(nodo)
                }else {
                    nodo = this.doubleWithLeftChild(nodo)
                }
            }
        }else if(nuevo.id_pelicula > nodo.objeto.id_pelicula) {
            nodo.derecha = this.insertElement(nuevo,nodo.derecha)
            if(this.getHeight(nodo.derecha) - this.getHeight(nodo.izquierda) == 2) {
                if(nuevo.id_pelicula > nodo.derecha.objeto.id_pelicula) {
                    nodo = this.rotateWithRightChild(nodo)
                }else {
                    nodo = this.doubleWithRightChild(nodo)
                }
            }
        }
        nodo.altura = this.getMaxHeight(this.getHeight(nodo.izquierda),this.getHeight(nodo.derecha)) + 1
        return nodo
    }
    rotateWithLeftChild(nodo) {
        let aux = nodo.izquierda
        nodo.izquierda = aux.derecha
        aux.derecha = nodo
        nodo.altura = this.getMaxHeight(this.getHeight(nodo.izquierda),this.getHeight(nodo.derecha)) + 1
        aux.altura = this.getMaxHeight(this.getHeight(aux.izquierda),nodo.altura) + 1
        return aux
    }
    rotateWithRightChild(nodo) {
        let aux = nodo.derecha
        nodo.derecha = aux.izquierda
        aux.izquierda = nodo
        nodo.altura = this.getMaxHeight(this.getHeight(nodo.izquierda),this.getHeight(nodo.derecha)) + 1
        aux.altura = this.getMaxHeight(this.getHeight(aux.derecha),nodo.algura) + 1
        return aux
    }
    doubleWithLeftChild(nodo) {
        nodo.izquierda = this.rotateWithRightChild(nodo.izquierda)
        return this.rotateWithLeftChild(nodo)
    }
    doubleWithRightChild(nodo) {
        nodo.derecha = this.rotateWithLeftChild(nodo.derecha)
        return this.rotateWithRightChild(nodo)
    }
    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo){
            console.log("Valor:",nodo.objeto.nombre_pelicula);
            this.pre_orden(nodo.izquierda);
            this.pre_orden(nodo.derecha);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo){
            this.in_orden(nodo.izquierda);
            console.log("Valor:",nodo.objeto.nombre_pelicula);
            this.in_orden(nodo.derecha);    
        }
    }
    //postorden
    postorden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo){
            this.post_orden(nodo.izquierda);
            this.post_orden(nodo.derecha);
            console.log("Valor:",nodo.objeto.nombre_pelicula);
        }
    }
    getBranchesDot(actual) {
        let etiqueta = ''
        if(!actual.izquierda && !actual.derecha) {
            etiqueta = `nodo${actual.id} [label="${actual.objeto.nombre_pelicula}"];`
        }else {
            etiqueta = `nodo${actual.id} [label="<C0> | ${actual.objeto.nombre_pelicula} | <C1>"];`
        }
        if(actual.izquierda) {
            etiqueta += `${this.getBranchesDot(actual.izquierda)}nodo${actual.id}:C0 -> nodo${actual.izquierda.id};`
        }
        if(actual.derecha) {
            etiqueta += `${this.getBranchesDot(actual.derecha)}nodo${actual.id}:C1 -> nodo${actual.derecha.id};`
        }
        return etiqueta
    }
    getDot() {
        return `digraph G{rankdir=TB;node[shape = record];${this.getBranchesDot(this.raiz)}}`
    }
}

class LS {
    constructor() {
        this.primero = null
        this.ultimo = null
        this.indice = 0
    }
    add(nuevo) {
        if(this.primero) {
            this.ultimo.siguiente = new NodoS(this.indice,nuevo)
            this.ultimo = this.ultimo.siguiente
            this.indice ++
            return
        }
        this.primero = new NodoS(this.indice,nuevo)
        this.ultimo = this.primero
        this.indice ++
    }
    match(user,pass) {
        let actual = this.primero
        while(actual) {
            if(user == actual.objeto.nombre_usuario && pass == actual.objeto.contrasenia) {
                return {status: true,dpi: actual.objeto.dpi,nombre_completo: actual.objeto.nombre_completo}
            }
            actual = actual.siguiente
        }
        return {status: false}
    }
    getDot() {
        let dot = 'digraph g{rankdir=LR;node[shape=box];'
        let actual = this.primero
        let ultimo = null
        while(actual) {
            dot += `nodo${actual.indice}[label="${actual.objeto.nombre_completo}"]`
            if(ultimo) {
                dot += `nodo${ultimo.indice} -> nodo${actual.indice};`
            }
            ultimo = actual
            actual = actual.siguiente
        }
        dot += '}'
        return dot
    }
    getSubDot() {
        let _dot = ''
        let actual = this.primero
        let ultimo = null
        let _enlaces = ''
        while(actual) {
            _dot += `\n\tnodo${actual.objeto.id_categoria}[height=0.1 width=2 fontsize="11pt" label="${actual.objeto.company}"];`
            if(ultimo) {
                _enlaces += ` -> nodo${actual.objeto.id_categoria}`
            }else {
                _enlaces += `nodo${actual.objeto.id_categoria}`
            }
            ultimo = actual
            actual = actual.siguiente
        }
        _enlaces += ';'
        return {dot: _dot, enlaces: _enlaces}
    }
}

class THash {
    constructor(n,isrehashing) {
        this.primero = null
        this.ultimo = null
        this.llenos = 0
        this.size = n
        this.isrehashing = isrehashing
        for(let i = 0; i < n; i ++) {
            this.add(i)
        }
    }
    add(nuevo) {
        if(this.primero) {
            this.ultimo.siguiente = new NodoH(nuevo)
            this.ultimo = this.ultimo.siguiente
            return
        }
        this.primero = new NodoH(nuevo)
        this.ultimo = this.primero
    }
    insert(nuevo) {
        let nuevoHash = this.search(nuevo.id_categoria % this.size)
        nuevoHash.acceso.add(nuevo)
        this.llenos ++
        if(this.isrehashing) {
            if(this.llenos / this.size >= 0.75) {
                this.hashing(5)
            }
        }
    }
    search(indice) {
        let actual = this.primero
        while(actual) {
            if(actual.indice == indice) {
                return actual
            }
            actual = actual.siguiente
        }
    }
    hashing(n) {
        for(let i = this.size; i < this.size + n; i ++) {
            this.add(i)
        }
        this.size += n
    }
    printHash() {
        let actual = this.primero
        console.log('Llenos:',this.llenos)
        while(actual) {
            console.log('Posicion:',actual.indice)
            actual.acceso.printList()
            actual = actual.siguiente
        }
    }
    getDot() {
        let actual = this.primero
        let struct = '\n\tstruct[label="'
        let nodes = ''
        let enlaces = ''
        while(actual) {
            struct += `<f${actual.indice}> ${actual.indice}`
            if(actual.siguiente) {
                struct += '|'
            }
            if(actual.acceso.primero) {
                let subdot = actual.acceso.getSubDot()
                nodes += subdot.dot
                enlaces += `\n\tstruct:f${actual.indice} -> ${subdot.enlaces}`
            }
            actual = actual.siguiente
        }
        struct += '" height=10];'
        return `digraph g{\n\trankdir=LR;\n\tnode[shape=record];${struct}${nodes}${enlaces}\n}`
    }
}

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
            let movies = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result}))['data'])
            movies.forEach(movie => createMovie(movie['id_pelicula'],movie['nombre_pelicula'],movie['descripcion'],movie['puntuacion_star'],movie['precio_Q']))
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
            clients.forEach(client => createClient(client['dpi'],client['nombre_completo'],client['nombre_usuario'],client['correo'],client['contrasenia'],client['telefono']))
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
            actors.forEach(actor => createActor(actor['dni'],actor['nombre_actor'],actor['correo'],actor['descripcion']))
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
            categories.forEach(category => createCategory(category['id_categoria'],category['company']))
            statusCategories()
            alert('Actores Cargados')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('filecategory').value = ''
}

function getMovies() {
    let movies = new AVL()
    try {
        let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
        moviesCharged.forEach(movie => movies.insert(new Pelicula(movie['id_pelicula'],movie['nombre_pelicula'],movie['descripcion'],movie['puntuacion_star'],movie['precio_Q'])))
    } catch (error) {}
    return movies;
}

function getClients() {
    let clients = new LS()
    try {
        let clientsCharged = JSON.parse(localStorage.getItem('clientsCharged'))
        clientsCharged.forEach(client => clients.add(new Cliente(client['dpi'],client['nombre_completo'],client['nombre_usuario'],client['correo'],client['contrasenia'],client['telefono'])))
    } catch (error) {}
    return clients
}

function getActors() {
    let actors = new AB()
    try {
        let actorsCharged = JSON.parse(localStorage.getItem('actorsCharged'))
        actorsCharged.forEach(actor => actors.insert(new Actor(actor['dni'],actor['nombre_actor'],actor['correo'],actor['descripcion'])))
    } catch (error) {}
    return actors
}

function getCategories() {
    let categories = new THash(20)
    try {
        let categoriesCharged = JSON.parse(localStorage.getItem('categoriesCharged'))
        categoriesCharged.forEach(category => categories.insert(new Categoria(category['id_categoria'],category['company'])))
    } catch (error) {}
    return categories
}

function graphMovies() {
    let movies = getMovies()
    if(movies.raiz) {
        d3.select('#graph-1').graphviz().width(document.getElementById('graph-1').clientWidth).height(document.getElementById('graph-1').clientHeight - 10).scale(0.5).renderDot(movies.getDot())
        return
    }
    d3.select('#graph-1').graphviz().renderDot('digraph g{}')
}

function graphClients() {
    let clients = getClients()
    if(clients.primero) {
        d3.select('#graph-1').graphviz().width(document.getElementById('graph-1').clientWidth).height(document.getElementById('graph-1').clientHeight - 10).scale(0.5).renderDot(clients.getDot())
        return
    }
    d3.select('#graph-1').graphviz().renderDot('digraph g{}')
}

function graphActors() {
    let actors = getActors()
    if(actors.raiz) {
        d3.select('#graph-1').graphviz().width(document.getElementById('graph-1').clientWidth).height(document.getElementById('graph-1').clientHeight - 10).scale(0.5).renderDot(actors.getDot())
        return
    }
    d3.select('#graph-1').graphviz().renderDot('digraph g{}')
}

function graphCategories() {
    let categories = getCategories()
    d3.select('#graph-1').graphviz().width(document.getElementById('graph-1').clientWidth).height(document.getElementById('graph-1').clientHeight - 10).scale(0.5).renderDot(categories.getDot())
}

function getGraphMovies() {
    graphMovies()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t-clicked">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphClients() {
    graphClients()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t-clicked">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphActors() {
    graphActors()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t-clicked">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
}

function getGraphCategories() {
    graphCategories()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t-clicked">Grafo Categorías</button>
    <button type="button" class="button2" onclick="download()">Descargar Grafo</button>`
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
            document.getElementById('user').value = ''
            document.getElementById('password').value = ''
            window.location.href = 'AdminProfile.html'
            alert('Bienvenido Wilfred Perez')
            return
        }
        alert('Verifique sus credenciales')
        document.getElementById('user').value = ''
        document.getElementById('password').value = ''
        return
    }
    let clientFind = getClients().match(user,pass)
    if(clientFind.status) {
        document.getElementById('user').value = ''
        document.getElementById('password').value = ''
        window.location.href = `ClientProfile.html?dpi=${clientFind.dpi}`
        return
    }
    alert('Verifique sus credenciales')
    document.getElementById('user').value = ''
    document.getElementById('password').value = ''
}

function download() {

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