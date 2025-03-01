"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie to check authentication

export default function ClaimsPage() {
  const router = useRouter();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated"); // Read authentication from cookies
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      // Mock Claims Data
      fetch("/api/claims")
        .then((res) => res.json())
        .then((data) => setClaims(data))
        .catch((err) => console.error("Error fetching claims:", err));
    }
  }, []);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Claims</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse card">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Claim ID</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr
                key={claim.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="p-3">{claim.id}</td>
                <td className="p-3">{claim.date}</td>
                <td className="p-3">{claim.amount}</td>
                <td
                  className={`p-3 rounded-md text-sm ${getStatusColor(
                    claim.status
                  )}`}
                >
                  {claim.status}
                </td>
                <td className="p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow-md cursor-pointer">
          Intimate a Claim
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow-md cursor-pointer"
        >
          Change Policy
        </button>
        <button
          onClick={() => router.push("/claims")}
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md cursor-pointer"
        >
          Reimbursement Status
        </button>
        <button
          onClick={() => router.push("/claims")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          View Full History
        </button>
      </div>
    </div>
  );
}
