'use client';
import * as z from 'zod';
import { PasswordResetSchema } from '@/lib/ZodSchema/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
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
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
type Props = {
  token: string;
};
type PasswordResetSchemaT = z.infer<typeof PasswordResetSchema>;

const PasswordChangeForm = ({ token }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);

  const form = useForm<PasswordResetSchemaT>({
    resolver: zodResolver(PasswordResetSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<PasswordResetSchemaT> = async (data) => {
    console.log(data, token);
    const response = await fetch('/api/forgotpassword', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, token }),
    });

    const { message } = await response.json();
    if (response.status != 201) {
      toast({
        title: 'Sign Up Failed!',
        description: message,
        variant: 'destructive',
      });
    }

    if (response.status === 201) {
      toast({
        title: 'Password Reset Successful!',
        description: message,
      });
      router.push('/signin');
    }
  };

  return (
    <section className="mx-auto mt-4 max-w-lg">
      <Card className="mx-auto max-w-lg shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
        <CardHeader className="">
          <CardTitle>Create New Password</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm New Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Reset</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default PasswordChangeForm;
