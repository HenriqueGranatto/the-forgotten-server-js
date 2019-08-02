'use strict'

const Database = use('Database')

class GuildInviteController 
{
    async create ({ request, response }) 
    {
        try
        {
            const data = request.except(['publicCode', 'token'])

            const guild_invites = await Database.table('guild_invites').insert(data)

            response.send({status: 200, messagem: "Convite de guilda criada com sucesso!"})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "GuildInviteController.create", messagem: e.message}}
            response.send(error)
        }
    }

    async delete ({ request, response }) 
    {
        try
        {
            const where = request.only(['player_id', 'guild_id'])

            const guild_invites = await Database.table('guild_invites').where(where).delete()

            if(guild_invites == 0) throw {status: 400, message: "Guilda não foi encontrada com os dados informados"}
            
            response.send({status: 200, messagem: "Convite de guilda deletada com sucesso"})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "GuildInviteController.delete", message: e.message}}
            response.send(error)
        }
    }

    async show ({ request, response }) 
    {
        try
        {
            const where = request.only(['player_id', 'guild_id'])
            const guild_invites = await Database.select('*').from('guild_invites').where(where)
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: guild_invites})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "GuildInviteController.show", message: e.message}}
            response.send(error)
        }
    }

    async showAllGuildInvites ({ request, response }) 
    {
        try
        {
            const where = request.except(['publicCode', 'token'])
            const guild_invites = await Database.select('*').from('guild_invites').where(where)
            response.send({status: 200, messagem: "Pesquisa realizada. Dados encontrados:", data: guild_invites})
        }
        catch(e)
        {
            // RETORNA ALGUM POSSÍVEL ERRO
            const error = {status: 400, message: "Não foi possível atender à requisição", error: {code: "GuildInviteController.show", message: e.message}}
            response.send(error)
        }
    }
}

module.exports = GuildInviteController