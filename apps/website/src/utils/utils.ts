import fs from 'fs';
import matter from 'gray-matter';

export async function getMDContent(filePath: string) {
    if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

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
