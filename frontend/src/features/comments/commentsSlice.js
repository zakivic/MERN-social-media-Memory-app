import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const commentsAdapter = createEntityAdapter({
    selectId: (comment) => comment._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = commentsAdapter.getInitialState();
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getComments: builder.query({
          query: (id) => `/comments/${id}`,
          providesTags: [ 'Comments' ]  
        }),
        
        addComment: builder.mutation({
            query: ({ id, cmt }) => ({
                url: `/comments/${id}/createComment`,
                method: 'POST',
                body: { cmt }
            }),
            invalidatesTags: [ 'Comments' ],
        }),

        deleteComment: builder.mutation({
            query: ({ commentsId, commentId }) => ({
                url: `/comments/${commentsId}/${commentId}/deleteOneComment`,
                method: 'DELETE',
            }),
            invalidatesTags:[ 'Comments' ],
        }),

        updateComment: builder.mutation({
            query: ({ commentsId, commentId, comment }) => ({
                url: `/comments/${commentsId}/${commentId}/updateComment`,
                method: 'PATCH',
                body: { comment }
            }),

            invalidatesTags:[ 'Comments' ],
        }),       
    })
});


export const { 
   useGetCommentsQuery,
   useAddCommentMutation,
   useDeleteCommentMutation,
   useUpdateCommentMutation
 } = extendedApiSlice;


