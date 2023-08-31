import prisma from '../database/client.js';

const book = {}

book.create = async function(req, res) {
    try {
        await prisma.book.create({data: req.body})

        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

//Mostrar livros disponíveis
book.getAvailableBooks = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: { status: 'available',
            orderBy: [
                {title: 'asc'}
            ] }
        })
        res.send(result)
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveAll = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            orderBy: [
                {title: 'asc'}
            ]
        })
        res.send(result)
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveOneTitle = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: {title: req.params.title} 
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveOneAuthor = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: {author: req.params.author}
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveOneCode = async function(req, res){
    try{
        const result = await prisma.book.findUnique({
            where: { code: req.params.code }
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.update = async function(req, res) {
    try {
        const result = await prisma.book.update({
            where: { code: req.params.code },
            data: req.body
        })
        if(result) res.status(204).end()
        else res.status(404).end()
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

book.updateBorrowed = async function(code) {
    try {
        const result = await prisma.book.update({
            where: { code: code },
            data: { status: 'borrowed' }
        })
        if(result) res.status(204).end()
        else res.status(404).end()
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

book.updateAvailable = async function(code) {
    try {
        const result = await prisma.book.update({
            where: { code: code },
            data: { status: 'available' }
        })
        if(result) res.status(204).end()
        else res.status(404).end()
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export default book