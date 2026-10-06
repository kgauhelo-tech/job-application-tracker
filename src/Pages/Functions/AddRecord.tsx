import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../Auth/UserContext";
import Text from "../../components/Text";
import styles from "./Actions.module.css";

const CreateRecordPage = () => {
  const { addRecord } = useContext(UserContext);
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [duties, setDuties] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !company) return;

    const success = await addRecord({
      role,
      company,
      status,
      dateApplied,
      duties,
    });

    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className={styles.form_container}>
      <Text variant="heading">New Job Application</Text>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className={styles.cont}>
              <label>Role</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className={styles.cont}>
              <label>Company</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.cont}>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className={styles.cont}>
              <label>Date Applied</label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.cont}>
              <label>Duties</label>
              <textarea
                rows={4}
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
                placeholder="Key responsibilities or notes..."
              />
            </div>

            <div className={styles.button_group}>
              <button type="button" onClick={() => navigate("/home")}>
                Cancel
              </button>
              <button type="submit" className={styles.primary_btn}>
                Save Application
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecordPage;
