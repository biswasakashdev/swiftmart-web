import { AlertTriangle } from "lucide-react"

export default function ErrorPage({ message }: { message?: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-semibold text-gray-800">
          {message || "Something went wrong!"}
        </h1>
        <p className="text-gray-500">
          Please try again later or contact support.
        </p>
      </div>
    </div>
  )
}
