import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext, type RecordItem } from "../Auth/UserContext";
import Text from "../../components/Text";

import styles from "./Actions.module.css";

const EditRecordPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecords, updateRecord } = useContext(UserContext);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [duties, setDuties] = useState("");

  const recordId = Number(id);
  const existingRecord = getRecords().find((r) => r.id === recordId);

  useEffect(() => {
    if (existingRecord) {
      setRole(existingRecord.role);
      setCompany(existingRecord.company);
      setStatus(existingRecord.status);
      setDateApplied(existingRecord.dateApplied || "");
      setDuties(existingRecord.duties || "");
    }
  }, [existingRecord]);

  if (!existingRecord) {
    return (
      <div className={styles.form_container}>
        <Text variant="heading">Application Not Found</Text>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated: RecordItem = {
      id: recordId,
      role,
      company,
      status,
      dateApplied,
      duties,
    };

    const success = await updateRecord(updated);
    if (success) {
      navigate(`/applications/${recordId}`);
    }
  };

  return (
    <div className={styles.form_container}>
      <Text variant="heading">Edit Application Record</Text>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.column}>
          <div className={styles.row}>
            <div className={styles.cont}>
              <label>
                <Text variant="p">Role</Text>
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className={styles.cont}>
              <label>
                <Text variant="p">Company</Text>
              </label>
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
              <label>
                <Text variant="p">Date Applied</Text>
              </label>
              <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
              />
            </div>
            <div className={styles.cont}>
              <label>
                <Text variant="p">Status</Text>
              </label>
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
          </div>

          <div className={styles.row}>
            <div className={styles.cont}>
              <label>
                <Text variant="p">Duties</Text>
              </label>
              <textarea
                rows={4}
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={() => navigate(`/applications/${recordId}`)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primary_btn}>
              Update Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRecordPage;
