import { GroupOutlined } from '@mui/icons-material';
import { List, ListItem, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface ILink {
    to: string;
}

const ListItemLink = styled(NavLink)<ILink>(({ theme }) => ({
    width: '100%',
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
    },
    color: 'black',
    padding: '10px 16px',
    textTransform: 'capitalize',
    textDecoration: 'none',
    textAlign: 'center',
}));

export default function Sidebar() {
    return (
        <List
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px 0',
                position: 'relative',
                top: '0',
                bottom: '20px',
                overflow: 'overlay',

                overflowY: 'overlay',
            }}
        >
            <ListItem
                sx={{
                    padding: '0',
                }}
            >
                <ListItemLink
                    to="/admin/stored/courses"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        margin: '0 16px',
                        backgroundColor: isActive ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
                        borderRadius: '4px',
                    })}
                >
                    Quản lý khoá học
                </ListItemLink>
            </ListItem>
            <ListItem sx={{ padding: '0' }}>
                <ListItemLink
                    to="/admin/stored/users"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        backgroundColor: isActive ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
                    })}
                >
                    <GroupOutlined />
                    Quản lý người dùng
                </ListItemLink>
            </ListItem>
        </List>
    );
}
