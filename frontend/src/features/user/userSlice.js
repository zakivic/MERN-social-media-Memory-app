import { apiSlice } from '../../app/api/apiSlice';


export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: [ 'SubUser' ]  
          }),

        signup: builder.mutation({
            query: (data) => ({
                url: '/users/signup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        signin: builder.mutation({
            query: (data) => ({
                url: '/users/signin',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        })

    })
});

export const { 
    useSignupMutation, 
    useSigninMutation,
    useGetUserQuery
 } = userSlice;
