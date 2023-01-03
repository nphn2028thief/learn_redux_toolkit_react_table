import React from 'react';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import ICourse from '../../types/course';
import httpRequest from '../../utils/httpRequest';

function Course() {
    const [courses, setCourses] = React.useState<ICourse[]>([]);
    const [isLoadingCourses, setIsLoadingCourses] = React.useState<boolean>(false);

    React.useEffect(() => {
        const controller = new AbortController();
        setIsLoadingCourses(true);

        const getCourses = async () => {
            try {
                const response = await httpRequest.get(`courses`, {
                    signal: controller.signal,
                });

                const dataResponse = await response.data;
                setCourses(dataResponse);
                setIsLoadingCourses(false);
            } catch (error) {
                setIsLoadingCourses(false);
                console.log(error);
            }
        };

        getCourses();

        return () => controller.abort();
    }, []);

    return (
        <Grid container spacing={2} mt={2} px={2}>
            {isLoadingCourses ? (
                <CircularProgress sx={{ justifySelf: 'center', alignSelf: 'center' }} />
            ) : (
                courses &&
                courses.map((course) => (
                    <Grid key={course.id} item xs={12} sm={6} md={3}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                backgroundImage: `url(${course.thumbnailUrl})`,
                                backgroundPosition: '50%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                paddingTop: '56.25%',
                                borderRadius: '16px',
                                objectFit: 'cover',
                            }}
                        />

                        <Stack alignItems="center" mt={1} spacing={0.5} px={2} mb={3}>
                            <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>{course.name}</Typography>
                            <Typography
                                variant="body2"
                                fontFamily={'var(--font-family)'}
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '2',
                                    overflow: 'hidden',
                                }}
                            >
                                {course.description}
                            </Typography>
                        </Stack>
                    </Grid>
                ))
            )}
        </Grid>
    );
}

export default Course;
