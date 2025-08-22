import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod/v3"
import { Input } from "@/components/ui/input"
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { FiLoader } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router"

const userloginSchema = z.object({
    PhoneNumber: z.string().min(1, "Número de teléfono requerido"),
    // OTP: z.string().min(3, "Se requiere OTP")
})
type userloginForm = z.infer<typeof userloginSchema>

const Login = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
    const form = useForm<userloginForm>({
        resolver: zodResolver(userloginSchema),
        defaultValues: {
            PhoneNumber: "",
            // OTP: "",
        }
    })
    const { control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: userloginForm) => {
        setLoading(true)
        try {
            // Simulate API call
            console.log("Form submitted:", data)
            navigate("/otpverify")
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    {/* <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 gasoek-one-regular text-title-sm dark:text-white/90 sm:text-title-md">
                          Inicio de sesión de usuario
                        </h1>
                        <p className="helvetica-medium text-sm text-[#2D2D2D] dark:text-gray-400">
                            ¡Ingresa tu número de teléfono y OTP para iniciar sesión!
                        </p>
                    </div> */}
                    <div>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <FormField
                                        control={control}
                                        name="PhoneNumber"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="helvetica-medium text-[#2D2D2D]">
                                                    Número de teléfono <span className="text-red-500">*</span>{" "}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className={`py-5 ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                        placeholder="Ingrese su número de teléfono"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="helvetica-medium w-full bg-[#005AA3] hover:bg-[#036bc0] text-white py-5" size="sm">
                                            {loading ? <FiLoader className="animate-spin" /> : "Iniciar sesión"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login