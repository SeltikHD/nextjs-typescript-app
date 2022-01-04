import { Box } from "@mui/material";
import NextImage from 'next/image';

interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
}

interface StaticRequire {
    default: StaticImageData;
}

type StaticImport = StaticRequire | StaticImageData;

type Props = {
    width?: string;
    height?: string;
    alt?: string;
    src: string | StaticImport;
    imgFilter?: boolean;
}

export default function Image({ width = "100%", height = "100%", alt = "Image.", src, imgFilter = false }: Props) {
    return (
        <Box component="section"
            sx={{
                position: "relative",
                width,
                height,
                overflow: "hidden",
            }}
        >
            <NextImage src={src} alt={alt} layout="responsive" objectFit="cover" />
            {imgFilter ? (<Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0, .2)"
                }}
            />) : null}
        </Box>
    );
}