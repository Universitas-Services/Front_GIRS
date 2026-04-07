import axios from 'axios';

const sdkApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_UNIVERSITAS_SDK_URL?.replace(/"/g, ''),
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Estado {
    id: number;
    nombre: string;
}

export interface Municipio {
    id: number;
    estado_id: number;
    nombre: string;
}

export const territorioService = {
    getEstados: async (): Promise<Estado[]> => {
        const response = await sdkApi.get('/api/v1/territorio/estados');
        return response.data.data;
    },

    getMunicipios: async (estadoId: number): Promise<Municipio[]> => {
        const response = await sdkApi.get(`/api/v1/territorio/estados/${estadoId}/municipios`);
        return response.data.data;
    },
};
