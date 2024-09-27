import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### budget_articles

| name             | type                        | format    | required |
|------------------|---------------------------|-----------|----------|
| id               | int8                      | integer   | true     |
| title            | text                      | string    | true     |
| link             | text                      | string    | true     |
| publication_date | timestamp without time zone | string    | true     |
| content          | text                      | string    | false    |
| created_at       | timestamp without time zone | string    | false    |
| updated_at       | timestamp without time zone | string    | false    |
| user_id          | uuid                      | string    | false    |

Foreign Key Relationships:
- user_id references users.id
*/

export const useBudgetArticle = (id) => useQuery({
    queryKey: ['budget_articles', id],
    queryFn: () => fromSupabase(supabase.from('budget_articles').select('*').eq('id', id).single()),
});

export const useBudgetArticles = () => useQuery({
    queryKey: ['budget_articles'],
    queryFn: () => fromSupabase(supabase.from('budget_articles').select('*')),
});

export const useAddBudgetArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newArticle) => fromSupabase(supabase.from('budget_articles').insert([newArticle])),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budget_articles'] });
        },
    });
};

export const useUpdateBudgetArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('budget_articles').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budget_articles'] });
        },
    });
};

export const useDeleteBudgetArticle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('budget_articles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budget_articles'] });
        },
    });
};