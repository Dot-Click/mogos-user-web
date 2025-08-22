import Otp from "@/component/Otp"
import AuthpageLayout from "./AuthpageLayout"

const OtpPage = () => {
    return (
        <div>
            <AuthpageLayout title="Verificar OTP"
                subtitle="¡Ingresa tu OTP para continuar!"
            >
                <Otp />
            </AuthpageLayout>
        </div>
    )
}

export default OtpPage