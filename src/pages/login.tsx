import Login from "@/component/login"
import AuthpageLayout from "./AuthpageLayout"

const LoginPage = () => {
  return (
    <div>
      <AuthpageLayout title="Inicio de sesión de usuario"
        subtitle="¡Ingresa tu número de teléfono y OTP para iniciar sesión!"
      >
        <Login />
      </AuthpageLayout>
    </div>
  )
}

export default LoginPage