import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div>
      <table className="w-full h-6 mb-4 border-collapse">
        <tr className="bg-gray-200">
          <th className="border border-gray-400 p-2">ID</th>
          <th className="border border-gray-400 p-2">Title</th>
          <th className="border border-gray-400 p-2">Description</th>
          <th className="border border-gray-400 p-2">Status</th>
          <th className="border border-gray-400 p-2">Actions</th>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="border border-gray-400 p-2">1</td>
          <td className="border border-gray-400 p-2">Sample Task</td>
          <td className="border border-gray-400 p-2">This is a sample task description.</td>
          <td className="border border-gray-400 p-2">Pending</td>
          <td className="border border-gray-400 p-2">
            <div className="flex justify-center ">
            {/* <Button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Button> */}
            <Button className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Home