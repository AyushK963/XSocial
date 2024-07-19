import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Link, useNavigate } from "react-router-dom"

import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validation"
import { Button } from "@/components/ui/button"
// import Loader from "@/components/shared/Loader"

import { createUserAccount } from "@/lib/appwrite/api"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/query"
import { Session } from "inspector"
import { useUserContext } from "@/context/AuthContext"
import Loader from "@/components/shared/Loader"



const SignupForm = () => {
  const { toast } = useToast();
  // const isLoading =false;

  const {checkAuthUser,isLoading:isUserLoading} = useUserContext();
  const navigate= useNavigate();

  const {mutateAsync:createUserAccount ,isLoading:isCreatingUser }= useCreateUserAccount();

  const {mutateAsync:signInAccount ,isLoading:isSigningIn }= useSignInAccount();

  

  //1. Define the form
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name:"",
      username: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async  function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser){
      return  toast({title: "Sign-up failed.Please try again."})
    }

    const session = await signInAccount({
      email:values.email,
      password:values.password,
    })

    if(!session){
      return  toast({title: "Sign-up failed.Please try again."})
    }

    const isLoggedIn = await checkAuthUser();
    
    if(isLoggedIn){
      form.reset();

      navigate('/')
    }else {
      return  toast({title: "Sign-up failed.Please try again."})
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col gap-2">
        <img src="/assets/images/logo.png"  />

        <h2 className="h3-bold md:h4-bold pt-5 sm:pt-12"> Create a new Account </h2>
        <p className="text-light-3 small-medium md:base regular mt-2"> 
          To use Snapgram, please enter your detail</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4 mb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text"  className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text"  className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email"  className="shad-input" {...field} />
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
                  <Input type="password"  className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex  flex-col shad-button_primary  content-center gap-2">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                  <Loader/>Loading...
              </div>
            ):"Sign up "}
            </Button>
            <p className="text-small-regular text-light-2 text-center
            mt-2">
              Already have an account?
              <Link to="/sign-in" className="text-primary-500
              text-small-semibold ml-1 ">Log in</Link>
            </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm 