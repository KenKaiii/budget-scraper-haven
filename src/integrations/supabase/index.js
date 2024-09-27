import { supabase } from './supabase';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth';

// Import hooks from budget_articles
import {
  useBudgetArticle,
  useBudgetArticles,
  useAddBudgetArticle,
  useUpdateBudgetArticle,
  useDeleteBudgetArticle
} from './hooks/budget_articles';

// Import hooks from users
import {
  useUser,
  useUsers,
  useAddUser,
  useUpdateUser,
  useDeleteUser
} from './hooks/users';

export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  // Budget Articles hooks
  useBudgetArticle,
  useBudgetArticles,
  useAddBudgetArticle,
  useUpdateBudgetArticle,
  useDeleteBudgetArticle,
  // Users hooks
  useUser,
  useUsers,
  useAddUser,
  useUpdateUser,
  useDeleteUser
};