import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const postsAdapter = createEntityAdapter({
    selectId: (post) => post._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = postsAdapter.getInitialState();
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPages: builder.query({
            query: () => '/posts/pages',
            providesTags: ['Pages']  
        }),
        
        getPosts: builder.query({
            query: (page) => `/posts?page=${page}`,
            transformResponse: responseData => 
            {return postsAdapter.setAll(initialState, responseData.data)},
            providesTags: (result, error, page) => 
                result
                ? [
                    // Provides a tag for each post in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.ids.map(({ _id }) => ({ type: 'Posts', _id })),
                    { type: 'Posts', _id: 'PARTIAL-LIST' },
                    ]
                : [{ type: 'Posts', _id: 'PARTIAL-LIST' }],
            
        
            
        }),
        // getPostById: builder.query({
        //     query: (id) => `/posts/${id}`,
        // }),
        addPost: builder.mutation({
            query: (data) => ({
                url: '/posts',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (result, error, _id) => [
                { type: 'Pages' },
                { type: 'Posts', _id },
                { type: 'Posts', _id: 'PARTIAL-LIST' },
              ],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, _id) => [
                { type: 'Pages' },
                { type: 'Posts', _id },
                { type: 'Posts', _id: 'PARTIAL-LIST' },
              ],
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: `/posts/${data._id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, _id) => [
                { type: 'Posts', _id },
                { type: 'Posts', _id: 'PARTIAL-LIST' },
              ],
        }),
        likePost: builder.mutation({
            query: ({id, userId, page}) => ({
                url: `/posts/${id}/likePost`,
                method: 'PATCH',
                body: {id}
            }),
            async onQueryStarted({id, userId, page}, { dispatch, queryFulfilled }){
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', Number(page), (draft) =>{
                        const post = draft.entities[id];
                        
                        if (post) {
                            const index = post.likes.findIndex((existUserId) => existUserId === userId);
                            if (index === -1) {
                                post.likes.push(userId);
                              } else {
                                post.likes = post.likes.filter((existUserId) => existUserId !== userId);
                              }
                        }
                    
                    }) 
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                    // alternatively we can trigger a rerender by invalidating the tags
                    // dispatch(extendedApiSlice.util.invalidateTags(['Posts', 'PARTIAL-LIST']))
                }
            }
        }),
        commentPost: builder.mutation({
            query: ({id, page, comment}) => ({
                url: `/posts/${id}/commentPost`,
                method: 'POST',
                body: {comment}
            }),
            async onQueryStarted({id, page, comment}, { dispatch, queryFulfilled }){
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', Number(page), (draft) =>{
                        const post = draft.entities[id];
                        if (post) post.comments.push(comment);          
                    }) 
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                    // alternatively we can trigger a rerender by invalidating the tags
                    // dispatch(extendedApiSlice.util.invalidateTags(['Posts', 'PARTIAL-LIST']))
                }
            }
        }),


    })
});


export const { 
    useGetPagesQuery,
    useGetPostsQuery, 
    useAddPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
    useLikePostMutation,
    useCommentPostMutation
 } = extendedApiSlice;


