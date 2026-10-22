import { useState } from 'react'
import './App.css'

function App() {
  const [sesion, setSesion] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [carrito, setCarrito] = useState([])

const productos = [
  { id: 1, nombre: 'Audífonos Bluetooth', precio: 599, emoji: '🎧', categoria: 'Tecnología' },
  { id: 2, nombre: 'Tenis deportivos', precio: 899, emoji: '👟', categoria: 'Moda' },
  { id: 3, nombre: 'Mochila', precio: 450, emoji: '🎒', categoria: 'Accesorios' },
  { id: 4, nombre: 'Reloj inteligente', precio: 1299, emoji: '⌚', categoria: 'Tecnología' },
  { id: 5, nombre: 'Lámpara de escritorio', precio: 349, emoji: '💡', categoria: 'Hogar' },
  { id: 6, nombre: 'Termo', precio: 299, emoji: '🥤', categoria: 'Accesorios' },
]

const productosFiltrados = productos.filter((producto) => {
  const coincideNombre = producto.nombre
    .toLowerCase()
    .includes(busqueda.toLowerCase())

  const coincideCategoria =
    categoria === 'Todas' || producto.categoria === categoria

  return coincideNombre && coincideCategoria
})

const agregarCarrito = (producto) => {
  const existe = carrito.find((item) => item.id === producto.id)

  if (existe) {
    setCarrito(carrito.map((item) =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    ))
  } else {
    setCarrito([...carrito, { ...producto, cantidad: 1 }])
  }
}

const cambiarCantidad = (id, cambio) => {
  setCarrito(carrito.map((item) =>
    item.id === id
      ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
      : item
  ))
}

const eliminarCarrito = (id) => {
  setCarrito(carrito.filter((item) => item.id !== id))
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
🛒 Carrito ({carrito.reduce((total, producto) => total + producto.cantidad, 0)})
        </div>
      </header>

      <main>
        <section className="productos">
          <h2>Productos</h2>
          <p>Encuentra lo que necesitas</p>

          <div className="categorias">
  <label htmlFor="categoria">Categoría: </label>

  <select
    id="categoria"
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
  >
    <option value="Todas">Todas</option>
    <option value="Tecnología">Tecnología</option>
    <option value="Moda">Moda</option>
    <option value="Accesorios">Accesorios</option>
    <option value="Hogar">Hogar</option>
  </select>
</div>
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
{carrito.map((producto) => (
  <div className="item-carrito" key={producto.id}>
    <div>
      <strong>{producto.nombre}</strong>

      <p>${producto.precio.toLocaleString('es-MX')} MXN c/u</p>

      <div className="cantidad">
        <button onClick={() => cambiarCantidad(producto.id, -1)}>
          -
        </button>

        <span>{producto.cantidad}</span>

        <button onClick={() => cambiarCantidad(producto.id, 1)}>
          +
        </button>
      </div>

      <p>
        Subtotal: ${(producto.precio * producto.cantidad).toLocaleString('es-MX')} MXN
      </p>
    </div>

    <button onClick={() => eliminarCarrito(producto.id)}>
      Eliminar
    </button>
  </div>
))}

              <h3>
                Total: $
{carrito
  .reduce((total, producto) => total + producto.precio * producto.cantidad, 0)
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