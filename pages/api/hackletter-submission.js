import fetch from 'node-fetch';

export default async function hackletterSubmission(req, res) {
  if (req.method === 'POST') {
    const { name, last_name, email, referrer, tags = 'website' } = req.body;

    if (last_name) {
      res.status(200);
    }

    const [firstName, ...otherParts] = name.split(' ');

    const response = await fetch('https://api.mailbluster.com/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.MAILBLUSTER_TOKEN,
      },
      body: JSON.stringify({
        firstName,
        lastName: otherParts && !!otherParts.length && otherParts.join(' '),
        email,
        subscribed: true,
        tags: tags.split(',').map((tag) => tag.trim()),
        meta: {
          referrer,
        },
      }),
    });

    if (response.status === 201) {
      let message = `New subscriber 💌: ${name} added to mailing list.`;
      if (tags.includes('next-notion')) {
        message = `😬 ${name} just subscribed to NextJS Notion course.`;
      }
      try {
        await fetch(
          `https://api.telegram.org/bot${
            process.env.TELEGRAM_API_KEY
          }/sendMessage?chat_id=506959518&text=${encodeURI(message)}`
        );
      } catch (err) {
        res.status(400).json({ message: err });
      }
    }

    res.status(200).json({ message: 'success' });
  } else {
    res.status(404).send();
  }
}
