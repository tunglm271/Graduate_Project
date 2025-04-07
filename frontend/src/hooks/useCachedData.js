import { useQuery } from '@tanstack/react-query';
import api from "../service/api";

export const getDiseases = () => {
    return useQuery({
        queryKey: ['diseases'],
        queryFn: async () => {
            const res = await api.get('diseases');
            return res.data;
        },
        staleTime: 8 * 1000 * 60 * 60
    });
}

export const getAllergies = () => {
    return useQuery({
        queryKey: ['allergies'],
        queryFn: async () => {
            const res = await api.get('allergies');
            return res.data;
        },
        staleTime: 8 * 1000 * 60 * 60
    })
}

export const getMedicines = () => {
    return useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await api.get('medicines');
            return res.data;
        },
        staleTime: 8 * 1000 * 60 * 60
    });
}

export const getIndicatorTypes = () => {
    return useQuery({
        queryKey: ['indicatorTypes'],
        queryFn: async () => {
            const res = await api.get('indicatorTypes');
            return res.data;
        },
        staleTime: 8 * 1000 * 60 * 60
    });
}