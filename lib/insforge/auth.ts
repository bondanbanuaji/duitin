import { insforge } from './client';

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await insforge.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await insforge.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await insforge.auth.signOut();
  return { error };
};

export const getUser = async () => {
  const { data: { user } } = await insforge.auth.getUser();
  return user;
};
