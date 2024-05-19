'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@/lib/ZodSchema/UserSchema';
import { useForm } from 'react-hook-form';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import bcrypt from 'bcrypt';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export default function SignInForm() {
  // In case user is already logged in, redirect to home page
  const router = useRouter();
  const { data: Session } = useSession();
  const { toast } = useToast();
  useEffect(() => {
    if (Session) {
      router.push('/');
      toast({
        title: 'You are already signed in!',
        variant: 'success',
      });
    }
  }, []);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    try {
      // let hashedPassword = await bcrypt.hash(data.password, 10);
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!response?.ok) {
        toast({
          title: 'Sign Unsuccessful!',
          description: response?.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sign Successful!',
          description: 'You have been signed in successfully.',
          variant: 'success',
        });
        router.refresh();
        router.push('/');
      }
    } catch (err) {
      console.log('Error in Sign In', err);
      toast({
        title: 'Sign Unsuccessful!',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  }

  return (
    <section className="mx-auto mt-4 max-w-lg">
      <Card className="mx-auto max-w-lg shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
        <CardHeader className="">
          <CardTitle>Sign Up for your account</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="username"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Sign In</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
