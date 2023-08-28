import prisma from '../database/client.js'

const controller = {}       // Objeto vazio

controller.create = async function(req, res) {
    try {
        await prisma.customer.create({data: req.body})

        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async function(req, res) {
    try {
        const result = await prisma.customer.findMany({
            orderBy: [
                { name: 'asc' }
            ]
        })
        
        // HTTP 200: OK
        res.send(result)
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function(req, res) {
    try {
        const result = await prisma.customer.findUnique({
            where: { cpf: req.params.cpf } // req.params.cpf?
        })

        // Encontrou: restorna HTTP: OK
        if(result) res.send(result)
        // Não encontrou: restorna HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async function(req, res) {
    try {
        const result = await prisma.customer.update({
            where: { cpf: req.params.cpf }, // req.params.cpf?
            data: req.body
        })

        // HTTP 204: No content
        if(result) res.status(204).end()
        // HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async function(req, res) {
    try {
        const result = await prisma.customer.delete({
            where: { cpf: req.params.cpf }
        })

        // HTTP 204: No content
        if(result) res.status(204).end()
        // HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}


export default controller