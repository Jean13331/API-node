import { fastify } from 'fastify'
import { databasePostgres } from './database-postgres.js'
//import { databasememory} from './databasememory.js'
//const database = new databasememory() // Esta linha está comentada, mas pode causar problemas se for descomentada sem importar o módulo necessário.
const database = new databasePostgres()
const server = fastify()


server.post('/videos', async (request, response) => {
    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration,
    })

    return response.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    //console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, response) => {
    const videosId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videosId, {
        title,
        description,
        duration
    })
    return response.status(204).send()
})

server.delete('/videos/:id', async (request, response) => {
    const videosId = request.params.id

    await database.delete(videosId)

    return response.status(204).send()
})

server.listen({
    host: 0.0.0.,
    port: process.env.port ?? 3333,
})
