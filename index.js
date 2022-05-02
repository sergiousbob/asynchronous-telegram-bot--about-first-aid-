const { disable } = require('express/lib/application')
require ('dotenv').config ()
const { Telegraf,
Markup } = require('telegraf')
const text = require ('./texts') 

const bot = new Telegraf(process.env.BOT_TOKEN)/// Create file ".env". And  in the file you will write: BOT_TOKEN = token from  BotFather. And that's it!

bot.on('text', async (ctx) => {

try {
    await  ctx.replyWithHTML ('<b>Welcome, guest. This telegram bot contains information: the algorithm of first aid, types of first aid and contains a video with first aid. At the bottom of the menu, you can select a section. Thank you!</b>', Markup.inlineKeyboard(
        [
          [Markup.button.callback('Algorithm od fisrt aid', 'aid')], 
          [Markup.button.callback('types of first aid', 'types_aid')], 
          [Markup.button.callback('first aid video ', 'aid_video')],
          [Markup.button.callback('more about chanel', 'more')]  
        ]
    ))
} catch (e){
    console.error (e)
}
})

function addActionBot (name, src, text)
{
    bot.action (name, async (ctx)=>{
        try{
            await ctx.answerCbQuery()
            if (src !==false){
                await ctx.replyWithPhoto({
                    source: src
                })
                
            }
            await ctx.replyWithHTML(text,{
            disable_web_page_preview: true
            })
            }catch (e){
            console.error (e)
                    }
    })
}
addActionBot ('aid','./images/first_aid.jpg', text.first_aid)
addActionBot ('types_aid','./images/type_aid.jpg', text.types_aid)
addActionBot ('aid_video', false, text.aid_video)
addActionBot ('more', false, text.more)

bot.launch()
console.log('Bot start working...')

