'use client';
import * as z from 'zod';
import { ForgotPasswordSchema } from '@/lib/ZodSchema/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    console.log(data);

    try {
      const response = await fetch('/api/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      toast({
        description: 'An email has been sent to you',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        description: 'An error occurred',
      });
    }
  }

  return (
    <section className="mx-auto mt-4 max-w-lg">
      <Card className="mx-auto max-w-lg shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
        <CardHeader className="">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            We will send you an email to verify it is you
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
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Send Email</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
