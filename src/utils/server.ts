import fs from 'fs';
import * as https from "https";

export const serverCreate = async (idServer: string, type: string, category: string, version: string) => {
    // create a directory in ./ named testlol
    const path = `./servers/${idServer}`;
    fs.mkdirSync(path, { recursive: true });

    // download the server jar from https://serverjars.com/api/fetchJar/${type}/${category}/${version}
    const url = `https://serverjars.com/api/fetchJar/${type}/${category}/${version}`;
    const filePath = `${path}/server.jar`;

    const fileStream = fs.createWriteStream(filePath);

    const request = https.get(url, (response) => {
        response.pipe(fileStream);

        fileStream.on('finish', () => {
            fileStream.close();
            console.log('File downloaded successfully.');
        });
    });

    request.on('error', (err) => {
        console.error('Error downloading file:', err);
    });

    // create eula.txt in the directory with eula=true
    const eulaPath = `${path}/eula.txt`;
    fs.writeFileSync(eulaPath, 'eula=true');

}
