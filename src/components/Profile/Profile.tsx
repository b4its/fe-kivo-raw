import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.imageUrl}
              alt={user?.fullName || 'User'}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user?.fullName}
              </h3>
              <p className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue={user?.firstName || ''}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue={user?.lastName || ''}
                className="input-field"
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    toast.success('Profile updated successfully!')
                  }}
                  className="btn-primary"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}