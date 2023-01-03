import PrivateRoute from '../common/private_route';
import config from '../config';
import ContentOnly from '../layouts/content_only';
import CourseManagementPage from '../pages/course_management_page';
import LoginPage from '../pages/login_page';
import ManagementPage from '../pages/management_page';
import RegisterPage from '../pages/register_page';

const publicRoutes = [
    {
        id: 1,
        path: config.routes.login,
        component: LoginPage,
        layout: ContentOnly,
    },
    {
        id: 2,
        path: config.routes.register,
        component: RegisterPage,
        layout: ContentOnly,
    },
    {
        id: 3,
        path: config.routes.admin,
        component: PrivateRoute,
    },
    {
        id: 4,
        path: config.routes.management,
        component: ManagementPage,
    },
    {
        id: 5,
        path: config.routes.coursesManagement,
        component: CourseManagementPage,
    },
];

const privateRoutes: unknown = [];

export { publicRoutes, privateRoutes };
