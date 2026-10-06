import React, { useContext, useState, useMemo } from "react";
import styles from "./Home.module.css";
import Text from "../components/Text";
import { UserContext, type RecordItem } from "../Pages/Auth/UserContext";

const HomePage = () => {
  const { getRecords, deleteRecord, updateRecord, addRecord } =
    useContext(UserContext);
  const records = getRecords();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null);
  const [formRole, setFormRole] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formStatus, setFormStatus] = useState("Applied");
  const [formDate, setFormDate] = useState("");

  const totalApplications = records.length;
  const interviewsCount = records.filter(
    (r: any) =>
      r.status.toLowerCase() === "interview" ||
      r.status.toLowerCase() === "interviewed",
  ).length;
  const offerCount = records.filter(
    (r: any) =>
      r.status.toLowerCase() === "offer" ||
      r.status.toLowerCase() === "offered",
  ).length;
  const rejectedCount = records.filter(
    (r: any) => r.status.toLowerCase() === "rejected",
  ).length;

  // Filter & Search Logic
  const filteredRecords = useMemo(() => {
    return records
      .filter((record: any) => {
        const matchesSearch =
          record.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedStatus === "All" ||
          record.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(a.dateApplied || 0).getTime();
        const dateB = new Date(b.dateApplied || 0).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [records, searchTerm, selectedStatus, sortOrder]);

  // Modal actions
  const openNewModal = () => {
    setEditingRecord(null);
    setFormRole("");
    setFormCompany("");
    setFormStatus("Applied");
    setFormDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(true);
  };

  const openEditModal = (record: RecordItem) => {
    setEditingRecord(record);
    setFormRole(record.role);
    setFormCompany(record.company);
    setFormStatus(record.status);
    setFormDate(record.dateApplied || "");
    setIsModalOpen(true);
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRole || !formCompany) return;

    if (editingRecord) {
      await updateRecord({
        ...editingRecord,
        role: formRole,
        company: formCompany,
        status: formStatus,
        dateApplied: formDate,
      });
    } else {
      await addRecord({
        role: formRole,
        company: formCompany,
        status: formStatus,
        dateApplied: formDate,
        duties: "",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.home_cont}>
      <div className={styles.stats_banner}>
        <div className={styles.stat_item}>
          <Text variant="p">
            <strong>Total Applications</strong>
          </Text>
          <span className={styles.stat_number}>
            <Text variant="h1">{totalApplications}</Text>
          </span>
        </div>
        <div className={styles.stat_item}>
          <Text variant="p">
            <strong>Interviews</strong>
          </Text>
          <span className={styles.stat_number}>
            <Text variant="h1">{interviewsCount}</Text>
          </span>
        </div>
        <div className={styles.stat_item}>
          <Text variant="p">
            <strong>Offers</strong>
          </Text>
          <span className={styles.stat_number}>
            <Text variant="h1">{offerCount}</Text>
          </span>
        </div>
        <div className={styles.stat_item}>
          <Text variant="p">
            <strong>Rejected</strong>
          </Text>
          <span className={styles.stat_number}>
            <Text variant="h1">{rejectedCount}</Text>
          </span>
        </div>
      </div>

      <div className={styles.applications_header}>
        <Text variant="heading">Applications</Text>

        <div className={styles.controls_group}>
          <input
            type="text"
            placeholder="Search role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search_input}
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={styles.filter_select}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className={styles.sort_btn}
          >
            Date: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </button>

          <button
            type="button"
            onClick={openNewModal}
            className={styles.new_app_btn}
          >
            New Application
          </button>
        </div>
      </div>

      <div className={styles.records_cont}>
        {filteredRecords.length === 0 ? (
          <Text variant="p">No job applications match your filters.</Text>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record: any) => (
                <tr key={record.id}>
                  <td className={styles.role_cell}>
                    <span className={styles.target_icon}>🎯</span>
                    <span className={styles.role_title}>{record.role}</span>
                  </td>
                  <td>{record.company}</td>
                  <td>{record.dateApplied || "N/A"}</td>
                  <td>
                    {/* Status Color Badge */}
                    <span
                      className={`${styles.status_badge} ${
                        styles[record.status.toLowerCase()] ||
                        styles.default_badge
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className={styles.actions_cell}>
                    <button
                      type="button"
                      onClick={() => openEditModal(record)}
                      className={styles.edit_btn}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRecord(record.id)}
                      className={styles.delete_btn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modal_backdrop}>
          <div className={styles.modal}>
            <h3>{editingRecord ? "Edit Application" : "New Application"}</h3>
            <form onSubmit={handleSaveRecord}>
              <label>Role</label>
              <input
                type="text"
                required
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
              />

              <label>Company</label>
              <input
                type="text"
                required
                value={formCompany}
                onChange={(e) => setFormCompany(e.target.value)}
              />

              <label>Status</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>

              <label>Date Applied</label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />

              <div className={styles.modal_actions}>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.save_btn}>
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
