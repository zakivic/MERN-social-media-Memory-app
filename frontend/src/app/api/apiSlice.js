import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`); 
        }
        return headers
    }
});

export const apiSlice = createApi({
    reducerPath: 'api', 
    baseQuery: baseQuery,
    tagTypes: ['Pages', 'Posts', 'User', 'Comments'],
    endpoints: builder => ({})
})