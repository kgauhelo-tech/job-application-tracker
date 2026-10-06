import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import Text from "../components/Text";
import { UserContext, type RecordItem } from "../Pages/Auth/UserContext";
import { Edit, Target, Trash3 } from "reicon-react";

const HomePage = () => {
  const { getRecords, deleteRecord } = useContext(UserContext);
  const records = getRecords();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const totalApplications = records.length;
  const interviewsCount = records.filter(
    (r: RecordItem) =>
      r.status.toLowerCase() === "interview" ||
      r.status.toLowerCase() === "interviewed",
  ).length;
  const offerCount = records.filter(
    (r: RecordItem) =>
      r.status.toLowerCase() === "offer" ||
      r.status.toLowerCase() === "offered",
  ).length;
  const rejectedCount = records.filter(
    (r: RecordItem) => r.status.toLowerCase() === "rejected",
  ).length;

  const filteredRecords = useMemo(() => {
    return records
      .filter((record: RecordItem) => {
        const matchesSearch =
          record.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedStatus === "All" ||
          record.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a: RecordItem, b: RecordItem) => {
        const dateA = new Date(a.dateApplied || 0).getTime();
        const dateB = new Date(b.dateApplied || 0).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [records, searchTerm, selectedStatus, sortOrder]);

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
            onClick={() => navigate("/applications/new")}
            className={styles.new_app_btn}
          >
            <Text variant="p">New Application</Text>
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
              {filteredRecords.map((record: RecordItem) => (
                <tr
                  key={record.id}
                  onClick={() => navigate(`/applications/${record.id}`)}
                  className={styles.clickable_row}
                >
                  <td className={styles.role_cell}>
                    <span className={styles.target_icon}>
                      {" "}
                      <Target />
                    </span>
                    <span className={styles.role_title}>{record.role}</span>
                  </td>
                  <td>{record.company}</td>
                  <td>{record.dateApplied || "N/A"}</td>
                  <td>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/applications/${record.id}/edit`);
                      }}
                      className={styles.edit_btn}
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRecord(record.id);
                      }}
                      className={styles.delete_btn}
                    >
                      <Trash3 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HomePage;
