import React, { useState } from 'react';
import { createPrescription } from '../../services/prescription';

const PrescriptionForm = ({ patientId }) => {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription({
        patientId,
        medication,
        dosage,
        instructions
      });
      // Reset form or show success message
    } catch (err) {
      setError('Failed to create prescription');
    }
  };

  return (
    <div>
      <h3>Create Prescription</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medication</label>
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dosage</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;