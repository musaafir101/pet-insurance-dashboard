export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto flex justify-center space-x-6">
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:underline">
          Terms & Conditions
        </a>
        <a href="/contact" className="hover:underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
}
