'use client';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full pl-12 pr-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 border border-gray-400 dark:border-gray-600 text-xs focus:outline-none"
      />
      <AiOutlineSearch size={20} className="absolute left-3 text-gray-500 dark:text-gray-300" />
    </form>
  );
};

export default Search;
