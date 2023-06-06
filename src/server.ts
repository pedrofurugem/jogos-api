import express from "express";
import { PrismaClient } from "@prisma/client";

const port = 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/games", async (req, res) => {
    const game = await prisma.games.findMany()
    res.json(game)
})

app.listen(port, ()=> {
    console.log(`Servidor em execução na porta ${port}`)
})