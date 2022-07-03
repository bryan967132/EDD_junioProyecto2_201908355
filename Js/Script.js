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

class NodoD {
    constructor(id_data,objeto) {
        this.id_data = id_data
        this.objeto = objeto
        this.siguiente = null
    }
}

class NodoN {
    constructor(num) {
        this.hash = Sha256.hash(num.toString())
    }
}

class NodoM {
    constructor(id,nivel) {
        this.id = id
        this.nivel = nivel
        this.hash = null
        this.izquierda = null
        this.derecha = null
        this.data = null
    }
}

class NodoBC {
    constructor(objeto) {
        this.objeto = objeto
        this.siguiente = null
        this.anterior = null
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
        }else if(nuevo.dni < actual.objeto.dni) {
            actual.izquierda = this.add(nuevo,actual.izquierda)
        }
        return actual
    }
    inOrderHTML() {
        return this.in_order(this.raiz)
    }
    in_order(actual) {
        let html = ''
        if(actual) {
            html += this.in_order(actual.izquierda)
            html += `
            <div class="actor">
                <h2 class="titulo">${actual.objeto.nombre_actor}<p class="id">${actual.objeto.dni}</p></h2>
                <div class="descripcion">
                    <p><strong>Descripcion</strong>:<br>${actual.objeto.descripcion}</p>
                </div>
            </div>`
            html += this.in_order(actual.derecha)
        }
        return html
    }
    preOrderHTML() {
        return this.pre_order(this.raiz)
    }
    pre_order(actual) {
        let html = ''
        if(actual) {
            html += `
            <div class="actor">
                <h2 class="titulo">${actual.objeto.nombre_actor}<p class="id">${actual.objeto.dni}</p></h2>
                <div class="descripcion">
                    <p><strong>Descripcion</strong>:<br>${actual.objeto.descripcion}</p>
                </div>
            </div>`
            html += this.pre_order(actual.izquierda)
            html += this.pre_order(actual.derecha)
        }
        return html
    }
    postOrderHTML() {
        return this.post_order(this.raiz)
    }
    post_order(actual) {
        let html = ''
        if(actual) {
            html += this.post_order(actual.izquierda)
            html += this.post_order(actual.derecha)
            html += `
            <div class="actor">
                <h2 class="titulo">${actual.objeto.nombre_actor}<p class="id">${actual.objeto.dni}</p></h2>
                <div class="descripcion">
                    <p><strong>Descripcion</strong>:<br>${actual.objeto.descripcion}</p>
                </div>
            </div>`
        }
        return html
    }
    getBranchesDot(actual) {
        let etiqueta = ''
        if(!actual.izquierda && !actual.derecha) {
            etiqueta = `nodo${actual.id}[label="${actual.objeto.dni}\\n${actual.objeto.nombre_actor}"];`
        }else {
            etiqueta = `nodo${actual.id}[label="<C0> | ${actual.objeto.dni}\\n${actual.objeto.nombre_actor} | <C1>"];`
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
    searchMovie(id) {
        return this.search_Movie(id,this.raiz)
    }
    search_Movie(id,nodo) {
        if(id < nodo.objeto.id_pelicula) {
            return this.search_Movie(id,nodo.izquierda)
        }
        if(id > nodo.objeto.id_pelicula) {
            return this.search_Movie(id,nodo.derecha)
        }
        return nodo.objeto
    }   
    //inorder
    inOrderHTML(){
        return this.in_order(this.raiz);
    }
    in_order(nodo){
        let html = ''
        if(nodo){
            html += this.in_order(nodo.izquierda);
            if(nodo.objeto.disponible) {
                html += `
                <div class="pelicula">
                    <h2 class="titulo">${nodo.objeto.nombre_pelicula}<p class="id">${nodo.objeto.id_pelicula}</p></h2>
                    <div class="descripcion">
                        <p><strong>Descripcion</strong>:<br>${nodo.objeto.descripcion}</p>
                    </div>
                    <div class="button-group button-group-gap-4 button-group-padding">
                        <button type="button" class="button1" onclick="openInformation(${nodo.objeto.id_pelicula})">Información</button>
                        <button type="button" class="button1" onclick="rentMovie('${nodo.objeto.nombre_pelicula}',${nodo.objeto.id_pelicula})">Alquilar Q.${nodo.objeto.precio_Q}</button>
                    </div>
                </div>`
            }
            html += this.in_order(nodo.derecha);    
        }
        return html
    }
    inOrderReverseHTML(){
        return this.in_order_reverse(this.raiz);
    }
    in_order_reverse(nodo){
        let html = ''
        if(nodo){
            html += this.in_order_reverse(nodo.derecha);
            if(nodo.objeto.disponible) {
                html += `
                <div class="pelicula">
                    <h2 class="titulo">${nodo.objeto.nombre_pelicula}<p class="id">${nodo.objeto.id_pelicula}</p></h2>
                    <div class="descripcion">
                        <p><strong>Descripcion</strong>:<br>${nodo.objeto.descripcion}</p>
                    </div>
                    <div class="button-group button-group-gap-4 button-group-padding">
                    <button type="button" class="button1" onclick="openInformation(${nodo.objeto.id_pelicula})">Información</button>
                        <button type="button" class="button1" onclick="rentMovie('${nodo.objeto.nombre_pelicula}',${nodo.objeto.id_pelicula})">Alquilar Q.${nodo.objeto.precio_Q}</button>
                    </div>
                </div>`
            }
            html += this.in_order_reverse(nodo.izquierda);    
        }
        return html
    }
    //Dot
    getBranchesDot(actual) {
        let etiqueta = ''
        if(!actual.izquierda && !actual.derecha) {
            etiqueta = `nodo${actual.id}[label="${actual.objeto.id_pelicula}\\n${actual.objeto.nombre_pelicula}"];`
        }else {
            etiqueta = `nodo${actual.id}[label="<C0> | ${actual.objeto.id_pelicula}\\n${actual.objeto.nombre_pelicula} | <C1>"];`
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
    verifyId(id) {
        let actual = this.primero
        while(actual) {
            if(id == actual.objeto.id_categoria) {
                return true
            }
            actual = actual.siguiente
        }
        return false
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
    search(dpi) {
        let actual = this.primero
        while(actual) {
            if(dpi == actual.objeto.dpi) {
                return {status: true,nombre_completo: actual.objeto.nombre_completo}
            }
            actual = actual.siguiente
        }
        return {status: false}
    }
    getComment(indice) {
        let actual = this.primero
        while(actual) {
            if(indice == actual.indice) {
                return actual.objeto
            }
            actual = actual.siguiente
        }
    }
    getSize() {
        return this.indice
    }
    getMoviesHTML() {
        let html = ''
        let actual = this.primero
        while(actual) {
            html += `
            <div class="pelicula">
                <h2 class="titulo">${actual.objeto.nombre_pelicula}</h2>
                <div class="descripcion">
                    <p><strong>Descripcion</strong>:<br>${actual.objeto.descripcion}</p>
                </div>
                <div class="button-group button-group-gap-4 button-group-padding">
                    <button type="button" class="button1">Información</button>
                    <button type="button" class="button1">Alquilar Q.${actual.objeto.precio_Q}</button>
                </div>
            </div>`
            actual = actual.siguiente
        }
        return html
    }
    getCategoriesHTML() {
        let html = ''
        let actual = this.primero
        while(actual) {
            html += `
            <div class="categoria">
                <h2 class="titulo">${actual.objeto.company}</h2>
            </div>`
            actual = actual.siguiente
        }
        return html
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
        if(!nuevoHash.acceso.verifyId(nuevo.id_categoria)) {
            nuevoHash.acceso.add(nuevo)
            this.llenos ++
            if(this.isrehashing) {
                if(this.llenos / this.size >= 0.75) {
                    this.hashing(5)
                }
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
    getHTML() {
        let html = ''
        let actual = this.primero
        while(actual) {
            if(actual.acceso.primero) {
                html += actual.acceso.getCategoriesHTML()
            }
            actual = actual.siguiente
        }
        return html
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

class LstDt {
    constructor() {
        this.primero = null
        this.id = 0
    }
    insert(nuevo) {
        this.primero = this.addToDataList(nuevo,this.primero)
    }
    addToDataList(nuevo,nodo) {
        if(!nodo) {
            this.id ++
            return new NodoD(this.id,nuevo)
        }
        nodo.siguiente = this.addToDataList(nuevo,nodo.siguiente)
        return nodo
    }
    getHead() {
        if(!this.primero) return null
        let primero = this.primero
        this.primero = this.primero.siguiente
        primero.siguiente = null
        return primero
    }
    getNData() {
        return this.id
    }
}

class Merkle {
    constructor() {
        this.raiz = null
        this.id = 0
        this.list_data = new LstDt()
    }
    insert(nuevo) {
        this.list_data.insert(nuevo)
    }
    buildTree() {
        if(this.list_data.primero) {
            let tmp = this.list_data.getNData()
        if(!this.isPowerOfTwo(tmp)) {
            tmp = this.getNextPowerOfTwo(tmp)
        }
        if(tmp == 1) {
            this.niveles = 1
            tmp = 2
        }
        for(let i = this.list_data.getNData(); i < tmp; i ++) {
            this.list_data.insert(new NodoN(i*100))
        }
        this.niveles = this.getPowerOfTwo(tmp)
        this.buildBranches()
        }
    }
    buildBranches() {
        this.raiz = this.addNodesBranch(this.raiz,0)
    }
    addNodesBranch(nodo,nivel) {
        if(!nodo) {
            this.id ++
            if(nivel < this.niveles) {
                nodo = new NodoM(this.id,nivel)
                nodo.izquierda = this.addNodesBranch(nodo.izquierda,nivel + 1)
                nodo.derecha = this.addNodesBranch(nodo.derecha,nivel + 1)
                nodo.hash = Sha256.hash(`${nodo.izquierda.hash}${nodo.derecha.hash}`)
            }else if(nivel == this.niveles) {
                nodo = this.addLeafNode(nodo,nivel)
            }
        }
        return nodo
    }
    addLeafNode(nodo,nivel) {
        nodo = new NodoM(this.id,nivel)
        let head = this.list_data.getHead()
        if(head) {
            nodo.hash = head.objeto.hash
            nodo.data = {id: head.id_data,transaccion: head.objeto}
        }
        return nodo
    }
    isPowerOfTwo(n) {
        while(n % 2 == 0) {
            n /= 2
        }
        if(n == 1) return true
        return false
    }
    getPowerOfTwo(n) {
        let power = 0
        while(n % 2 == 0) {
            n /= 2
            power ++
        }
        return power
    }
    getNextPowerOfTwo(n) {
        if(this.isPowerOfTwo(n)) return n
        return this.getNextPowerOfTwo(n + 1)
    }
    getBranchesDot(actual) {
        let etiqueta = ''
        if(actual && actual.hash != 'null') {
            if(!actual.izquierda && !actual.derecha) {
                etiqueta = `\n\tnodo${actual.id}[label="${actual.hash}"];`
            }else {
                etiqueta = `\n\tnodo${actual.id}[label="<C0> | ${actual.hash} | <C1>"];`
            }
            if(actual.izquierda) {
                etiqueta += `${this.getBranchesDot(actual.izquierda)}\n\tnodo${actual.id}:C0 -> nodo${actual.izquierda.id};`
            }
            if(actual.derecha) {
                etiqueta += `${this.getBranchesDot(actual.derecha)}\n\tnodo${actual.id}:C1 -> nodo${actual.derecha.id};`
            }
            if(actual.data) {
                if(actual.data.transaccion.cliente) {
                    etiqueta += `\n\tnodo${actual.data.transaccion.hash}[label="T${actual.data.id}"];\n\tnodo${actual.id} -> nodo${actual.data.transaccion.hash};`
                }else {
                    etiqueta += `\n\tnodo${actual.data.transaccion.hash}[label="${(actual.data.id - 1)*100}"];\n\tnodo${actual.id} -> nodo${actual.data.transaccion.hash};`
                }
            }
        }
        return etiqueta
    }
    getDot() {
        return `digraph G{\n\trankdir=TB;\n\tnode[shape=record fontsize=10 height=0.1];${this.getBranchesDot(this.raiz)}\n}`
    }
}

class Blockchain {
    constructor() {
        this.primero = null
        this.ultimo = null
    }
    insert(nuevo) {
        if(this.primero) {
            this.ultimo.siguiente = new NodoBC(nuevo)
            this.ultimo.siguiente.anterior = this.ultimo
            this.ultimo = this.ultimo.siguiente
            this.ultimo.objeto.prev_hash = this.ultimo.anterior.objeto.hash
            let proof = this.proofOfWork(this.ultimo.objeto,this.ultimo.anterior.objeto.nonce + 1)
            this.ultimo.objeto.nonce = proof.nonce
            console.log(this.ultimo.objeto.nonce)
            this.ultimo.objeto.hash = proof.hash
            return
        }
        this.primero = new NodoBC(nuevo)
        this.primero.objeto.prev_hash = '00'
        let proof = this.proofOfWork(this.primero.objeto,0)
        this.primero.objeto.nonce = proof.nonce
        console.log(this.primero.objeto.nonce)
        this.primero.objeto.hash = proof.hash
        this.ultimo = this.primero
    }
    proofOfWork(nodo,n) {
        console.log(nodo)
        let hash
        do {
            hash = Sha256.hash(`${nodo.index}${nodo.timestamp}${nodo.prev_hash}${nodo.root_merkle}${n}`)
            if(hash.toString().charAt(0) == 0 && hash.toString().charAt(1) == 0) {
                return {nonce: n,hash: hash}
            }
            n ++
        } while(true)
    }
    printBlockchain() {
        let actual = this.primero
        while(actual) {
            console.log(actual.objeto)
            actual = actual.siguiente
        }
    }
    getDot() {
        let actual = this.primero
        let dot = 'digraph G {\n\trankdir=LR;\n\tnode[shape=box style=rounded];'
        let o
        while(actual) {
            o = actual.objeto
            dot += `\n\tnodo${actual.objeto.index}[label=<\n\t\t<table border="0" cellborder="0 " cellspacing="0">\n\t\t\t<tr><td height="230">Bloque ${o.index}<br ALIGN="LEFT"/>Hash: ${o.hash}<br ALIGN="LEFT"/>Prev: ${o.prev_hash}<br ALIGN="LEFT"/>Root Merkle: ${o.root_merkle}<br ALIGN="LEFT"/>Transacciones: [${o.getData()}<br ALIGN="LEFT"/> ]<br ALIGN="LEFT"/>Fecha: ${o.timestamp}<br ALIGN="LEFT"/></td></tr>\n\t\t</table>\n\t>];`
            if(actual.anterior) {
                dot += `\n\tnodo${actual.anterior.objeto.index} -> nodo${actual.objeto.index};`
            }
            actual = actual.siguiente
        }
        dot += '\n}'
        return dot
    }
}

class Pelicula {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,comentarios,disponible) {
        this.id_pelicula = id_pelicula
        this.nombre_pelicula = nombre_pelicula
        this.descripcion = descripcion
        this.puntuacion_star = puntuacion_star
        this.precio_Q = precio_Q
        this.comentarios = comentarios
        this.disponible = disponible
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

class Comentario {
    constructor(id_pelicula,dpi_cliente,comentario) {
        this.id_pelicula = id_pelicula
        this.dpi_cliente = dpi_cliente
        this.comentario = comentario
    }
}

class Transaccion {
    constructor(bloque,cliente,pelicula) {
        this.bloque = bloque
        this.cliente = cliente
        this.pelicula = pelicula
        this.hash = Sha256.hash(`${cliente} - ${pelicula}`)
    }
}

class Bloque {
    constructor(index,timestamp,data,root_merkle) {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.nonce = null
        this.prev_hash = null
        this.root_merkle = root_merkle
        this.hash = null
    }
    getData() {
        let data = ''
        if(this.data.length > 0) {
            let limite = this.data.length - 1
            this.data.forEach(function(d,index) {
                data += `<br ALIGN="LEFT"/>         ${d}`
                if(index < limite) data += ','
            })
        }
        return `${data}`
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
        moviesCharged.push(JSON.parse(JSON.stringify(new Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,null,true))))
        localStorage.setItem('moviesCharged',JSON.stringify(moviesCharged))
        return
    }
    localStorage.setItem('moviesCharged',JSON.stringify([JSON.parse(JSON.stringify(new Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q,null,true)))]))
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
            let movies = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result})).data)
            movies.forEach(movie => createMovie(movie.id_pelicula,movie.nombre_pelicula,movie.descripcion,movie.puntuacion_star,movie.precio_Q))
            statusMovies()
            alert('Películas Cargadas')
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
            let clients = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result})).data)
            clients.forEach(client => createClient(client.dpi,client.nombre_completo,client.nombre_usuario,client.correo,client.contrasenia,client.telefono))
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
            let actors = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result})).data)
            actors.forEach(actor => createActor(actor.dni,actor.nombre_actor,actor.correo,actor.descripcion))
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
            let categories = JSON.parse(JSON.parse(JSON.stringify({data: evt.target.result})).data)
            categories.forEach(category => createCategory(category.id_categoria,category.company))
            statusCategories()
            alert('Categorías Cargadas')
        }
        reader.onerror = function(evt) {alert('Ha ocurrido un error al cargar el archivo')}
    }
    document.getElementById('filecategory').value = ''
}

function getMovies() {
    let movies = new AVL()
    try {
        let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
        moviesCharged.forEach(
            function(movie) {
                let comments = new LS()
                try {
                    movie.comentarios.forEach(comment => comments.add(new Comentario(comment.id_pelicula,comment.dpi_cliente,comment.comentario)))
                } catch (error) {}
                movies.insert(new Pelicula(movie.id_pelicula,movie.nombre_pelicula,movie.descripcion,movie.puntuacion_star,movie.precio_Q,comments,movie.disponible))
            }
        )
    } catch (error) {}
    return movies;
}

function getClients() {
    let clients = new LS()
    try {
        let clientsCharged = JSON.parse(localStorage.getItem('clientsCharged'))
        clientsCharged.forEach(client => clients.add(new Cliente(client.dpi,client.nombre_completo,client.nombre_usuario,client.correo,client.contrasenia,client.telefono)))
    } catch (error) {}
    return clients
}

function getActors() {
    let actors = new AB()
    try {
        let actorsCharged = JSON.parse(localStorage.getItem('actorsCharged'))
        actorsCharged.forEach(actor => actors.insert(new Actor(actor.dni,actor.nombre_actor,actor.correo,actor.descripcion)))
    } catch (error) {}
    return actors
}

function getCategories() {
    let categories = new THash(20)
    try {
        let categoriesCharged = JSON.parse(localStorage.getItem('categoriesCharged'))
        categoriesCharged.forEach(category => categories.insert(new Categoria(category.id_categoria,category.company)))
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
    <button id="download" class="button2" onclick="downloadGraph()">Descargar Grafo</button>`
}

function getGraphClients() {
    graphClients()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t-clicked">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button id="download" class="button2" onclick="downloadGraph()">Descargar Grafo</button>`
}

function getGraphActors() {
    graphActors()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t-clicked">Grafo Actores</button>
    <button type="button" class="button1-t" onclick="getGraphCategories()">Grafo Categorías</button>
    <button id="download" class="button2" onclick="downloadGraph()">Descargar Grafo</button>`
}

function getGraphCategories() {
    graphCategories()
    document.getElementById('button-group').innerHTML = `
    <button type="button" class="button1-t" onclick="getGraphMovies()">Grafo Películas</button>
    <button type="button" class="button1-t" onclick="getGraphClients()">Grafo Clientes</button>
    <button type="button" class="button1-t" onclick="getGraphActors()">Grafo Actores</button>
    <button type="button" class="button1-t-clicked">Grafo Categorías</button>
    <button id="download" class="button2" onclick="downloadGraph()">Descargar Grafo</button>`
}

function downloadGraph() {
    saveSvgAsPng(
        document.getElementById('graph-1').children[0],
        'Grafo.png',
        {
            scale: 10,
            backgroundColor: '#FFFFFF'
        }
    );
}

function movies() {
    let movies = getMovies()
    if(movies.raiz) {
        if(alpha) {
            alpha = false
            let inorderhtml = movies.inOrderHTML()
            if(inorderhtml != '') {
                document.getElementById('asc-movies').innerHTML = `<button type="button" class="button-asc-desc-selected button-asc-desc-width">Ascendente</button>`
                document.getElementById('desc-movies').innerHTML = `<button type="button" class="button-asc-desc button-asc-desc-width" onclick="movies()">Descendente</button>`
                document.getElementById('catalogo-Peliculas').innerHTML = `<div class="bloque">${inorderhtml}</div>`
            }else {
                document.getElementById('status-movies').innerHTML = '¡No hay Películas Disponibles!'
            }
        }else {
            alpha = true
            let inroderreversehtml = movies.inOrderReverseHTML()
            if(inroderreversehtml != '') {
                document.getElementById('asc-movies').innerHTML = `<button type="button" class="button-asc-desc button-asc-desc-width" onclick="movies()">Ascendente</button>`
                document.getElementById('desc-movies').innerHTML = `<button type="button" class="button-asc-desc-selected button-asc-desc-width">Descendente</button>`
                document.getElementById('catalogo-Peliculas').innerHTML = `<div class="bloque">${inroderreversehtml}</div>`
            }else {
                document.getElementById('status-movies').innerHTML = '¡No hay Películas Disponibles!'
            }
        }
        return
    }
    document.getElementById('status-movies').innerHTML = '¡No hay Películas!'
}

function actorS(inorder,preorder,postorder) {
    let actors = getActors()
    if(actors.raiz) {
        if(inorder) {
            document.getElementById('in').innerHTML = `<button type="button" class="button-asc-desc-selected button-in-pre-post-width">In Order</button>`
            document.getElementById('pre').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(false,true,false)">Pre Order</button>`
            document.getElementById('post').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(false,false,true)">Post Order</button>`
            document.getElementById('lista-actores').innerHTML = `<div class="bloque">${actors.inOrderHTML()}</div>`
        }else if(preorder) {
            document.getElementById('in').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(true,false,false)">In Order</button>`
            document.getElementById('pre').innerHTML = `<button type="button" class="button-asc-desc-selected button-in-pre-post-width">Pre Order</button>`
            document.getElementById('post').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(false,false,true)">Post Order</button>`
            document.getElementById('lista-actores').innerHTML = `<div class="bloque">${actors.preOrderHTML()}</div>`
        }else if(postorder) {
            document.getElementById('in').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(true,false,false)">In Order</button>`
            document.getElementById('pre').innerHTML = `<button type="button" class="button-asc-desc button-in-pre-post-width" onclick="actorS(false,true,false)">Pre Order</button>`
            document.getElementById('post').innerHTML = `<button type="button" class="button-asc-desc-selected button-in-pre-post-width">Post Order</button>`
            document.getElementById('lista-actores').innerHTML = `<div class="bloque">${actors.postOrderHTML()}</div>`
        }
        return
    }
    document.getElementById('status-actors').innerHTML = '¡No hay Actores!'
}

function categories() {
    let categories = getCategories()
    if(categories.llenos > 0) {
        document.getElementById('lista-categorias').innerHTML = `<div class="bloque"><div class="mosaico">${categories.getHTML()}</div></div>`
        return
    }
    document.getElementById('status-categories').innerHTML = '¡No hay Categorías de Películas!'
}

function getStars(stars_c) {
    let stars = ''
    for(let i = 1; i <= stars_c; i ++) {
        stars += '<svg version="1.1" id="Layer_1" width = "25" height = "25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 501.28 501.28" style="enable-background:new 0 0 501.28 501.28;" xml:space="preserve"><g><polygon style="fill:#FFCD00;" points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29"/><polygon style="fill:#FFDA44;" points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27"/></g></svg>'
    }
    for(let i = 1; i <= 5 - stars_c; i ++) {
        stars += '<svg version="1.1" id="Layer_1" width = "25" height = "25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 501.28 501.28" style="enable-background:new 0 0 501.28 501.28;" xml:space="preserve"><g><polygon style="fill:#8f8f8f;" points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29"/><polygon style="fill:#9f9f9f;" points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27"/></g></svg>'
    }
    return stars
}

function setStars(id,stars) {
    stars = parseInt(stars)
    let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
    moviesCharged.forEach(
        function(movie) {
            movie.id_pelicula == id ? movie.puntuacion_star = stars : undefined
        }
    )
    localStorage.setItem('moviesCharged',JSON.stringify(moviesCharged))
    document.getElementById('puntuacion').innerHTML = `
    <div>
        <button type="button" class="button2" onclick="setStars(${id},document.getElementById('stars-num').value)">Modificar Puntuación</button>
    </div>
    <div>
        <input id="stars-num" type="number" class="input-star" min="0" max="5" value="${stars}">
    </div>
    <div id="stars" class="stars">${getStars(stars)}</div>`
}

function getClientUser(dpi) {
    return getClients().search(dpi).nombre_completo
}

function getMoviesCommentaries(id_pelicula) {
    let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
    let commentaries = null
    moviesCharged.forEach(movie => id_pelicula == movie.id_pelicula ? commentaries = movie.comentarios : null)
    return commentaries
}

function getCommentaries(id_pelicula,dpi_cliente) {
    let comentarios1 = ''
    let comentarios = getMoviesCommentaries(id_pelicula)
    try {
        comentarios.forEach(
            function(comment) {
                try {
                let flex = 'flex-mi-comentario'
                let user = 'Tú'
                if(dpi_cliente != comment.dpi_cliente) {
                    flex = 'flex-comentario'
                    user = getClientUser(comment.dpi_cliente)
                }
                comentarios1 += `<div class="${flex}"><div class="comentario"><span class="user-comment">${user}</span>${comment.comentario}</div></div>`
            } catch (error) {}
        }
        )
    } catch (error) {}
    document.getElementById('comentarios-1').innerHTML = comentarios1
    document.getElementById('comentarios-1').scrollTop = document.getElementById('comentarios-1').scrollHeight
}

function createCommentary(id_pelicula,dpi_cliente,comentario) {
    let movies = JSON.parse(localStorage.getItem('moviesCharged'))
    movies.forEach(
        function(movie) {
            if(id_pelicula == movie.id_pelicula) {
                if(movie.comentarios != null) {
                    movie.comentarios.push(JSON.parse(JSON.stringify(new Comentario(id_pelicula,dpi_cliente,comentario))))
                }else {
                    movie.comentarios = [JSON.parse(JSON.stringify(new Comentario(id_pelicula,dpi_cliente,comentario)))]
                }
            }
        }
    )
    localStorage.setItem('moviesCharged',JSON.stringify(movies))
}

function sendCommentary(id_pelicula,dpi_cliente) {
    let comentario = document.getElementById('comment-text').value
    if(comentario.replace(' ','') == '') return
    createCommentary(id_pelicula,dpi_cliente,comentario)
    getCommentaries(id_pelicula,dpi_cliente)
    document.getElementById('comment-text').value = ''
}

function openInformation(id) {
    document.getElementsByClassName('fondo_transparente')[0].style.display = 'block'
    let movieFinded = getMovies().searchMovie(id)
    document.getElementById('titulomodal').innerHTML = `${movieFinded.nombre_pelicula}`
    document.getElementById('descripcion').innerHTML = `<div class="m-descripcion barra_scroll"><strong>Descripción</strong>: ${movieFinded.descripcion}</div>`
    setStars(id,movieFinded.puntuacion_star)
    document.getElementById('alquiler').innerHTML = `<div><button type="button" class="button1" onclick="rentMovie('${movieFinded.nombre_pelicula}',${movieFinded.id_pelicula},${true})">Alquilar Q.200</button></div>`
    getCommentaries(id,dpi)
    document.getElementById('button-comment').innerHTML = `<button type="button" class="button-comment" onclick="sendCommentary(${id},${dpi})"></button>`
}

function getBlockchain() {
    let blockchainC = JSON.parse(localStorage.getItem('bloques'))
    let blockchain = new Blockchain()
    blockchainC.forEach(block => blockchain.insert(new Bloque(block.index,block.timestamp,block.data,block.root_merkle)))
    return blockchain
}

function getMerkleTree() {
    let merkleTree = new Merkle()
    try {
        let data = JSON.parse(localStorage.getItem('transacciones'))
        data.forEach(d => merkleTree.insert(new Transaccion(bloques.length,d.cliente,d.pelicula)))
    } catch (error) {}
    return merkleTree
}

function getDataBlock(bloque) {
    let tr = JSON.parse(localStorage.getItem('transacciones'))
    let tra = []
    tr.forEach(function(t) {
        if(bloque == t.bloque) {
            tra.push(`${t.cliente} - ${t.pelicula}`)
        }
    })
    return tra
}

function getDateTime() {
    let date = new Date()
    const map = {
        dd: String(date.getDate()).padStart(2,'0'),
        mm: String(date.getMonth() + 1).padStart(2,'0'),
        yyyy: date.getFullYear(),
        hh: String(date.getHours()).padStart(2,'0'),
        mi: String(date.getMinutes()).padStart(2,'0'),
        ss: String(date.getSeconds()).padStart(2,'0')
    }
    return `${map.dd}-${map.mm}-${map.yyyy}-::${map.hh}:${map.mi}:${map.ss}`
}

function createBlock() {
    console.log('ENTRA A CREAR BLOQUE')
    try {
        let tr = JSON.parse(localStorage.getItem('transacciones'))
        let merkle
        if(tr.length > 0) {
            tr.forEach(t => delete t.hash)
            localStorage.setItem('transacciones',JSON.stringify(tr))
            merkle = getMerkleTree()
            merkle.buildTree()
        }else {
            merkle = new Merkle()
            merkle.insert(new NodoN(0))
            merkle.buildTree()
        }
        let nuevoBloque = new Bloque(bloques.length,getDateTime(),getDataBlock(bloques.length),merkle.raiz.hash)
        delete nuevoBloque.nonce
        delete nuevoBloque.prev_hash
        delete nuevoBloque.hash
        bloques.push(JSON.parse(JSON.stringify(nuevoBloque)))
        localStorage.setItem('bloques',JSON.stringify(bloques))
        getGraphBlockchain()
    } catch (error) {}
}

function changeDisponible(id) {
    let moviesCharged = JSON.parse(localStorage.getItem('moviesCharged'))
    moviesCharged.forEach(function(movie) { movie.id_pelicula == id ? movie.disponible = false : undefined })
    localStorage.setItem('moviesCharged',JSON.stringify(moviesCharged))
}

function rentMovie(movie,id,info) {
    let client = getClientUser(dpi)
    changeDisponible(id)
    if(localStorage.getItem('transacciones') != null) {
        let transacciones = JSON.parse(localStorage.getItem('transacciones'))
        transacciones.push(JSON.parse(JSON.stringify(new Transaccion(bloques.length,client,movie))))
        localStorage.setItem('transacciones',JSON.stringify(transacciones))
        if(alpha) {
            alpha = false
        }else {
            alpha = true
        }
        if(info) {
            document.getElementsByClassName('fondo_transparente')[0].style.display = 'none'
            document.getElementById('comment-text').value = ''
        }
        movies()
        alert('Película Alquilada')
        return
    }
    localStorage.setItem('transacciones',JSON.stringify([JSON.parse(JSON.stringify(new Transaccion(bloques.length,client,movie)))]))
    if(alpha) {
        alpha = false
    }else {
        alpha = true
    }
    if(info) {
        document.getElementsByClassName('fondo_transparente')[0].style.display = 'none'
        document.getElementById('comment-text').value = ''
    }
    movies()
    alert('Película Alquilada')
}

function dimElement(id) {
    let element = document.getElementById(id)
    return {width: element.clientWidth,height: element.clientHeight}
}

function getGraphBlockchain() {
    try {
        let blockchain = getBlockchain()
        if(blockchain.primero) {
            d3.select('#graph-blockchain').graphviz().width(dimElement('graph-blockchain').width).height(dimElement('graph-blockchain').height).scale(0.48).renderDot(blockchain.getDot())
        }
    } catch (error) {}
}

function getGraphMerkleTree() {
    try {
        let merkle = getMerkleTree()
        if(merkle.list_data.primero) {
            merkle.buildTree()
            d3.select('#graph-merkle-tree').graphviz().width(dimElement('graph-merkle-tree').width).height(dimElement('graph-merkle-tree').height).scale(0.5).renderDot(merkle.getDot())
        }
    } catch (error) {}
}

function Thread(value,iniciado) {
    document.getElementById('temporizador').innerHTML = `Nuevo bloque en: ${value} s`
    getGraphMerkleTree()
    if(value == localStorage.getItem('valueInit') && iniciado) {
        createBlock()
    }
    if(value > 1) {
        localStorage.setItem('value',value)
        setTimeout(function() {Thread(value - 1,false)},1000)
    }else {
        setTimeout(function() {Thread(localStorage.getItem('valueInit'),true)},1000)
    }
}

function start() {
    if(localStorage.getItem('value') == null) {
        Thread(localStorage.getItem('valueInit'),false)
    }else {
        Thread(localStorage.getItem('value'),false)
    }
}

function changeTime() {
    if(document.getElementById('valueNumberInit').value.toString().replace(' ','') != '') {
        localStorage.setItem('valueInit',document.getElementById('valueNumberInit').value)
        window.location.reload()
    }
}

function resetB() {
    localStorage.removeItem('transacciones')
    localStorage.removeItem('valueInit')
    localStorage.removeItem('bloques')
    localStorage.removeItem('value')
    window.location.reload()
}

function resetT() {
    localStorage.removeItem('value')
    window.location.reload()
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
            document.getElementById('rol').checked = false
            localStorage.setItem('2354168452525',JSON.stringify({'active': true}))
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
        localStorage.setItem(clientFind.dpi.toString(),JSON.stringify({'active': true}))
        window.location.href = `ClientProfile.html?dpi=${clientFind.dpi}`
        alert(`Bienvenido ${clientFind.nombre_completo}`)
        return
    }
    alert('Verifique sus credenciales')
    document.getElementById('user').value = ''
    document.getElementById('password').value = ''
}

function logout() {
    localStorage.removeItem(dpi.toString())
    window.location.href = 'index.html'
}

function logoutA() {
    localStorage.removeItem('2354168452525')
    window.location.href = 'index.html'
}

function getNameClient() {
    let clientFind = getClients().search(dpi)
    try {
        document.getElementById('userClient').innerHTML = clientFind.nombre_completo
    } catch (error) {}
    return clientFind.nombre_completo
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

function scroller(id) {scroll(0,getOffset(id).top)}

if(localStorage.getItem('valueInit') == null) {
    localStorage.setItem('valueInit',300)
}

if(localStorage.getItem('bloques') == null) {
    localStorage.setItem('bloques',JSON.stringify([]))
}

if(localStorage.getItem('transacciones') == null) {
    localStorage.setItem('transacciones',JSON.stringify([]))
}

const bloques = JSON.parse(localStorage.getItem('bloques'))