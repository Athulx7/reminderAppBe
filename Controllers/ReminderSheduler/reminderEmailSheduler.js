const cron = require('node-cron');
const nodemailer = require('nodemailer');
const reminders = require('../../Models/reminderSchema');
const users = require('../../Models/userSchema');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

cron.schedule('0 10 * * *', async () => {
  console.log('Running daily reminder check at', new Date().toISOString());

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const todaysReminders = await reminders.find({ 
      date: today,
      notifyByEmail: true
    });

    for (const reminder of todaysReminders) {
      try {
        const user = await users.findById(reminder.userId);
        if (!user) {
          console.log(`User ${reminder.userId} not found for reminder ${reminder._id}`);
          continue;
        }

        let emailContent;
        switch(reminder.reminderType) {
          case 'birthday':
            emailContent = {
              subject: `🎂 Birthday Reminder: ${reminder.title}`,
              text: `Hello ${user.username},\n\n` +
                    `Today is ${reminder.title}'s birthday!\n\n` +
                    `Don't forget to send your wishes!\n\n` +
                    `Details: ${reminder.description}\n\n` +
                    `Best regards,\nYour Reminder App`
            };
            break;

          case 'loan':
            emailContent = {
              subject: `⚠️ Loan Payment Due: ${reminder.title}`,
              text: `Hello ${user.username},\n\n` +
                    `Reminder: ${reminder.title} payment is due today.\n\n` +
                    `Details: ${reminder.description}\n\n` +
                    `Please make the payment on time.\n\n` +
                    `Best regards,\nYour Reminder App`
            };
            break;

          default:
            emailContent = {
              subject: `🔔 Reminder: ${reminder.title}`,
              text: `Hello ${user.username},\n\n` +
                    `Reminder: ${reminder.title}\n\n` +
                    `Details: ${reminder.description}\n\n` +
                    `Best regards,\nYour Reminder App`
            };
        }

        await transporter.sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: emailContent.subject,
          text: emailContent.text
        });

        console.log(`Sent ${reminder.reminderType} reminder to ${user.email}`);

      } catch (error) {
        console.error(`Error processing reminder ${reminder._id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in reminder job:', error);
  }
});