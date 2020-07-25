const Discord = require("discord.js");
const { prefix, token, yttoken } = require("./config.json");
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");
const youtube = new YouTube(yttoken);

const client = new Discord.Client();

const queue = new Map();

const skeep = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('เราข้ามเพลงให้นายแล้วนะ')

const strop = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('เราทำการปิดเพลงทั้งหมดให้นายละ')

const info1 = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('สวัสดีจร้า\nข้าคือบอทที่ถูก kato สร้างขึ้นมา\nเพื่อให้ความบันเทิง')

const credit1 = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('Bot made by\n<KatoreTV#5571>')

const progress1 = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('ตอนนี้เรากำลังพัฒนาระบบเกมต่างๆ\nเพื่อได้ให้ความบันเทิงแบบครบวงจร\nซึ่งเราก็ไม่รู้ว่าจะเสร็จตอนไหนด้วย\n55555555')

const whatdo1 = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('เราสามารถเปิดเพลงให้นายได้นะ\nพิมพ์ ;play , ;p เพื่อเลือกเพลง\nพิมพ์ ;skip , ;s เพื่อข้ามเพลงที่กำลังเล่นอยู่\nพิมพ์ ;stop เพื่อหยุดเพลงทั้งหมด')

client.once("ready", () => {
  console.log("---------------------------------------");
  console.log("|        <--Maker credit-->           |");
  console.log("|          KatoreTV#5571              |");
  console.log("---------------------------------------");
  client.user.setStatus('Online');
  client.user.setActivity(';help เพื่อดูคำสั่ง');
  const vol = 5;
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

async function ava(message, serverQueue) {
  const avaname = message.author.tag.split("#");
  const embed14123  = new Discord.MessageEmbed()
    .setTitle(avaname[0])
    .setThumbnail(message.author.displayAvatarURL())  
    .setDescription('This is your profile name')
    .addFields(
      { name: 'User number', value: '#' + avaname[1] , inline : true },
      { name: 'User id', value: message.author.id , inline : true }
    )
    .setColor('RANDOM')

  message.channel.send(embed14123);
}


client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const serverQueue = queue.get(message.guild.id);
  if (message.content.startsWith(`${prefix}`)){
    const commans = message.content.split(" ");
    if(commans[0] === prefix + "p"){
      execute(message, serverQueue);
      return;
    }else if(commans[0] === prefix + "play"){
      execute(message, serverQueue);
      return;
    }else if(commans[0] === prefix + "skip"){
      message.channel.send(skeep);
      skip(message, serverQueue);
      return;
    }else if(commans[0] === prefix + "s"){
      message.channel.send(skeep);
      skip(message, serverQueue);
      return;
    }else if(commans[0] === prefix + "stop"){
      message.channel.send(strop);
      stop(message, serverQueue);
      return;
    }else if(commans[0] === prefix + "help"){
      message.channel.send('เราช่วยอะไรนายไม่ได้หรอก 5555');
      message.channel.send('ถ้าต้องการความช่วยเหลือพิมพ์ ;ทำไรได้ นะ');
    }else if(commans[0] === prefix + "ทำไรได้"){
      message.channel.send( whatdo1).then(sentEmbed => {
        sentEmbed.react("🤖")
      })
    }else if(commans[0] === prefix + "credit"){
      message.channel.send(credit1).then(sentEmbed => {
        sentEmbed.react("💚")
      })
    }else if(commans[0] === prefix + "doing"){
      message.channel.send(progress1).then(sentEmbed => {
        sentEmbed.react("👷🏾")
      })
    }else if(commans[0] === prefix + "info"){
      message.channel.send(info1).then(sentEmbed => {
        sentEmbed.react("👍")
      })
    }else if(commans[0] === prefix + "avatar"){
      ava(message, serverQueue);
      return;
    }
  }});

/*
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}p`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}s`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send('เราช่วยอะไรนายไม่ได้หรอก 5555');
    message.channel.send('ถ้าต้องการความช่วยเหลือพิมพ์ ;ทำไรได้ นะ');
  } else if (message.content.startsWith(`${prefix}info`)) {
    message.channel.send(info1).then(sentEmbed => {
      sentEmbed.react("👍")
  })
  } else if (message.content.startsWith(`${prefix}ทำไรได้`)) {
    message.channel.send( whatdo1).then(sentEmbed => {
      sentEmbed.react("🤖")
    })
  } else if (message.content.startsWith(`${prefix}credit`)) {
    message.channel.send(credit1).then(sentEmbed => {
      sentEmbed.react("💚")
    })
  } else if (message.content.startsWith(`${prefix}doing`)) {
    message.channel.send(progress1).then(sentEmbed => {
      sentEmbed.react("👷🏾")
    })
  } else if (message.content.startsWith(`${prefix}ava`)) {
    ava(message, serverQueue);
  } else if (message.content.startsWith(`${prefix}em`)){
    message.channel.send(emt);
    emt.setTitle('test2')
    message.edit(emt)
  } else if (message.content.startsWith(`${prefix}ed`)){
    message.edit(emt.setTitle('test2'));
  }
});

*/
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "เข้าไปห้องคุยแบบเสียงก่อนสิเดียวเปิดเพลงให้"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "เราไม่มีสิทธิเข้าห้องรนั้นอะ"
    );
  }
  args.shift();
  const songInfo = await youtube.searchVideos(args.join("_"));
  const song = {
    title: songInfo.title,
    url: songInfo.url,
    length: songInfo.length,
    thumbnail: songInfo.thumbnail
  }
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    const addsong = new Discord.MessageEmbed()
      .setColor('#04ff00')
      .setTitle('KatoMusic')
      .setDescription('ทำการเพิ่มเพลง')
      .setThumbnail(songInfo.thumbnail)
      .addFields(
        { name: 'ชื่อเพลง', value: songInfo.title },
        { name: 'ความยาวเพลง', value: songInfo.length, inline: true},
        { name: 'URL', value: songInfo.url, inline: true},
        { name: 'คิวที่', value: serverQueue.songs.length, inline: true}
      )
    return message.channel.send(addsong);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "อยู่ในห้องที่เปิดเพลงก่อนนะแล้วค่อยข้ามเพลง"
    );
  if (!serverQueue)
    return message.channel.send("เพลงหมดแล้วไม่มีให้ฟังต่อแล้ว");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "อยู่ในห้องที่เปิดเพลงก่อนนะแล้วค่อยหยุดเพลง"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  serverQueue.voiceChannel.leave();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    await sleep(10000);
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  const song99 = new Discord.MessageEmbed()
  .setColor('#04ff00')
  .setTitle('KatoMusic')
  .setDescription('กำลังเล่นเพลง')
  .setThumbnail(song.thumbnail)
  .addFields(
    { name: 'ชื่อเพลง', value: song.title },
    { name: 'ความยาวเพลง', value: song.length, inline: true},
    { name: 'URL', value: song.url, inline: true}
  )
  console.log('Playing : ' + song.title + ' (' + song.length + ')');
  serverQueue.textChannel.send(song99);
}
client.login(token);