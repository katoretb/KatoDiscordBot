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
  
    const songInfo = await youtube.searchVideos(args[1]);
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
          { name: 'URL', value: songInfo.url, inline: true}
        )
      return message.channel.send(/*`${song.title}`*/addsong);
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
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
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
    serverQueue.textChannel.send(song99);
  }