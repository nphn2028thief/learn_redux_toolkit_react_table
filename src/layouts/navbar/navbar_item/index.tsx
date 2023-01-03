import { NavLink, LinkProps } from 'react-router-dom';
import { styled, Button, Typography } from '@mui/material';

export interface ILinkProps {
    title?: string;
    to: string;
}

function NavbarItem(props: ILinkProps) {
    return (
        <Typography>
            <NavLink
                to={props.to}
                style={({ isActive }) => ({
                    padding: '12px 16px',
                    textDecoration: 'none',
                    color: isActive ? '#42a5f5' : 'black',
                })}
            >
                {props.title}
            </NavLink>
        </Typography>
    );
}

export default NavbarItem;
