import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

//exibir lista de jogos
app.get("/games", async (req, res) => {
    const game = await prisma.games.findMany({
        orderBy: {
            name: "asc" //ordeno por ordem alfabetica
        },
        include: {
            genre_games: true,
            nacional_game: true
        }
    })
    res.json(game)
})

//cadastrar novo jogo
app.post("/games", async (req, res)=> {
    const { name, genre_id, nacional_id, release_date } = req.body

    try{
        const sameNameGame = await prisma.games.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                }
            }
        })

        if(sameNameGame){
            res.status(409).send({message: "Ja existe um filme com esse nome"})
        }

        await prisma.games.create({
            data: { 
                name,
                genre_id,
                nacional_id,
                release_date: new Date(release_date)
            }
        })
    }catch(error){
        return res.status(500).send({message: "Ocorreu um erro inesperado"})
    }

    res.status(201).send()
})

//atualizar um jogo no banco
app.put("/games", async (req, res)=> {
    const namegame = await prisma.games.findUnique({
        where: {
            id: 1
        }
    })
    res.status(200).send(namegame)
})

//deletar um jogo
app.delete("/games/:id", async (req, res)=> {

})



app.listen(port, ()=> {
    console.log(`Servidor em execução na porta ${port}`)
})