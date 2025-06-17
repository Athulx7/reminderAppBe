const cron = require('node-cron');
const axios = require('axios');
const reminders = require('../../Models/reminderSchema');
const users = require('../../Models/userSchema');

const sendTelegramMessage = async (chatId, message) => {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELIGRAM_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('Message sent to Telegram chat ID:', chatId);
  } catch (err) {
    console.error('Failed to send Telegram message:', err.message);
  }
}

cron.schedule('0 7 * * *', async () => {
  console.log('🕒 Running daily reminder check at', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

  try {
    const today = new Date().toISOString().split('T')[0];

    const todaysReminders = await reminders.find({
      date: today,
      notifyBySMS: true
    });

    for (const reminder of todaysReminders) {
      try {
        const user = await users.findById(reminder.userId);
        if (!user || !user.telegramChatId) {
          console.warn(`⚠️ User ${reminder.userId} not found or missing telegramChatId`)
          continue;
        }

        let message = `🔔 *Reminder: ${reminder.title}*\nHello ${user.username}, here’s your reminder for today.\n\n📝 ${reminder.description}`;

        if (reminder.reminderType === 'birthday') {
          message = `🎂 *Birthday Reminder: ${reminder.title}*\nHey ${user.username}, today is ${reminder.title}'s birthday!\n🎉 Don’t forget to send your wishes!\n\n📝 ${reminder.description}`;
        } else if (reminder.reminderType === 'loan') {
          message = `⚠️ *Loan Reminder: ${reminder.title}*\nHey ${user.username}, your loan reminder is due today!\n\n📝 ${reminder.description}`;
        }

        await sendTelegramMessage(user.telegramChatId, message);

      } catch (error) {
        console.error(`Error processing reminder ${reminder._id}:`, error.message);
      }
    }

  } catch (error) {
    console.error(' Error in cron job:', error.message);
  }
}, {
  timezone: 'Asia/Kolkata'
});
