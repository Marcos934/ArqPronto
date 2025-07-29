import { ArrowRight, Building2, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex-1 bg-gray-100 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to TerraraProjetos</h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover exceptional architectural designs for your dream home.
        </p>
      </div>
    </div>
  );
}