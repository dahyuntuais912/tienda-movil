import { useState } from 'react'
import './App.css'

function App() {
  const [sesion, setSesion] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState([])

  const productos = [
    { id: 1, nombre: 'Audífonos Bluetooth', precio: 599, emoji: '🎧' },
    { id: 2, nombre: 'Tenis deportivos', precio: 899, emoji: '👟' },
    { id: 3, nombre: 'Mochila', precio: 450, emoji: '🎒' },
    { id: 4, nombre: 'Reloj inteligente', precio: 1299, emoji: '⌚' },
    { id: 5, nombre: 'Lámpara de escritorio', precio: 349, emoji: '💡' },
    { id: 6, nombre: 'Termo', precio: 299, emoji: '🥤' },
  ]

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const agregarCarrito = (producto) => {
    setCarrito([...carrito, producto])
  }

  const eliminarCarrito = (indice) => {
    setCarrito(carrito.filter((_, i) => i !== indice))
  }

  if (!sesion) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>ShopGo</h1>
          <p>Tu tienda en línea</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSesion(true)
            }}
          >
            <label>Correo electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" required />

            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña" required />

            <button type="submit">Iniciar sesión</button>
          </form>

          <p className="registro">¿No tienes cuenta? Regístrate</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>ShopGo</h1>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="carrito-titulo">
          🛒 Carrito ({carrito.length})
        </div>
      </header>

      <main>
        <section className="productos">
          <h2>Productos</h2>
          <p>Encuentra lo que necesitas</p>

          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <div className="producto" key={producto.id}>
                <div className="producto-imagen">{producto.emoji}</div>

                <h3>{producto.nombre}</h3>

                <p className="precio">
                  ${producto.precio.toLocaleString('es-MX')} MXN
                </p>

                <button onClick={() => agregarCarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <p>No se encontraron productos.</p>
          )}
        </section>

        <aside className="carrito">
          <h2>Mi carrito</h2>

          {carrito.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              {carrito.map((producto, indice) => (
                <div className="item-carrito" key={indice}>
                  <div>
                    <strong>{producto.nombre}</strong>
                    <p>${producto.precio} MXN</p>
                  </div>

                  <button onClick={() => eliminarCarrito(indice)}>
                    Eliminar
                  </button>
                </div>
              ))}

              <h3>
                Total: $
                {carrito
                  .reduce((total, producto) => total + producto.precio, 0)
                  .toLocaleString('es-MX')}{' '}
                MXN
              </h3>

              <button className="comprar">Continuar compra</button>
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App