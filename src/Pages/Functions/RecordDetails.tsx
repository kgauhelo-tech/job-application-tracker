import { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { UserContext } from "../Auth/UserContext";
import Text from "../../components/Text";
import styles from "./Actions.module.css";

const ApplicationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecords, deleteRecord } = useContext(UserContext);

  const recordId = Number(id);
  const record = getRecords().find((r) => r.id === recordId);

  if (!record) {
    return (
      <div className={styles.details_container}>
        <Text variant="heading">Record Not Found</Text>
        <button onClick={() => navigate("/home")}>Return to Dashboard</button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      const success = await deleteRecord(record.id);
      if (success) {
        navigate("/home");
      }
    }
  };

  return (
    <div className={styles.details_container}>
      <button className={styles.back_btn} onClick={() => navigate("/home")}>
        <Text variant="p">← Back to Applications</Text>
      </button>

      <div className={styles.content_container}>
        <div className={styles.header}>
          <div>
            <Text variant="p">
              <strong>Role</strong>
            </Text>
            <Text variant="p">{record.role}</Text>
          </div>
        </div>

        <div className={styles.info_section}>
          <Text variant="p">
            <strong>Company</strong>
          </Text>
          <Text variant="p">{record.company}</Text>
        </div>

        <div className={styles.info_section}>
          <Text variant="p">
            <strong>Status</strong>
          </Text>
          <span
            className={`${styles.status_badge} ${
              styles[record.status.toLowerCase()] || styles.default_badge
            }`}
          >
            {record.status}
          </span>
        </div>

        <div className={styles.info_section}>
          <Text variant="p">
            <strong>Date Applied:</strong>
          </Text>
          <Text variant="p">{record.dateApplied || "N/A"}</Text>
        </div>
        <div className={styles.duties_section}>
          <Text variant="subHeading">Duties & Notes</Text>

          <Text variant="p">
            {record.duties ||
              "No duties or details specified for this position."}
          </Text>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.edit_btn}
            onClick={() => navigate(`/applications/${record.id}/edit`)}
          >
            <Text variant="p">Edit</Text>
          </button>
          <button className={styles.delete_btn} onClick={handleDelete}>
            <Text variant="p">Delete</Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
