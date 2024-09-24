'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then((res) => res.json())
      .then((data) => setMakes(data.Results));
  }, []);

 
  useEffect(() => {
    console.log('Selected Make:', selectedMake);
    console.log('Selected Year:', selectedYear);
  }, [selectedMake, selectedYear]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./assets/Gemini_Generated_Image_s5t2ys5t2ys5t2ys.jpeg')" }}>
      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold text-center mb-5 text-[#ff0000] animate-bounce">
          CAR DEALER
        </h1>

        <div className="mb-4">
          <div className="mb-4">
            <label className="mb-2 text-white">Vehicle Make:</label>
            <select
              className="p-2 border rounded w-full"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
            >
              <option value="">Select</option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 text-white">Model Year:</label>
            <select
              className="p-2 border border-gray-300 rounded w-full"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select</option>
              {Array.from({ length: currentYear - 2015 + 1 }, (_, index) => (
                <option key={index} value={2024 - index}>
                  {2024 - index}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Link
          className={`block text-center p-3 bg-[#ff0000] hover:bg-[#860101] hover:scale-105 text-white rounded transition duration-200 ${!selectedMake || !selectedYear ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={(e) => {
            if (!selectedMake || !selectedYear) {
              e.preventDefault();
              console.log('Selected Make or Year is invalid, navigation prevented.');
            }
          }}
          href={`/result/${selectedMake}/${selectedYear}`}
        >
          Next
        </Link>
      </div>
    </div>

  );
}
