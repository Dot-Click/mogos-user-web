import { Button } from "@/components/ui/button"
import { api } from "@/config/axios.config"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { user, setUser } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/api/auth/me")
      setUser(res.data.data.user)
    }
    if (!user) fetchUsers();
  }, [user, setUser])

  const HandleDelete = async () => {
    try {
    const res = await api.delete("/api/auth/account")
    console.log(res)
    localStorage.removeItem("token")
    useAuthStore.getState().logout()
    navigate("/")
    toast.success("Cuenta eliminada exitosamente")
    } catch (error: any) {
      toast.error("No se pudo eliminar la cuenta")
    }
  }
  return (
    <div>
      <table className="w-full h-6 mb-4 border-collapse">
        <tr className="bg-gray-200">
          <th className="border border-gray-400 p-2 ">ID</th>
          <th className="border border-gray-400 p-2">Full Name</th>
          <th className="border border-gray-400 p-2">Email</th>
          <th className="border border-gray-400 p-2">Role</th>
          <th className="border border-gray-400 p-2">Phone Number</th>
          <th className="border border-gray-400 p-2">Actions</th>
        </tr>
        <tr className="hover:bg-gray-100 text-center">
          <td className="border border-gray-400 p-2 w-60">{user?.id}</td>
          <td className="border border-gray-400 p-2">{user?.fullName}</td>
          <td className="border border-gray-400 p-2">{user?.email}</td>
          <td className="border border-gray-400 p-2">{user?.role}</td>
          <td className="border border-gray-400 p-2">{user?.phoneNumber}</td>
          <td className="border border-gray-400 p-2">
            <div className="flex justify-center ">
              <Button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={HandleDelete}>Delete</Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Home