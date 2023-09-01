import prisma from '../database/client.js';

const publisher = {}

publisher.create = async function(req, res) {
    try {
        await prisma.publisher.create({data: req.body})

        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

publisher.retrieveAll = async function(req, res){
    try{
        const result = await prisma.publisher.findMany({
            orderBy: [
                {name_p: 'asc'}
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

publisher.retrieveById = async function(req, res){
    try{
        const result = await prisma.publisher.findUnique({
            where: { id_p: req.params.id_p }
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

publisher.retrieveByName = async function(req, res){
    try{
        const result = await prisma.publisher.findMany({
            where: { name_p: req.params.name_p }
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

publisher.update = async function(req, res) {
    try {
        const result = await prisma.publisher.update({
            where: { id_p: req.params.id_p },
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

publisher.delete = async function(req, res) {
    try {
        const result = await prisma.publisher.delete({
            where: { id_p: req.params.id_p },
        })
        if(result) res.status(204).end()
        else res.status(404).end()
    } 
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export default publisher