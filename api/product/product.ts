import api from "@/lib/axios";

const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
}

const getProduct = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
}

const getPayment = async (id_tx: string) => {
    const response = await api.get(`/payments?id_tx${id_tx}`);
    return response.data;
}

export { getProducts, getCategories, getProduct, getPayment };