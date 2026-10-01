import React, { useEffect, useMemo, useState } from "react";
import { careTypes, locationCatalog, orderCatalog } from "../data/doctorCatalogs";
import {
  advanceOrderStatus,
  completeInsuranceMilestone,
  loadStoredPatients,
  submitConsult,
  subscribeToStore
} from "../services/sharedPatientStore";
import { GoogleIcon } from "../GoogleIcons";
import "../doctor-dashboard.css";

const emptyForm = {
  careType: "Diabetes Care",
  locationId: locationCatalog[0].id,
  selectedOrders: [],
  fastingRequired: false,
  estimatedWait: 10
};

function patientReport(value) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  if (value === "unsure") return "Not sure";
  return "Not reported";
}

function formForPatient(patient) {
  if (!patient) return emptyForm;
  const location = locationCatalog.find((item) => item.title === patient.nextStep.title) || locationCatalog[0];
  return {
    careType: patient.careType,
    locationId: location.id,
    selectedOrders: [],
    fastingRequired: patient.fastingQuestion.asked,
    estimatedWait: patient.estimatedWait
  };
}

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(() => loadStoredPatients());
  const [screen, setScreen] = useState("queue");
  const [selectedPatientId, setSelectedPatientId] = useState(() => patients[0]?.patientId);
  const [form, setForm] = useState(() => formForPatient(patients[0]));
  const [notice, setNotice] = useState("");

  useEffect(() => subscribeToStore(() => setPatients(loadStoredPatients())), []);

  const selectedPatient = useMemo(
    () => patients.find((patient) => patient.patientId === selectedPatientId) || patients[0],
    [patients, selectedPatientId]
  );

  const choosePatient = (patientId, targetScreen = screen) => {
    const patient = patients.find((item) => item.patientId === patientId);
    setSelectedPatientId(patientId);
    setForm(formForPatient(patient));
    setNotice("");
    setScreen(targetScreen);
  };

  const toggleOrder = (orderId) => {
    setForm((current) => ({
      ...current,
      selectedOrders: current.selectedOrders.includes(orderId)
        ? current.selectedOrders.filter((id) => id !== orderId)
        : [...current.selectedOrders, orderId]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextStep = locationCatalog.find((item) => item.id === form.locationId);
    const orders = orderCatalog
      .filter((item) => form.selectedOrders.includes(item.id))
      .map(({ id: _id, ...order }) => order);
    submitConsult(selectedPatient.patientId, {
      careType: form.careType,
      nextStep: { title: nextStep.title, location: nextStep.location, floorTape: nextStep.floorTape },
      orders,
      fastingRequired: form.fastingRequired,
      estimatedWait: form.estimatedWait
    });
    setPatients(loadStoredPatients());
    setNotice(`Consult submitted for ${selectedPatient.name}.`);
    setScreen("queue");
  };

  const handleOrderAdvance = (patientId, orderRef) => {
    advanceOrderStatus(patientId, orderRef);
    setPatients(loadStoredPatients());
  };

  const handleMilestone = (patientId, milestoneIndex) => {
    completeInsuranceMilestone(patientId, milestoneIndex);
    setPatients(loadStoredPatients());
  };

  return (
    <div className="doctor-app">
      <header className="doctor-header">
        <a className="doctor-brand" href="#doctor" aria-label="MedCode doctor dashboard"><span className="doctor-brand-mark"><GoogleIcon name="HeartPulse" size={21} /></span><strong>medcode</strong></a>
        <span className="doctor-context">Clinical operations</span>
        <a className="doctor-patient-link" href="#visit">Patient view</a>
      </header>

      <main className="doctor-main">
        <div className="doctor-title-row">
          <div><h1>Doctor dashboard</h1><p>{patients.length} patients in today’s working queue</p></div>
          <nav aria-label="Doctor dashboard screens">
            <button className={screen === "queue" ? "active" : ""} onClick={() => setScreen("queue")}>Queue</button>
            <button className={screen === "check-in" ? "active" : ""} onClick={() => setScreen("check-in")}>Check-in</button>
            <button className={screen === "consult" ? "active" : ""} onClick={() => setScreen("consult")}>Consult</button>
            <button className={screen === "status" ? "active" : ""} onClick={() => setScreen("status")}>Status</button>
          </nav>
        </div>

        {notice && <div className="doctor-notice" role="status">{notice}</div>}

        {screen === "queue" && <section aria-labelledby="queue-title">
          <div className="screen-heading"><h2 id="queue-title">Patient queue</h2><p>Select a patient to open the consult form.</p></div>
          <div className="table-wrap">
            <table className="doctor-table">
              <thead><tr><th>Token</th><th>Name</th><th>Care type</th><th>Current stage</th><th>Wait</th></tr></thead>
              <tbody>{patients.map((patient) => (
                <tr key={patient.patientId} onClick={() => choosePatient(patient.patientId, "consult")} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && choosePatient(patient.patientId, "consult")}>
                  <td><strong>{patient.token}</strong></td>
                  <td>{patient.name}<small>{patient.patientId}</small></td>
                  <td>{patient.careType}</td>
                  <td>{patient.stages[patient.currentStageIndex]?.name || "Complete"}</td>
                  <td>{patient.estimatedWait} min</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>}

        {screen === "check-in" && selectedPatient && <section aria-labelledby="check-in-title">
          <div className="screen-heading status-heading"><div><h2 id="check-in-title">Patient check-in details</h2><p>Patient-reported information for staff review before vitals and consultation.</p></div><label>Patient<select value={selectedPatient.patientId} onChange={(event) => choosePatient(event.target.value, "check-in")}>{patients.map((patient) => <option key={patient.patientId} value={patient.patientId}>{patient.token} · {patient.name}</option>)}</select></label></div>
          <div className="checkin-review-grid">
            <section className="checkin-review-panel"><h3>Identity documents</h3><dl>
              <div><dt>Aadhaar</dt><dd>{selectedPatient.checkIn?.aadhaarReady ? "Ready to show · staff verification pending" : "Not marked ready"}</dd></div>
              <div><dt>PAN</dt><dd>{selectedPatient.checkIn?.panReady ? "Ready to show · staff verification pending" : "Not marked ready"}</dd></div>
            </dl><p>Do not record ID numbers in this view. Complete verification at the centre.</p></section>
            <section className="checkin-review-panel"><h3>Medical history</h3><p>{selectedPatient.checkIn?.medicalHistory || "No patient-reported history entered for this visit."}</p></section>
            <section className="checkin-review-panel"><h3>Context before vitals</h3><dl>
              <div><dt>Fasting</dt><dd>{patientReport(selectedPatient.checkIn?.fastingBeforeVitals)}</dd></div>
              <div><dt>Recent exertion</dt><dd>{patientReport(selectedPatient.checkIn?.recentExertion)}</dd></div>
              <div><dt>Prior lab test</dt><dd>{selectedPatient.checkIn?.priorTests || "None reported"}</dd></div>
              <div><dt>OPD rest</dt><dd>{selectedPatient.checkIn?.opdRestMinutes ? `${selectedPatient.checkIn.opdRestMinutes} minutes` : "Not reported"}</dd></div>
            </dl></section>
            <section className="checkin-review-panel"><h3>Insurance or scheme</h3><dl>
              <div><dt>Patient plan</dt><dd>{selectedPatient.insurance.provider}{selectedPatient.insurance.policy ? ` · ${selectedPatient.insurance.policy}` : ""}</dd></div>
              <div><dt>Centre eligibility</dt><dd>Needs confirmation</dd></div>
              <div><dt>Cashless / reimbursement</dt><dd>Confirm with the centre and insurer</dd></div>
            </dl></section>
          </div>
        </section>}

        {screen === "consult" && selectedPatient && <section aria-labelledby="consult-title">
          <div className="screen-heading"><h2 id="consult-title">Consult: {selectedPatient.name}</h2><p>Token {selectedPatient.token} · {selectedPatient.patientId}</p></div>
          <form className="consult-form" onSubmit={handleSubmit}>
            <label>Patient<select value={selectedPatient.patientId} onChange={(event) => choosePatient(event.target.value, "consult")}>{patients.map((patient) => <option key={patient.patientId} value={patient.patientId}>{patient.token} · {patient.name}</option>)}</select></label>
            <label>Care type<select value={form.careType} onChange={(event) => setForm({ ...form, careType: event.target.value })}>{careTypes.map((careType) => <option key={careType}>{careType}</option>)}</select></label>
            <label className="full-field">Next step<select value={form.locationId} onChange={(event) => setForm({ ...form, locationId: event.target.value })}>{locationCatalog.map((location) => <option key={location.id} value={location.id}>{location.title} · {location.location} · {location.floorTape}</option>)}</select></label>

            <fieldset className="order-picker full-field">
              <legend>Tests, scans, and medicines</legend>
              {orderCatalog.map((order) => <label key={order.id} className="catalog-option"><input type="checkbox" checked={form.selectedOrders.includes(order.id)} onChange={() => toggleOrder(order.id)} /><span><strong>{order.name}</strong><small>{order.cost} · {order.coverage} · {order.location}</small></span></label>)}
            </fieldset>

            <label className="toggle-field"><input type="checkbox" checked={form.fastingRequired} onChange={(event) => setForm({ ...form, fastingRequired: event.target.checked })} /><span>Fasting required</span></label>
            <label>Estimated wait (mins)<input type="number" min="0" max="240" value={form.estimatedWait} onChange={(event) => setForm({ ...form, estimatedWait: event.target.value })} required /></label>

            <div className="form-actions full-field"><button type="button" className="secondary-action" onClick={() => setScreen("queue")}>Cancel</button><button type="submit" className="primary-action">Submit consult</button></div>
          </form>
        </section>}

        {screen === "status" && selectedPatient && <section aria-labelledby="status-title">
          <div className="screen-heading status-heading"><div><h2 id="status-title">Diagnostics, billing, and pharmacy</h2><p>Advance operational statuses with one tap.</p></div><label>Patient<select value={selectedPatient.patientId} onChange={(event) => choosePatient(event.target.value, "status")}>{patients.map((patient) => <option key={patient.patientId} value={patient.patientId}>{patient.token} · {patient.name}</option>)}</select></label></div>

          <div className="status-section"><h3>Orders</h3>{selectedPatient.orders.length === 0 ? <p className="empty-state">No active orders.</p> : <div className="table-wrap"><table className="doctor-table"><thead><tr><th>Order</th><th>Location</th><th>Reference</th><th>Status</th><th></th></tr></thead><tbody>{selectedPatient.orders.map((order) => <tr key={order.ref}><td>{order.name}<small>{order.cost} · {order.coverage}</small></td><td>{order.location}</td><td>{order.ref}</td><td>{order.status}</td><td><button className="row-action" disabled={order.status === "Result ready"} onClick={() => handleOrderAdvance(selectedPatient.patientId, order.ref)}>{order.status === "Ordered" ? "Start" : order.status === "In progress" ? "Mark ready" : "Complete"}</button></td></tr>)}</tbody></table></div>}</div>

          <div className="status-section"><h3>Insurance milestones</h3><p className="insurance-summary">{selectedPatient.insurance.provider} · {selectedPatient.insurance.claimId} · Co-pay {selectedPatient.insurance.patientCoPay}</p><ol className="milestone-list">{selectedPatient.milestones.map((milestone, index) => {
            const firstIncomplete = selectedPatient.milestones.findIndex((item) => !item.done);
            return <li key={milestone.label}><div><strong>{milestone.label}</strong><span>{milestone.done ? milestone.time : "Pending"}</span></div><button disabled={milestone.done || index !== firstIncomplete} onClick={() => handleMilestone(selectedPatient.patientId, index)}>{milestone.done ? "Done" : "Mark done"}</button></li>;
          })}</ol></div>
        </section>}
      </main>
    </div>
  );
}
