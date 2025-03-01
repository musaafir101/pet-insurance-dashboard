"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie to check authentication

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated"); // Read authentication from cookies
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      // Mock User Profile Data
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 890",
        address: "123 Pet Street, Animal City, PA 10001",
        pet: {
          name: "Buddy",
          breed: "Golden Retriever",
          age: "3 years",
          policy: "Gold Plan - $500/year",
        },
      });
    }
  }, []);

  if (!user) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 card">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
      </div>

      {/* Pet Info */}
      <div className="bg-white shadow-md rounded-lg p-6 card">
        <h2 className="text-xl font-semibold mb-2">Pet Details</h2>
        <p>
          <strong>Name:</strong> {user.pet.name}
        </p>
        <p>
          <strong>Breed:</strong> {user.pet.breed}
        </p>
        <p>
          <strong>Age:</strong> {user.pet.age}
        </p>
        <p>
          <strong>Policy:</strong> {user.pet.policy}
        </p>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
