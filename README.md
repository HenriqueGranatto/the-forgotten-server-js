# The Forgotten Server Web
Um servidor MMORPG baseado em Tibia.  
Implementação baseada no antigo projeto O servidor esquecido.  
O projeto possuí arquitetura NodeJS e é estruturado em Javascript.  
Projeto Original: https://github.com/otland/forgottenserver

# Links Úteis
- REPOSITÓRIO -> https://github.com/HenriqueGranatto/the-forgotten-server-web
- TRELLO -> https://trello.com/invite/b/fXRUjILZ/2bc9dd88e396fbb19d4e2deedab6d801/otserver-js
- DISCORD -> https://discord.gg/Vvc636k

# IMPORTANTE
Há um bug no sistema de autenticação, já sabemos a causa e a correção será realizada.  
Porém enquanto o mesmo não é corrigido, para que o sistema funcione comentem o seguinte código:  
  
Arquivo: node_modules/@adonisjs/auth/src/Schemes/Jwt.js
Linhas: 256 - 258