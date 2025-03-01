"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PoliciesPage() {
  const router = useRouter();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetch("/api/policies")
        .then((res) => res.json())
        .then((data) => setPolicies(data))
        .catch((err) => console.error("Error fetching policies:", err));
    }
  }, []);

  if (!policies.length) {
    return <div className="text-center p-6">Loading...</div>;
  }

  // Function to get color for policy status
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Expired":
        return "bg-red-500";
      case "Pending Renewal":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 ">Policies</h1>
      <div className="flex items-center gap-[20px]">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 mb-6 flex-1 card"
          >
            <div className="flex items-center">
              {/* policy Image */}
              <img
                src={policy.image}
                alt={policy.name}
                className="w-16 h-16 rounded-full border mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{policy.name}</h2>
                <p className="text-gray-700 text-policy">
                  {policy.type} - {policy.breed} - {policy.age}
                </p>
              </div>
            </div>

            {/* Policy Status */}
            <div
              className={`mt-4 px-3 py-1 inline-block text-white text-sm rounded ${getStatusColor(
                policy.policy.status
              )}`}
            >
              {policy.policy.status}
            </div>

            {/* Coverage Details */}
            <div className="mt-4">
              <p>
                <strong>Plan:</strong> {policy.policy.plan}
              </p>
              <p>
                <strong>Coverage Limit:</strong> {policy.policy.coverageLimit}
              </p>
              <p>
                <strong>Deductible:</strong> {policy.policy.deductible}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
