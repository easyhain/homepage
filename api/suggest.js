export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Sirf POST requests allow hain' });
    }

    const { suggestion } = req.body;

    // Ye values Vercel ke dashboard se aayengi
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `🚀 *Naya Suggestion Aaya Hai!*\n\nContent: ${suggestion}`,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
}
