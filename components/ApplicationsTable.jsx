"use client";

import { useState, useMemo } from "react";
import { applicationsData } from "../data/applications";

export default function ApplicationsTable() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Get unique industries for dropdown
  const industries = useMemo(() => {
    const unique = Array.from(new Set(applicationsData.map((i) => i.industry)));
    return ["All Industries", ...unique];
  }, []);

  // Filter data based on search and industry
  const filteredData = useMemo(() => {
    return applicationsData.filter((item) => {
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesIndustry =
        industryFilter === "All Industries" || item.industry === industryFilter;
      return matchesSearch && matchesIndustry;
    });
  }, [search, industryFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#55BAAE]"
        />

        {/* Industry Dropdown */}
        <select
          value={industryFilter}
          onChange={(e) => {
            setIndustryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#55BAAE]"
        >
          {industries.map((ind, idx) => (
            <option key={idx} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-left">Industry</th>
              <th className="p-4 font-semibold text-left">Application</th>
              <th className="p-4 font-semibold text-left">Polyol Used</th>
              <th className="p-4 font-semibold text-left">Grade</th>
              <th className="p-4 font-semibold text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-[#55BAAE]/10 transition-all"
                >
                  <td className="p-4">{item.industry}</td>
                  <td className="p-4 font-medium">{item.application}</td>
                  <td className="p-4">{item.polyol}</td>
                  <td className="p-4">{item.grade}</td>
                  <td className="p-4 text-sm text-gray-600">{item.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-[#55BAAE] hover:text-white transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded border transition ${
              currentPage === page
                ? "bg-[#55BAAE] text-white"
                : "hover:bg-[#55BAAE]/20"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-[#55BAAE] hover:text-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}