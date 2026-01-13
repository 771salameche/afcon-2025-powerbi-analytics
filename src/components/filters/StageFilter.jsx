import React from 'react';
import { useTournament } from '../../contexts/TournamentContext';
import { useFilters } from '../../contexts/FilterContext';

const StageFilter = () => {
  const { stages } = useTournament();
  const { selectedStage, setSelectedStage } = useFilters();

  if (!stages || stages.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Filter by Stage</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStage(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedStage === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Stages
        </button>
        {stages.map((stage) => (
          <button
            key={stage.stage_id}
            onClick={() => setSelectedStage(stage.stage_id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedStage === stage.stage_id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {stage.stage_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageFilter;
