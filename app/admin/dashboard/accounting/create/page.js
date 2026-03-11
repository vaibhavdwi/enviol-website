"use client";

import { useState, useEffect } from "react";

export default function CreateExpense() {
  const [expense, setExpense] = useState({
    category_id: "",
    amount: "",
    expense_date: "",
    incurred_for: "",
    reason: "",
    notes: ""
  });

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", group: "", groupText: "" });

  // Fetch categories and groups
  const fetchCategories = async () => {
    const res = await fetch("/api/admin/accounting/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchGroups = async () => {
    const res = await fetch("/api/admin/accounting/groups");
    const data = await res.json();
    setGroups(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchGroups();
  }, []);

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    if (val === "new") {
      setShowNewCategory(true);
      setExpense({ ...expense, category_id: "" });
    } else {
      setShowNewCategory(false);
      setExpense({ ...expense, category_id: val });
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let categoryId = expense.category_id;

    if (showNewCategory) {
      if (!newCategory.name) {
        alert("New category name is required");
        return;
      }

      // Determine final group name
      let groupNameToUse = newCategory.group;
      if (newCategory.group === "new_group") {
        if (!newCategory.groupText) {
          alert("Please enter new group name");
          return;
        }
        groupNameToUse = newCategory.groupText;
      }

      // Insert new category with optional new group
      const resCat = await fetch("/api/admin/accounting/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.name, group: groupNameToUse })
      });

      const dataCat = await resCat.json();

      if (!resCat.ok) {
        alert(dataCat.message || "Error creating new category");
        return;
      }

      categoryId = dataCat.id;

      // Refresh categories and groups
      await fetchCategories();
      await fetchGroups();

      // Reset new category form
      setShowNewCategory(false);
      setNewCategory({ name: "", group: "", groupText: "" });
      setExpense({ ...expense, category_id: categoryId });
    }

    // Validate main fields
    if (!categoryId || !expense.amount || !expense.expense_date) {
      alert("Category, amount, and date are required.");
      return;
    }

    // Submit expense
    const res = await fetch("/api/admin/accounting/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...expense, category_id: categoryId })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Expense Added Successfully");
      setExpense({ category_id: "", amount: "", expense_date: "", incurred_for: "", reason: "", notes: "" });
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#42B3A5]">Add Expense</h2>

      <div className="space-y-4 max-w-md">

        {/* Category dropdown */}
        <select
          name="category_id"
          value={expense.category_id || ""}
          onChange={handleCategoryChange}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Category --</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          <option value="new">-- Add New Category --</option>
        </select>

        {/* New category block */}
        {showNewCategory && (
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="New Category Name"
              value={newCategory.name}
              onChange={handleNewCategoryChange}
              className="border p-2 rounded w-full"
            />

            {/* Group selection */}
            <select
              name="group"
              value={newCategory.group}
              onChange={handleNewCategoryChange}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select Group / Optional --</option>
              {groups.map((g, i) => <option key={i} value={g}>{g}</option>)}
              <option value="new_group">-- Add New Group --</option>
            </select>

            {/* Add new group input */}
            {newCategory.group === "new_group" && (
              <input
                type="text"
                name="groupText"
                placeholder="Enter New Group Name"
                value={newCategory.groupText}
                onChange={handleNewCategoryChange}
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        )}

        {/* Expense details */}
        <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} className="border p-2 rounded w-full" />
        <input type="date" name="expense_date" value={expense.expense_date} onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="incurred_for" placeholder="Incurred For" value={expense.incurred_for} onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="reason" placeholder="Reason" value={expense.reason} onChange={handleChange} className="border p-2 rounded w-full" />
        <textarea name="notes" placeholder="Notes" value={expense.notes} onChange={handleChange} className="border p-2 rounded w-full" />

        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Save Expense
        </button>
      </div>
    </div>
  );
}