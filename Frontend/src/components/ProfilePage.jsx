import { useUser } from "../context/UserContext" // Assuming you're using context to get the user data

const ProfilePage = () => {
  const { user } = useUser() // Get user data from context

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl shadow-gray-400 sm:shadow-gray-800 mt-6 sm:mt-40">
      <div className="flex flex-col items-center space-y-3 sm:space-y-4">
        {/* Profile Picture */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQag-l2T5Whi4K_0h1Fc3wj7C0RnSkjf_nH7A&s"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{user?.name || "User Name"}</h2>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="text-gray-800 font-semibold">Email:</span> {user?.email || "user@example.com"}
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            <span className="text-gray-800 font-semibold">Phone:</span> {user?.phone || "1234567890"}
          </p>
        </div>
      </div>

      {/* Additional Info or Buttons */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
          Edit Profile
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base">
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage

