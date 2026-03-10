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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch enquiries
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(`/api/admin/enquiries?page=${page}`);
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching enquiries:", err);
      }
    };
    fetchEnquiries();
  }, [page]);

  const handleSelect = (enquiry) => {
    setSelected(enquiry);
    setShowReply(false);
  };

  const toggleCheckbox = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
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
    setSubject(`Re: Enquiry from ${enquiry.company || "Customer"}`);
    setShowReply(true);
  };

  const handleBulkReply = () => {
    const selectedEmails = enquiries
      .filter((e) => selectedIds.includes(e.id))
      .map((e) => e.email)
      .join(",");

    setTo(selectedEmails);
    setSubject("Re: Enquiry Follow-up");
    setShowReply(true);
  };

  const handleSendReply = async () => {
    if (!to || !subject || !replyContent) {
      alert("Please fill To, Subject, and Message");
      return;
    }

    try {
      const res = await fetch("/api/admin/enquiries/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          cc,
          subject,
          message: replyContent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed: " + data.message);
        return;
      }

      alert("Email sent successfully!");
      setReplyContent("");
      setShowReply(false);
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
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

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        <div className="grid grid-cols-7 bg-gray-100 text-xs font-semibold px-4 py-2">
          <div>
            <input
              type="checkbox"
              checked={
                enquiries.length > 0 &&
                selectedIds.length === enquiries.length
              }
              onChange={toggleSelectAll}
            />
          </div>
          <div>Company</div>
          <div>Person</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Date</div>
          <div className="text-center">Reply</div>
        </div>

        {enquiries.map((enquiry) => (
          <div
            key={enquiry.id}
            className="grid grid-cols-7 px-4 py-2 text-sm border-t items-center"
          >
            <div>
              <input
                type="checkbox"
                checked={selectedIds.includes(enquiry.id)}
                onChange={() => toggleCheckbox(enquiry.id)}
              />
            </div>

            <div
              className="cursor-pointer"
              onClick={() => handleSelect(enquiry)}
            >
              {enquiry.company}
            </div>

            <div>{enquiry.person}</div>
            <div className="text-blue-600">{enquiry.email}</div>
            <div>{enquiry.phone}</div>
            <div>
              {new Date(enquiry.created_at).toLocaleDateString()}
            </div>

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

      {/* Selected Detail */}
      {selected && (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
          <h3 className="text-xl font-bold">{selected.company}</h3>
          <p><strong>Contact:</strong> {selected.person}</p>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p className="mt-2">{selected.message}</p>
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
            rows="8"
            maxLength={10000}
            placeholder="Write your message..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          <button
            onClick={handleSendReply}
            className="bg-[#42B3A5] text-white px-6 py-2 rounded"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}