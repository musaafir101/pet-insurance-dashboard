export async function GET() {
  const claims = [
    { id: "CLM-001", date: "2025-02-15", amount: "$800", status: "Approved" },
    { id: "CLM-002", date: "2025-01-20", amount: "$450", status: "Pending" },
    { id: "CLM-003", date: "2024-12-10", amount: "$1200", status: "Rejected" },
    { id: "CLM-004", date: "2024-11-05", amount: "$600", status: "Approved" },
  ];

  return Response.json(claims);
}
