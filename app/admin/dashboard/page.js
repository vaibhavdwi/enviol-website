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
  const [attachments, setAttachments] = useState([]);
  const [replyHistory, setReplyHistory] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const LIMIT = 20;

  // Fetch enquiries
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(
          `/api/admin/enquiries?page=${page}&limit=${LIMIT}&search=${search}&category=${category}&fromDate=${fromDate}&toDate=${toDate}`
        );
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      }
    };
    fetchEnquiries();
  }, [page, search, category, fromDate, toDate]);

  const handleSelect = async (enquiry) => {
    setSelected(enquiry);
    setShowReply(false);
    setAttachments([]);
    setReplyContent("");

    // Fetch reply history
    if (enquiry.id) {
      try {
        const res = await fetch(`/api/admin/enquiries/fetch?contactId=${enquiry.id}`);
        const data = await res.json();
        setReplyHistory(data.replies || []);
      } catch (err) {
        console.error("Error fetching reply history:", err);
        setReplyHistory([]);
      }
    }
  };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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
    setSubject(`Re: Enquiry from ${enquiry.company || "Customer"}`);
    setShowReply(true);
    setAttachments([]);
    setReplyContent("");
  };

  const handleBulkReply = () => {
    const selectedEmails = enquiries
      .filter((e) => selectedIds.includes(e.id))
      .map((e) => e.email)
      .join(",");
    setTo(selectedEmails);
    setSubject("Re: Enquiry Follow-up");
    setShowReply(true);
    setAttachments([]);
    setReplyContent("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be <= 5MB");
        return;
      }
      setAttachments([{ file, preview: URL.createObjectURL(file) }]);
    }
  };

  const removeAttachment = () => {
    setAttachments([]);
  };

  const handleSendReply = async () => {
    if (!to || !subject || !replyContent) {
      alert("Please fill To, Subject, and Message");
      return;
    }
    if (!selected?.id) {
      alert("No enquiry selected");
      return;
    }

    const formData = new FormData();
    formData.append("to", to);
    formData.append("cc", cc);
    formData.append("subject", subject);
    formData.append("message", replyContent);
    formData.append("contactId", selected.id);
    if (attachments.length > 0) {
      formData.append("file", attachments[0].file);
    }

    try {
      const res = await fetch("/api/admin/enquiries/reply", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        alert("Failed: " + data.message);
        return;
      }

      alert("Reply saved successfully!");
      setReplyContent("");
      setAttachments([]);
      setShowReply(false);

      // Refresh reply history
      handleSelect(selected);

    } catch (err) {
      console.error(err);
      alert("Error sending reply");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#42B3A5]">Received Enquiries</h2>
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
        {/* Header */}
        <div className="grid grid-cols-[40px_2fr_1.5fr_2fr_1fr_1fr_1fr_80px] bg-gray-100 text-xs font-semibold px-4 py-2">
          <div>
            <input
              type="checkbox"
              checked={enquiries.length > 0 && selectedIds.length === enquiries.length}
              onChange={toggleSelectAll}
            />
          </div>
          <div>Company</div>
          <div>Contact Person</div>
          <div>Email</div>
          <div>Category</div>
          <div>Phone</div>
          <div>Date</div>
          <div className="text-center">Reply</div>
        </div>

        {enquiries.map((enquiry) => (
          <div
            key={`${enquiry.source_type}-${enquiry.id}`}
            className="grid grid-cols-[40px_2fr_1.5fr_2fr_1fr_1fr_1fr_80px] px-4 py-2 text-sm border-t items-center"
          >
            <div>
              <input
                type="checkbox"
                checked={selectedIds.includes(enquiry.id)}
                onChange={() => toggleCheckbox(enquiry.id)}
              />
            </div>
            <div
              className="cursor-pointer font-medium"
              onClick={() => handleSelect(enquiry)}
            >
              {enquiry.company}
            </div>
            <div>{enquiry.person}</div>
            <div className="text-blue-600 break-words">{enquiry.email}</div>
            <div>{enquiry.category || "-"}</div>
            <div>{enquiry.phone}</div>
            <div>{new Date(enquiry.created_at).toLocaleDateString()}</div>
            <div className="text-center">
              <button
                onClick={() => handleReplyClick(enquiry)}
                className="text-[#42B3A5] text-lg"
              >
                ➤
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Selected Detail */}
      {selected && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold">{selected.company}</h3>
          <p><strong>Contact:</strong> {selected.person}</p>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Category:</strong> {selected.category || "-"}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p className="mt-2">{selected.message}</p>

          {/* Reply History */}
          {replyHistory.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-semibold mb-2">Reply History</h4>
              {replyHistory.map((r) => (
                <div key={r.id} className="border p-2 mb-2 rounded">
                  <p><strong>To:</strong> {r.to_email}</p>
                  {r.cc_email && <p><strong>CC:</strong> {r.cc_email}</p>}
                  <p><strong>Subject:</strong> {r.subject}</p>
                  <p>{r.message}</p>
                  {r.attachment_name && (
                    <p>
                      <strong>Attachment:</strong>{" "}
                      <a
                        href={`/uploads/${r.attachment_name}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        {r.attachment_name}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reply Panel */}
      {showReply && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold mb-4">Reply</h3>

          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border p-2 mb-3"
          />
          <input
            type="text"
            placeholder="CC"
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            className="w-full border p-2 mb-3"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-2 mb-3"
          />
          <textarea
            rows="6"
            maxLength={10000}
            placeholder="Write your message..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border p-2 mb-3"
          />
          {/* Attachment */}
          <div className="mb-3">
            <input type="file" onChange={handleFileChange} />
            {attachments.length > 0 && (
              <div className="flex items-center mt-2">
                <span className="mr-2">{attachments[0].file.name} ({(attachments[0].file.size / 1024).toFixed(1)} KB)</span>
                <a
                  href={attachments[0].preview}
                  target="_blank"
                  className="text-blue-600 underline mr-2"
                >
                  Preview
                </a>
                <button
                  onClick={removeAttachment}
                  className="text-red-600 font-bold px-2"
                >
                  X
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleSendReply}
            className="bg-[#42B3A5] text-white px-6 py-2 rounded"
          >
            Send Reply
          </button>
        </div>
      )}
    </>
  );
}