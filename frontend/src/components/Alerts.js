import React, { useContext } from "react";
import AlertContext from "../context/alert/alertContext";

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <>
      {alerts.length
        ? alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
              <i className="fas fa-info-circle"></i> {alert.message}
            </div>
          ))
        : ""}
    </>
  );
};

export default Alerts;
