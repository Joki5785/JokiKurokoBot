const Discord = require('discord.js') ;

const client = new Discord.Client();

const config = require("./config.json");

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

 

const adapters = new FileSync('database.json');

const db = low(adapters);

 

db.defaults({ histoires : [], xp: []}).write()

 

client.on('message', message => {

   

    var msgauthor = message.author.id

 

    if(message.author.bot)return;

 

    if(!db.get("xp").find({user : msgauthor}).value()){

        db.get("xp").push({user : msgauthor, xp: 1}).write();

    }else{

        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();

        console.log(userxpdb)

        var userxp = Object.values(userxpdb)

        console.log(userxp)

        console.log(`Nombre d'xp: ${userxp[1]}`)

 

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

 

        if(message.content === prefix + "xp"){

            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()

            var xpfinal = Object.values(xp);

            var xp_embed = new Discord.RichEmbed()

                .setTitle(`Stat des XP de : ${message.author.username}`)

                .setColor('#F4D03F')

                .addField("XP", `${xpfinal[1]} xp`)

                .setFooter("Enjoy :p")

            message.channel.send({embed : xp_embed})

        }

    }

})

var prefix = config.prefix

client.on('ready', function() {

      console.log("Je suis connecté ")

      client.user.setActivity("En Dev", {type : "PLAYING"} )

})

      client.on('message', async(message)=>{

 let args = message.content.split(" ").slice(1);

        if(message.content === prefix + 'deconnexion'){

   if(!message.member.hasPermission("ADMINISTRATOR")) { return message.channel.send(" ⚠️  Vous n'avez pas les permissions'")} 

   message.channel.send('au revoir 😢..')

                   message.delete().then(client.destroy())

}

if (message.content.startsWith(prefix + "flip")) {

message.delete() 

       let rep = ["Face","Pile"];

       let reptaille = Math.floor((Math.random()* rep.length));

       let flip_embed = new Discord.RichEmbed()

             .setColor("FF7F50")

             .setTitle(rep[reptaille]);

         message.channel.send(flip_embed);

       }

  if(message.content.startsWith(prefix + "servinfo")){

let sicon = message.guild.iconURL

let owner = message.guild.owner

let serverembed = new Discord.RichEmbed()

        .setThumbnail(sicon)

        .addField("Nom:", message.guild.name)

        .addField("ID:", message.guild.id)

        .addField("Propriétère:",owner)

        .addField("Region:", message.guild.region)

        .addField("Créé le:", message.guild.createdAt)

        .addField("Tu as rejoins:", message.member.joinedAt)

        .addField("Membres totales:", message.guild.memberCount)

         message.channel.send(serverembed);

    }

})

client.login(process.env.BOT_TOKEN)
