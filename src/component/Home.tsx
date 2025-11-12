import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuthStore } from '@/store/auth';
import { api } from '@/config/axios.config';
import toast from 'react-hot-toast';

const Home = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/auth/me");
        console.log(res);
        setUser(res.data.data.user);
        if (res.data.data.user?.phoneNumber) {
          setPhoneNumberInput(res.data.data.user.phoneNumber);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem("token");
        useAuthStore.getState().logout();
        navigate("/");
      }
    };

    if (!user) fetchUsers();
    else if (user.phoneNumber && !phoneNumberInput) {
      setPhoneNumberInput(user.phoneNumber);
    }

  }, [user, setUser, navigate, phoneNumberInput]);

  const handleSendOtpForDeletion = async () => {
    if (!phoneNumberInput) {
      toast.error("Please enter a phone number to send OTP.");
      return;
    }

    setIsSendingOtp(true);
    try {
      await api.post("/api/auth/resend-otp", { phoneNumber: phoneNumberInput });
      toast.success("OTP sent to " + phoneNumberInput);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const HandleDelete = async () => {
    if (!phoneNumberInput) {
      toast.error("Please enter your phone number for deletion.");
      return;
    }
    if (!otpInput) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      await api.delete("/api/auth/account", {
        data: {
          phoneNumber: phoneNumberInput,
          otp: otpInput
        }
      });
      localStorage.removeItem("token");
      useAuthStore.getState().logout();
      navigate("/");
      toast.success("Cuenta eliminada exitosamente");
    } catch (error: any) {
      console.error("Delete account error:", error);
      toast.error(error.response?.data?.message || "No se pudo eliminar la cuenta");
    } finally {
      setShowDeleteModal(false);
      setPhoneNumberInput('');
      setOtpInput('');
    }
  };

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
              <Button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => setShowDeleteModal(true)}>Delete</Button>
            </div>
          </td>
        </tr>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
            <p className="mb-4">To delete your account, please enter your registered phone number and the OTP sent to it.</p>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Phone Number (e.g., +1234567890)"
                className="border p-2 rounded w-full mb-2"
                value={phoneNumberInput}
                onChange={(e) => setPhoneNumberInput(e.target.value)}
              />
              <Button 
                className="bg-blue-500 text-white px-4 py-2 rounded w-full" 
                onClick={handleSendOtpForDeletion}
                disabled={isSendingOtp}
              >
                {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="border p-2 rounded w-full"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setPhoneNumberInput(''); 
                  setOtpInput('');
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-red-500 text-white px-4 py-2 rounded" 
                onClick={HandleDelete}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;