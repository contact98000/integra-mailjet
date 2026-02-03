const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
    '1760a74adeae307c8c320fc74e7840b6',
    'a204b3aee337ab3866303536ceadda4a'
);

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { storeName, clientEmail } = req.body;

        const result = await mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [{
                From: {
                    Email: 'integra@rhd-distribution.com',
                    Name: 'Integra Monaco'
                },
                To: [{
                    Email: clientEmail,
                    Name: storeName
                }],
                Cc: [{
                    Email: 's.fernandes@integra-hpl.com',
                    Name: 'Integra Copy'
                }],
                TemplateID: 7717681,
                TemplateLanguage: true,
                Subject: 'Information Integra Monaco',
                Variables: {
                    store_name: storeName,
                    client_email: clientEmail
                }
            }]
        });

        return res.status(200).json({ success: true, data: result.body });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
