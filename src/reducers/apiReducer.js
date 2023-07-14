import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
    reducerPath: 'workoutApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/server'
    }),
    endpoints: (builder) => ({
        getVacationListByName: builder.query({
            query: () => '/forTest',
        }),
    }),
})

export const { useGetVacationListByNameQuery } = serverApi;
