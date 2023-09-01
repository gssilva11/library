import prisma from '../database/client.js';

const user = {}

user.create = async function(req, res) {
    try {
        await prisma.user.create({data: req.body})

        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

user.retrieveAll = async function(req, res){
    try{
        const result = await prisma.user.findMany({
            orderBy: [
                {name: 'asc'}
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

user.retrieveByCpf = async function(req, res){
    try{
        const result = await prisma.user.findUnique({
            where: { cpf: req.params.cpf }
            // ,
            // orderBy: [
            //     {name: 'asc'}
            // ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

user.retrieveByName = async function(req, res){
    try{
        const result = await prisma.user.findFirstOrThrow({
            where: { name: req.params.name }
            //,
            // orderBy: [
            //     {name: 'asc'}
            // ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

user.retrieveByCode = async function(req, res){
    try{
        const result = await prisma.user.findUnique({
            where: { code: req.params.code }
            //,
            // orderBy: [
            //     {name: 'asc'}
            // ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}
 
user.retrieveByAvailable = async function(req, res){
    try{
        const result = await prisma.user.findMany({
            where: {status: 'AVAILABLE'}
            //,
            // orderBy: [
            //     {name: 'asc'}
            // ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

user.retrieveByUnavailable = async function(req, res){
    try{
        const result = await prisma.user.findMany({
            where: {status: 'UNAVAILABLE'}
            // ,
            // orderBy: [
            //     {name: 'asc'}
            // ]
        })
        if(result) res.send(result)
        else res.status(404).end()
    }
    catch(error){
        console.error(error)
        res.status(500).send(error)
    }
}

user.update = async function(req, res) {
    try {
        const result = await prisma.user.update({
            where: { cpf: req.params.cpf },
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

user.delete = async function(req, res) {
    try {
        const result = await prisma.user.delete({
            where: { cpf: req.params.cpf },
        })
        if(result) res.status(204).end()
        else res.status(404).end()
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export default user