import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual

// Creación del servidor HTTP
const server = createServer((req, res) => {
  const { method, url } = req

  // Manejo de solicitudes GET
  if (method === 'GET') {
    if (url === '/') {
      const filePath = join(__dirname, 'views', 'home.html')
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else if (url === '/login') {
      const filePath = join(__dirname, 'views', 'login.html')
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else if (url === '/register') {
      const filePath = join(__dirname, 'views', 'register.html')
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(data)
      })
    } else {
      const filePath = join(__dirname, 'public', url)
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        const contentType = getContentType(filePath)
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
      })
    }
  }
  // Manejo de solicitudes POST
  else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
    } else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404)
      res.end('Ruta no encontrada')
    }
  }
})

// Configuración del puerto del servidor
const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})
