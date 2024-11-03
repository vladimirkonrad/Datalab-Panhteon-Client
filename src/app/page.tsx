"use client";
import Image from "next/image";
import { useState, useEffect} from 'react';
import {DatePicker} from "@nextui-org/date-picker";
import {now, parseAbsoluteToLocal} from "@internationalized/date";
import React from "react";

interface SalesData {
  MP: string;
  Naziv: string;
  BrojRacuna: number;
  Pazar: string;
  PazarNoFormat: number;
}

interface TotalSales {
  Pazar: string;
  PazarNoFormat: number;
}

interface ApiResponse {
  result1: SalesData[];
  result2: TotalSales[];
}

export default function Home() {
 
  let [date, setDate] = React.useState(parseAbsoluteToLocal(new Date().toISOString()));

  return (
   

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
        
        <DatePicker label="Pick date" className="max-w-[284px]" value={date} onChange={setDate} />
        
          <h1 className="text-2xl font-bold">Daily Sales Report</h1>
          <DailySales />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
  
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vladimirkonrad.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to vladimirkonrad.com →
        </a>
      </footer>
    </div>
  );
}

function DailySales() {
  const [salesData, setSalesData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/api/sales');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!salesData) return <div>No data available</div>;

  return (
    <div className="w-full max-w-4xl">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-400">
              <th className="p-2 text-left">Store</th>
              <th className="p-2 text-right">Receipts</th>
              <th className="p-2 text-right">Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.result1.map((store) => (
              <tr key={store.MP} className="border-b">
                <td className="p-2">{store.Naziv}</td>
                <td className="p-2 text-right">{store.BrojRacuna}</td>
                <td className="p-2 text-right">{store.Pazar}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-400">
              <td className="p-2">Total</td>
              <td className="p-2 text-right">
                {salesData.result1.reduce((acc, store) => acc + store.BrojRacuna, 0)}
              </td>
              <td className="p-2 text-right">{salesData.result2[0].Pazar}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
