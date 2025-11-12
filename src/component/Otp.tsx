import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/config/axios.config"
import { useAuthStore } from "@/store/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { FiLoader } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import z from "zod/v3"



const userOtpSchema = z.object({
    phoneNumber: z.string().min(1, "Número de teléfono requerido"),
    otp: z.string().min(3, "Se requiere OTP")
})
type userOtp = z.infer<typeof userOtpSchema>

const Otp = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const form = useForm<userOtp>({
        resolver: zodResolver(userOtpSchema),
        defaultValues: {
            phoneNumber: "",
            otp: "",
        }
    })
    const { control, handleSubmit, formState: { isSubmitting } } = form
    const onSubmit = async (data: userOtp) => {
        setLoading(true)
        try {
            const response = await api.post('/api/auth/verify-otp', data)
            console.log(response.data)
            const { token, user } = response.data.data
            localStorage.setItem("token", token)
            useAuthStore.getState().setToken(token)
            useAuthStore.getState().setUser(user)
            toast.success("OTP Correcto")
            setTimeout(() => {
                navigate("/home")
            }, 1000)
        } catch (error) {
            toast.error("OTP expirado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div>
                        <FormProvider {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <FormField
                                        control={control}
                                        name="phoneNumber"
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
                                    <FormField
                                        control={control}
                                        name="otp"
                                        render={({ field, fieldState }) => (
                                            <FormItem>
                                                <FormLabel className="helvetica-medium text-[#2D2D2D]">
                                                    OTP <span className="text-red-500">*</span>{" "}
                                                </FormLabel>
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input
                                                            className={`py-5 ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                                            placeholder="Ingresa tu OTP"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <span
                                                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                                    >
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button type="submit" disabled={isSubmitting} className="helvetica-medium w-full bg-[#005AA3] hover:bg-[#036bc0] text-white py-5" size="sm">
                                            {loading ? <FiLoader className="animate-spin" /> : "Verificar OTP"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp