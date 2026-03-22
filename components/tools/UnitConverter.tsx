"use client";

export default function UnitConverter() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Unit Converter</h2>
      <p className="text-gray-600 mb-6">Convert values between px, rem, em, and percentage.</p>
      <input className="w-full p-3 border rounded-lg" placeholder="Enter a value" />
    </div>
  );
}
