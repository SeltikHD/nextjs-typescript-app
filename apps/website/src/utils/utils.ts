import axios from 'axios';
import fs from 'fs';
import matter from 'gray-matter';

export async function getMDContent(path: string, url?: boolean) {
    if (fs.existsSync(`${path}.md`) && !url) {
        const fileContents = fs.readFileSync(path, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            metadata: data,
            content,
            error: null
        };
    } else if (url) {
        const response = await axios.get<string>(path).then(res => res.data).catch(err => { console.error(err); return ''; });
        const { data, content } = matter(response);

        return {
            metadata: data,
            content,
            error: null
        };
    }

    return {
        metadata: '',
        content: '',
        error: 'File not found.',
    };
}