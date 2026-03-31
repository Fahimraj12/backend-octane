const cron = require('node-cron');
const { Op } = require('sequelize');
// Import your database models (adjust the path as needed for your project)
const { UserMembership } = require('../models'); 

const startMembershipCron = () => {
    // This runs every day at midnight (00:00) server time
    cron.schedule('0 0 * * *', async () => {
        console.log('⏳ Running daily membership expiration sweep...');

        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Find all active memberships where the end_at date has passed
            // and update their status to 'completed'
            const [updatedRows] = await UserMembership.update(
                { status: 'completed' },
                {
                    where: {
                        status: 'active',
                        end_at: {
                            [Op.lt]: today // "Less Than" today
                        }
                    }
                }
            );

            if (updatedRows > 0) {
                console.log(`✅ Successfully marked ${updatedRows} memberships as completed.`);
            } else {
                console.log('✅ No expired memberships found today.');
            }

        } catch (error) {
            console.error('❌ Error updating expired memberships:', error);
        }
    });
};

module.exports = startMembershipCron;