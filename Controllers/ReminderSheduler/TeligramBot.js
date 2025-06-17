const TelegramBot = require('node-telegram-bot-api')
const users = require('../../Models/userSchema')

const bot = new TelegramBot(process.env.TELIGRAM_TOKEN, { polling: true })

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `👋 Hello ${msg.chat.first_name || ''}!\n\nTo connect your account, please send:\n\n/connect YOUR_PHONE_NUMBER`);
})

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text.trim()

  if (/^\d{10}$/.test(text)) {
    try {
      const user = await users.findOneAndUpdate(
        { phoneNo: text },
        { telegramChatId: chatId },
        { new: true }
      )

      console.log(user)

      if (user) {
        bot.sendMessage(chatId, `✅ Your Telegram has been linked to ${user.username}. You will now receive reminders here.`)
      } else {
        bot.sendMessage(chatId, `❌ No account found with phone number ${text}. Please make sure you're registered.`)
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, `⚠️ An error occurred while connecting your account. Please try again later.`)
    }
  }
})

bot.on('message', (msg) => {
  console.log(`Message from ${msg.chat.username || msg.chat.id}: ${msg.text}`)
})
// console.log(process.env.TELIGRAM_TOKEN)