const { Bot, InlineKeyboard } = require('grammy')

const bot = new Bot(process.env.token)

const fbdl = require("fb-downloader")

bot.command('start', (ctx) => {
    if (ctx.chat.type == 'private') {
        ctx.reply(process.env.text)
    }else{
          ctx.reply(process.env.text_group)
  }
})

bot.on('message',  (ctx) => {
    if (ctx.chat.type == 'private') {
    	  ctx.reply('Downloading..');          
          var pesan = ctx.message.text;
          //let input = ctx.message.text
          // let inputArray = input.split(" ")
         // inputArray.shift()
         // pesan = inputArray.join(" ")
         fbdl(pesan).then(res => {
         const hd = res.hd
         const sd = res.sd
         const keyboard = new InlineKeyboard().url('SD', sd)
          return ctx.reply(`Title: ${res.title}\n[HD Quality](${hd})`, {
            reply_markup: keyboard, parse_mode: 'markdown'
           })
            //ctx.replyWithVideo(res.streamURL, { caption: `Title: ${res.title}`})                                                 
            //ctx.replyWithPhoto({url: res.thumb}, { caption:  `Title: ${res.title}\nSize: ${res.size}\n[Click To Download](${res.download.sd})`, parse_mode: "markdown"})
            //ctx.reply(`Title: ${res.title}\n[Click To Download](${res.download.hd})`, { parse_mode: 'markdown'})
        }).catch(e => {
         console.log(e);
    })
  }
})

bot.start();
