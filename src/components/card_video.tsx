import { Box, IconButton } from '@mui/material';
import { useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import videos from '../assets/videos';

export default function CardVideo() {
    const videoRef = useRef<HTMLVideoElement>();

    const handlePlay = () => {
        videoRef.current?.play();
    };

    return (
        <Box ref={videoRef} component="video" controls sx={{ width: 345 }}>
            <Box component="source" src={videos.myCat} />
        </Box>
    );
}
