import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            })
        }),

        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),

        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details}
            })
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5
        }),

        getUserOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/user`
            }),
            keepUnusedDataFor: 5
        }),

        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL
            }),
            providesTags: ['Ordenes']
        }),
        
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT'
            }),
            invalidatesTags: ['Ordenes']
        })
    })
});

export const { 
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetUserOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation
} = orderApiSlice;