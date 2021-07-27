// const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

// Midelweare se ejecuta primero el
app.use(express.json())

let notes = [

  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    importat: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    importat: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of',
    date: '2019-05-30T19:20:14.298Z',
    importat: true
  }
]

// const app = http.createServer( (request, response) => {

//     response.writeHead(200, { 'Content-type' : 'application/json' })
//     response.end(JSON.stringify(notes))
// } )

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(404).json({
      error: 'note.content esta vacio'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    importat: typeof note.importat !== 'undefined' ? note.importat : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = 3001
// app.listen( PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })

// 56:32
// error en el delete

// npm install eslint -D
// ./node_modules/.bin/eslint --init
// npm install standard -D

// npm install cors -E
