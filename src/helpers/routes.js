import AttributPage from "../pages/AttributPage"
import BannerPage from "../pages/BannerPage"
import BrandsPage from "../pages/BrandsPage"
import Categories from "../pages/CategoriesPage"
import Dashboard from "../pages/DashboardPage"
import LoginPage from "../pages/LoginPage"
import PageNotFound from "../pages/PageNotFound"
import Products from "../pages/ProductsPage"

export const routes = [
    {
        id: 1,
        path: '/',
        component: <Dashboard/>
    },
    {
        id: 2,
        path: '/products',
        component: <Products/>
    },
    {
        id: 3,
        path: '/categories',
        component: <Categories/>
    },
    {
        id: 4,
        path: '/banner',
        component: <BannerPage/>
    },
    {
        id: 5,
        path: '/attribute',
        component: <AttributPage/>
    },
    {
        id: 6,
        path: '/brand',
        component: <BrandsPage/>
    },
]

export const loginRoutes = [
    {
        id: 7,
        path: '/login',
        component: <LoginPage />,
    },
    {
        id: 8,
        path: '*',
        component: <PageNotFound type='loginroutes' />,
    },
]