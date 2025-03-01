"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import for authentication check
import ChatBox from "@/components/ChatBox";

const faqs = [
  {
    question: "How do I file a claim?",
    answer: "You can file a claim from the 'Claims' section in your dashboard.",
  },
  {
    question: "What is covered under my pet insurance policy?",
    answer: "Coverage details can be found in the 'Policies' section.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@petinsurance.com or call us at (123) 456-7890.",
  },
];

export default function SupportPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    // Check authentication using cookies
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Support</h1>

      {/* FAQs Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 card">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-3">
            <button
              className="w-full text-left flex justify-between items-center font-medium focus:outline-none"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 transition-opacity duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 card">
        <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
        <p>
          Email:{" "}
          <a
            href="mailto:support@petinsurance.com"
            className="text-blue-500 hover:underline"
          >
            support@petinsurance.com
          </a>
        </p>
        <p>
          Phone: <span className="text-gray-700">(123) 456-7890</span>
        </p>
        <p>Live Chat: Click the chat icon below</p>
      </div>

      {/* Floating Live Chat Button */}
      <div className="fixed bottom-5 right-5">
        <ChatBox />
      </div>
    </div>
  );
}
