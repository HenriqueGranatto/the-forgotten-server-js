'use strict'

const Database = use('Database')
const server_error = use('App/Controllers/Http/ServerLogErrorController')

class MarketOfferController 
{
    async create ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token'])

            const market_offers = await Database.table('market_offers').insert(data)

            response.send({status: 200, messagem: "Item criado com sucesso!"})
        }
        catch(e)
        {
            // REGISTRA O ERRO NO BANCO DE DADOS E RETORNA A REQUISIÇÃO
            const data = request.all()
            const code = await server_error.register("MarketOfferController.create", JSON.stringify(data), e.toString(), `${__dirname}/${__filename}`)
            const error = {status: 400, message: "Não foi possível atender à requisição", error: code}
            response.send(error)
        }
    }

    async edit ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token'])

            const market_offers = await Database.table('market_offers').where('id', data.id).update(data)

            response.send({status: 200, messagem: "Dados alterados com sucesso!"})
        }
        catch(e)
        {
            // REGISTRA O ERRO NO BANCO DE DADOS E RETORNA A REQUISIÇÃO
            const data = request.all()
            const code = await server_error.register("MarketOfferController.edit", JSON.stringify(data), e.toString(), `${__dirname}/${__filename}`)
            const error = {status: 400, message: "Não foi possível atender à requisição", error: code}
            response.send(error)
        }
    }

    async delete ({ request, response }) 
    {
        try
        {
            const where = request.only(['id'])

            const market_offers = await Database.table('market_offers').where(where).delete()

            if(market_offers == 0) throw {status: 400, message: "Registro não foi encontrada com os dados informados"}
            
            response.send({status: 200, messagem: "Item deletado com sucesso"})
        }
        catch(e)
        {
            // REGISTRA O ERRO NO BANCO DE DADOS E RETORNA A REQUISIÇÃO
            const data = request.all()
            const code = await server_error.register("MarketOfferController.delete", JSON.stringify(data), e.toString(), `${__dirname}/${__filename}`)
            const error = {status: 400, message: "Não foi possível atender à requisição", error: code}
            response.send(error)
        }
    }

    async show ({ request, response }) 
    {
        try
        {
            const where = request.only(['id'])
            const market_offers = await Database.select('*').from('market_offers').where(where)
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: market_offers})
        }
        catch(e)
        {
            // REGISTRA O ERRO NO BANCO DE DADOS E RETORNA A REQUISIÇÃO
            const data = request.all()
            const code = await server_error.register("MarketOfferController.show", JSON.stringify(data), e.toString(), `${__dirname}/${__filename}`)
            const error = {status: 400, message: "Não foi possível atender à requisição", error: code}
            response.send(error)
        }
    }

    async showAll ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token', 'id'])
            const market_offers = await Database.select('*').from('market_offers').where(data)
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: market_offers})
        }
        catch(e)
        {
            // REGISTRA O ERRO NO BANCO DE DADOS E RETORNA A REQUISIÇÃO
            const data = request.all()
            const code = await server_error.register("MarketOfferController.showAll", JSON.stringify(data), e.toString(), `${__dirname}/${__filename}`)
            const error = {status: 400, message: "Não foi possível atender à requisição", error: code}
            response.send(error)
        }
    }
}

module.exports = MarketOfferController
