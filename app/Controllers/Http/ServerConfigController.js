'use strict'

const Database = use('Database')

class ServerConfigController 
{
    async create ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token'])

            const server_config = await Database.table('server_config').insert(data)

            response.send({status: 200, messagem: "Configuracao criada com sucesso!"})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "ServerConfigController.create", messagem: e.message}}
            response.send(error)
        }
    }

    async edit ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token'])

            const server_config = await Database.table('server_config').where('config', data.config).update(data)

            response.send({status: 200, messagem: "Dados alterados com sucesso!"})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "ServerConfigController.edit", messagem: e.message}}
            response.send(error)
        }
    }

    async delete ({ request, response }) 
    {
        try
        {
            const data = request.only(['config'])

            const server_config = await Database.table('server_config').where('config', data.config).delete()

            if(server_config == 0) throw {status: 400, message: "Registro não foi encontrada com os dados informados"}
            
            response.send({status: 200, messagem: "Configuracao deletada com sucesso"})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "ServerConfigController.delete", message: e.message}}
            response.send(error)
        }
    }

    async show ({ request, response }) 
    {
        try
        {
            const data = request.only(['config'])
            const server_config = await Database.select('*').from('server_config').where(data)
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: server_config})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "ServerConfigController.show", message: e.message}}
            response.send(error)
        }
    }

    async showAllIPs ({ request, response }) 
    {
        try
        {
            const server_config = await Database.select('*').from('server_config')
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: server_config})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "ServerConfigController.showAllIPs", message: e.message}}
            response.send(error)
        }
    }
}

module.exports = ServerConfigController