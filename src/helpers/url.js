export const domain = 'https://ecommerce.main-gate.appx.uz'
export const APP_VERSION = '/adminka'
export const APP_MODE = '/dev'

// Admin Routes

export const loginUrl = '/auth/login'
export const refreshUrl = '/auth/refresh'

// Categories

export const categoriesListUrl = '/category/list'
export const categoryAddUrl = '/category/add'
export const getCategoryUpdateUrl = (id) => `/category/edit/${id}`
export const getCategoryDeleteUrl = (id) => `/category/${id}`

// Attributes

export const attrebuteListUrl = '/attribute/list' 
export const attrebuteAddUrl = '/attribute/add'
export const getAttributeUpdateUrl = (id) => `/attribute/update/${id}`
export const getAttributeDeleteUrl = (id) => `/attribute/delete/${id}`

export const getAttributeValueAddUrl = (id) => `/attribute/add-value/${id}`
export const getAttributeValueUpdateUrl = (id) => `/attribute/update-value/${id}`
export const getAttributeValueDeleteUrl = (id) => `/attribute/delete-value/${id}`

// Brands

export const brandListUrl = '/brand/list'
export const brandAddUrl = '/brand/add'
export const getBrandDeleteUrl = (id) => `/brand/delete/${id}`
export const getBrandUpdateUrl = (id) => `/brand/update/${id}`

// Media API

export const mediaApiDomen = "https://media-api.main-gate.appx.uz/"
export const addFileUrl = '/api/v1/aws'
export const getFileUrl = (name) => `/api/v1/aws/${name}`
export const deleteFileUrl = '/api/v1/aws/delete'

// Products

export const productsListUrl = '/product/list'