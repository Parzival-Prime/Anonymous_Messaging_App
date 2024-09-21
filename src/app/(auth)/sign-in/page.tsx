'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signInSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

function page() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: Zod.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if(result?.error){
      if(result.error == 'CredentialsSignIn'){
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } 

    if(result?.url){
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:tight-5xl mb-6">
            Join Anonymous Message
          </h1>
          <p className="mb-4">
            Sign Up to start your anonymous adventure
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} onChange={(e) => {
                      field.onChange(e)
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} onChange={(e) => {
                      field.onChange(e)
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              SignIn
            </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member? {' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">SignIn</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
