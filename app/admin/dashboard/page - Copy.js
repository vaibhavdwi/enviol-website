"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showReply, setShowReply] = useState(false);

  const [replyContent, setReplyContent] = useState("");
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch enquiries
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", page);

        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (fromDate) params.append("fromDate", fromDate);
        if (toDate) params.append("toDate", toDate);

        const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
        const data = await res.json();

        setEnquiries(data.enquiries || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEnquiries();
  }, [page, search, category, fromDate, toDate]);

  const handleSelect = (enquiry) => {
    setSelected(enquiry);
    setShowReply(false);
  };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === enquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(enquiries.map((e) => e.id));
    }
  };

  const handleReplyClick = (enquiry) => {
    setSelected(enquiry);
    setTo(enquiry.email || "");
    setSubject(`Re: Enquiry #${enquiry.id} - ${enquiry.company}`);
    setReplyContent("");
    setFile(null);
    setShowReply(true);
  };

  const handleBulkReply = () => {
    const emails = enquiries
      .filter((e) => selectedIds.includes(e.id))
      .map((e) => e.email)
      .join(",");

    setTo(emails);
    setSubject("Re: Enquiry Follow-up");
    setReplyContent("");
    setFile(null);
    setShowReply(true);
  };

  const handleSendReply = async () => {
    if (!to || !subject || !replyContent) {
      alert("Please fill required fields");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("to", to);
      formData.append("cc", cc);
      formData.append("subject", subject);
      formData.append("message", replyContent);
      formData.append("contactId", selected.id);

      if (file) formData.append("file", file);

      const res = await fetch("/api/admin/enquiries/reply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Email sent!");

      setReplyContent("");
      setShowReply(false);
      setSelectedIds([]);
      setFile(null);

      // Refresh data
      setPage(1);
    } catch (err) {
      alert("Error sending email");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#42B3A5]">
          Received Enquiries
        </h2>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkReply}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Bulk Reply ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="General Enquiry">General Enquiry</option>
          <option value="Price Enquiry">Price Enquiry</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Ordering">Ordering</option>
          <option value="Delivery">Delivery</option>
          <option value="Payments">Payments</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setPage(1);
            setFromDate(e.target.value);
          }}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setPage(1);
            setToDate(e.target.value);
          }}
          className="border p-2 rounded"
        />

        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setFromDate("");
            setToDate("");
            setPage(1);
          }}
          className="bg-gray-200 px-3 rounded"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-[40px_1.5fr_1fr_2fr_1fr_1fr_1fr_80px] bg-gray-100 text-xs font-semibold px-4 py-2 items-center">
          <div className="flex justify-center">
            <input type="checkbox" onChange={toggleSelectAll} className="w-4 h-4" />
          </div>
          <div>Company</div>
          <div>Person</div>
          <div>Email</div>
          <div>Category</div>
          <div>Phone</div>
          <div>Date</div>
          <div className="text-center">Reply</div>
        </div>

        {enquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className="grid grid-cols-[40px_1.5fr_1fr_2fr_1fr_1fr_1fr_80px] px-4 py-2 border-t items-center"
          >
            <div className="flex justify-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedIds.includes(enquiry.id)}
                onChange={() => toggleCheckbox(enquiry.id)}
              />
            </div>

            <div className="cursor-pointer font-medium" onClick={() => handleSelect(enquiry)}>
              {enquiry.company}
            </div>

            <div>{enquiry.person}</div>
            <div className="text-blue-600 break-words">{enquiry.email}</div>
            <div>{enquiry.category || "-"}</div>
            <div>{enquiry.phone}</div>
            <div>{new Date(enquiry.created_at).toLocaleDateString()}</div>

            <div className="text-center">
              <button onClick={() => handleReplyClick(enquiry)}>➤</button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary + Thread */}
      {selected && !showReply && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">Enquiry Details</h3>

          <p><strong>Company:</strong> {selected.company}</p>
          <p><strong>Person:</strong> {selected.person}</p>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p><strong>Category:</strong> {selected.category}</p>
          <p><strong>Date:</strong> {new Date(selected.created_at).toLocaleString()}</p>

          <div className="mt-3">
            <strong>Message:</strong>
            <p className="mt-1 whitespace-pre-line bg-gray-50 p-3 rounded">
              {selected.message}
            </p>
          </div>

          {/* Reply History */}
          {selected.replies && selected.replies.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Reply History</h4>

              <div className="space-y-3">
                {selected.replies.map((reply) => (
                  <div key={reply.id} className="border rounded p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(reply.created_at).toLocaleString()}
                    </div>

                    <div className="text-sm"><strong>To:</strong> {reply.to_email}</div>
                    {reply.cc_email && (
                      <div className="text-sm"><strong>CC:</strong> {reply.cc_email}</div>
                    )}

                    <div className="text-sm font-medium mt-1">{reply.subject}</div>

                    <div className="mt-2 whitespace-pre-line text-sm">
                      {reply.message}
                    </div>

                    {reply.attachment_name && (
                      <div className="text-xs text-blue-600 mt-2">
                        📎 {reply.attachment_name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => handleReplyClick(selected)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Reply
          </button>
        </div>
      )}

      {/* Reply Panel */}
      {showReply && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">Reply</h3>

          <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full border p-2 mb-3" />
          <input value={cc} onChange={(e) => setCc(e.target.value)} className="w-full border p-2 mb-3" />
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border p-2 mb-3" />

          <textarea
            rows="6"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          {/* Attachment */}
          <div className="mb-3">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {file && (
              <div className="flex items-center gap-3 mt-2 bg-gray-100 px-3 py-2 rounded w-fit">
                <div className="text-sm">
                  <div>{file.name}</div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>

                {(file.type.includes("image") || file.type === "application/pdf") && (
                  <button
                    onClick={() => window.open(URL.createObjectURL(file))}
                    className="text-blue-600 text-sm"
                  >
                    Preview
                  </button>
                )}

                <button
                  onClick={() => setFile(null)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSendReply}
            className="bg-[#42B3A5] text-white px-6 py-2 rounded mt-3"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}