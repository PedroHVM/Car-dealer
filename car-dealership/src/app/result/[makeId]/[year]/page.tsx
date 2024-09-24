"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResultPage() {
  const { makeId, year } = useParams(); 
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      if (makeId && year) {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
          );
          const data = await response.json();

          if (data.Results && data.Results.length > 0) {
            setModels(data.Results);
          } else {
            setError('Any model found.');
          }
        } catch (err) {
          setError('Error when searching for models. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchModels();
  }, [makeId, year]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center">
      <div className="w-full h-full mx-auto p-6 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg relative">
        {/* Botão de Voltar */}
        <Link href="/" className="absolute top-4 left-4 p-3 bg-[#ff0000] hover:bg-[#860101] text-white rounded transition duration-200">
        Go back
        </Link>

        <h1 className="text-3xl font-semibold mb-6 text-center text-[#ff0000]">
          Models from {year}
        </h1>
        {models.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {models.map((model) => (
              <li key={model.Model_Name} className="border p-4 rounded shadow-lg bg-white hover:bg-gray-200 transition duration-300">
                <p className="text-lg font-semibold">{model.Make_Name} - {model.Model_Name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No models found for this make and year.</p>
        )}
      </div>
    </div>
  );
}


