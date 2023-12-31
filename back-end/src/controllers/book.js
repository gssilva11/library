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

book.retrieveAvailable = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: { status: 'AVAILABLE' },
            orderBy: [
                {title: 'asc'}
            ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveBorrowed = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: { status: 'BORROWED' },
            orderBy: [
                {title: 'asc'}
            ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveReserved = async function(req, res){
    try{
        const result = await prisma.book.findMany({
            where: { status: 'RESERVED' },
            orderBy: [
                {title: 'asc'}
            ]
        })
        if(result) res.send(result)
        else res.status(404).end()
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
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

book.retrieveByTitle = async function(req, res){
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

book.retrieveByAuthor = async function(req, res){
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

book.retrieveByCode = async function(req, res){
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

book.delete = async function(req, res) {
    try {
        const result = await prisma.book.delete({
            where: { code: req.params.code },
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