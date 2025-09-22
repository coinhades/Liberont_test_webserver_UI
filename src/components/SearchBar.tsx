import { useState } from "react";

export type SearchFilters = {
  name?: string;
  priceMin?: number;
  priceMax?: number;
};

type Props = {
  onSearch: (filters: SearchFilters) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSearch = () => {
    onSearch({
      name: name || undefined,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
    });
  };

  const handleReset = () => {
    setName("");
    setPriceMin("");
    setPriceMax("");
    onSearch({}); // reset filters
  };

  // Allow pressing Enter to trigger search
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded flex gap-4 items-end flex-wrap">
      {/* Name filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border px-3 py-2 rounded"
          placeholder="Search by name"
        />
      </div>

      {/* Min Price filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Min Price</label>
        <input
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border px-3 py-2 rounded"
          placeholder="0"
        />
      </div>

      {/* Max Price filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Max Price</label>
        <input
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border px-3 py-2 rounded"
          placeholder="100000"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
