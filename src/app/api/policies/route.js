export async function GET() {
  const policies = [
    {
      id: "POL-001",
      petName: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      image: "/images/small/dog.jpg", // Placeholder pet image
      policy: {
        plan: "Gold Plan",
        coverageLimit: "$10,000",
        deductible: "$500",
        status: "Active", // Could be "Expired" or "Pending Renewal"
      },
    },
    {
      id: "POL-002",
      petName: "Mittens",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      image: "/images/small/cat.jpg",
      policy: {
        plan: "Silver Plan",
        coverageLimit: "$5,000",
        deductible: "$300",
        status: "Pending Renewal",
      },
    },
  ];

  return Response.json(policies);
}
