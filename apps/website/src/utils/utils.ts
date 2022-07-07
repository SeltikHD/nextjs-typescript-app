import { resolve, join } from 'path';
import matter from 'gray-matter';
import axios from 'axios';
import fs from 'fs';

const getRootPath = () => resolve(process.cwd(), '../../');

export async function getMDContent(path: string, url?: boolean) {
    if (fs.existsSync(`${join(getRootPath(), path)}.md`) && !url) {
        const fileContents = fs.readFileSync(`${join(getRootPath(), path)}.md`, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            metadata: data,
            content,
            error: null,
        };
    } else if (url) {
        const response = await axios
            .get<string>(path)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                return '';
            });
        const { data, content } = matter(response);

        return {
            metadata: data,
            content,
            error: null,
        };
    }

    return {
        metadata: '',
        content: '',
        error: 'File not found.',
    };
}
