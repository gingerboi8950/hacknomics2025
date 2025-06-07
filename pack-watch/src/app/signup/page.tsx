import { UserAuthForm } from "@/components/user-auth-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Create an Account</h1>
        <UserAuthForm mode="sign-up" />
      </div>
    </div>
  )
}
