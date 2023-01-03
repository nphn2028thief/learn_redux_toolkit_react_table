import { Box, Button, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import httpRequest from '../utils/httpRequest';

type Props = {
    job: string;
};

interface IJob {
    id: number | string;
    name: string;
}

export default function Jobs() {
    const [idEdit, setIdEdit] = React.useState<string | number>('');
    const [jobs, setJobs] = React.useState<IJob[]>([]);

    const { register, handleSubmit, reset, setValue } = useForm<Props>({
        defaultValues: {
            job: '',
        },
    });

    const handleReset = () => {
        reset();
        setIdEdit('');
    };

    const onSubmit: SubmitHandler<Props> = (data) => {
        if (idEdit) {
            const courseInfo: IJob = {
                id: idEdit,
                name: data.job,
            };

            const updateJob = async (jobId: string | number, data: IJob) => {
                const response = await httpRequest.put(`jobs/${jobId}`, data);
                const newJob = response.data;
                const index = jobs.findIndex((job) => job.id === jobId);

                if (index !== -1) {
                    const newJobs = [...jobs];
                    newJobs.splice(index, 1, newJob);
                    setJobs(newJobs);
                }

                handleReset();
            };
            updateJob(idEdit, courseInfo);
        } else {
            const newCourse = {
                name: data.job,
            };

            const createJob = async (data: Omit<IJob, 'id'>) => {
                const response = await httpRequest.post('jobs', data);
                const dataResponse = await response.data;
                setJobs([...jobs, dataResponse]);
                handleReset();
            };

            createJob(newCourse);
        }
    };

    const handleDoubleClick = (data: IJob) => {
        setValue('job', data.name);
        setIdEdit(data.id);
    };

    return (
        <Box sx={{ margin: '70px auto', width: '480px' }}>
            <Stack direction="row" component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" {...register('job')} label="Enter job" />
                <Button variant="contained" type="submit">
                    {idEdit ? 'Update' : 'Add'}
                </Button>
            </Stack>

            <List>
                {jobs &&
                    jobs.map((item) => (
                        <ListItem key={item.id}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    fontFamily: 'var(--font-family)',
                                    textAlign: {
                                        xs: 'center',
                                        sm: 'left',
                                    },
                                }}
                            >
                                {item.name}
                            </Typography>

                            <Button variant="contained" onClick={() => handleDoubleClick(item)}>
                                Sửa
                            </Button>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}
