import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";

export default function BudgetCalculator() {
  const [goal, setGoal] = useState("");
  const [current, setCurrent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [result, setResult] = useState(null);

  const calculateBudget = () => {
    const today = dayjs();
    const endDate = dayjs(deadline);
    const daysRemaining = endDate.diff(today, "day");

    if (daysRemaining <= 0) {
      alert("La data di scadenza deve essere nel futuro.");
      return;
    }

    const numericGoal = parseFloat(goal);
    const numericCurrent = parseFloat(current);

    if (isNaN(numericGoal) || isNaN(numericCurrent)) {
      alert("Inserisci valori numerici validi per obiettivo e attuale.");
      return;
    }

    const remainingBudget = numericGoal - numericCurrent;
    const dailyBudgetNetto = remainingBudget / daysRemaining;
    const dailyBudgetIvato = dailyBudgetNetto * 1.22;

    setResult({
      remainingBudget: remainingBudget.toFixed(2),
      daysRemaining,
      dailyBudgetNetto: dailyBudgetNetto.toFixed(2),
      dailyBudgetIvato: dailyBudgetIvato.toFixed(2),
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Calcolatore Budget Giornaliero</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Fatturato Obiettivo (€)</label>
          <input
            type="number"
            className="form-control"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Inserisci il traguardo senza IVA"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Fatturato Attuale (€)</label>
          <input
            type="number"
            className="form-control"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Inserisci l'attuale senza IVA"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Data di Scadenza</label>
          <input
            type="date"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={calculateBudget}>
        Calcola Budget Giornaliero
      </button>

      {result && (
        <div className="alert alert-info">
          <p><strong>Giorni rimanenti:</strong> {result.daysRemaining}</p>
          <p><strong>Budget rimanente:</strong> €{result.remainingBudget}</p>
          <p><strong>Budget giornaliero netto (IVA esclusa):</strong> €{result.dailyBudgetNetto}</p>
          <p><strong>Budget giornaliero lordo (IVA 22% inclusa):</strong> €{result.dailyBudgetIvato}</p>
        </div>
      )}
    </div>
  );
}
