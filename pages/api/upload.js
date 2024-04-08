import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'next-ecomerce';

export default async function handle(req, res) {
    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();
        const links = [];

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                reject(err);
                return;
            }

            const client = new S3Client({
                region: 'eu-north-1',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
                }
            });

            for (const file of files.file) {
                const ext = file.originalFilename.split('.').pop();
                const newFilename = Date.now() + "." + ext;
                try {
                    await client.send(new PutObjectCommand({
                        Bucket: bucketName,
                        Key: newFilename,
                        Body: fs.readFileSync(file.path),
                        ACL: 'public-read',
                        ContentType: mime.lookup(file.path)
                    }));
                    const link = `https://${bucketName}.S3.amazonaws.com/${newFilename}`;
                    links.push(link);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    res.status(500).json({ error: 'Error uploading file' });
                    return;
                }
            }
            res.json({ links });
        });
    });
}

export const config = {
    api: { bodyParser: false }
};
