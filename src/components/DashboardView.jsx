import React, { useState } from 'react';
import { getAviationDataForYear, timelineYears, europePaths, interpolateColor } from '../data/dashboardData';
import './DashboardView.css';

export default function DashboardView({ onBack }) {
  const [stage, setStage] = useState(1);
  const [year, setYear] = useState(2023);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentData = getAviationDataForYear(year);

  const stages = [
    { id: 1, title: "Passengers", metric: 'pax', format: (v) => `${v} M` },
    { id: 2, title: "Main Airports", metric: 'mainAirports', format: (v) => `${v}` },
    { id: 3, title: "Top 10 Emitters", metric: 'emissions', format: (v) => `${v.toLocaleString()} k-Tons`},
    { id: 4, title: "Emissions Evolution", metric: 'change', format: (v) => `${v > 0 ? '+' : ''}${v}%`}
  ];

  const currentStage = stages.find(s => s.id === stage);
  const metricValues = currentData.map(d => d[currentStage.metric] || 0);
  const maxVal = Math.max(...metricValues, 1);
  const minVal = Math.min(...metricValues, 0);
  const top10Emissions = [...currentData].sort((a, b) => b.emissions - a.emissions).slice(0, 10).map(d => d.id);

  const maxPaxGlobal = Math.max(...currentData.map(d => d.pax || 0), 1);
  const maxAirportsGlobal = Math.max(...currentData.map(d => d.mainAirports || 0), 1);

  const getFillColor = (countryData, stageId = stage) => {
    if (!countryData) return '#D9E2EC'; 
    
    const targetStage = stages.find(s => s.id === stageId);
    const val = countryData[targetStage.metric];
    const specificValues = currentData.map(d => d[targetStage.metric] || 0);
    const mMax = Math.max(...specificValues, 1);
    const mMin = Math.min(...specificValues, 0);
    const ratio = mMax !== mMin ? (val - mMin) / (mMax - mMin) : 0.5;

    if (stageId === 1) return interpolateColor('#B4C4E0', '#476EAE', ratio); 
    if (stageId === 2) return interpolateColor('#E8F0FE', '#48B3AF', ratio); 
    if (stageId === 3) return top10Emissions.includes(countryData.id) ? '#FF6B6B' : '#E8F0FE'; 
    if (stageId === 4) {
      if (val < 0) return interpolateColor('#E8F0FE', '#A7E399', Math.min(1, Math.abs(val / 50))); 
      return interpolateColor('#E8F0FE', '#FF6B6B', Math.min(1, val / 50)); 
    }
  };

  const handleMouseMove = (e, countryData) => {
    if (!countryData) return;
    setHoveredCountry(countryData);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const selectedCountryData = selectedCountry ? currentData.find(c => c.id === selectedCountry.id) : null;

  return (
    <div className="dash-container">
      
      {/* MAP AREA */}
      <div className="dash-map-area">
        <header className="dash-bg-map">
          <div className="dash-header">
            <img src="public/logo-nimbo-logo.svg" alt="Nimbo Icon" className="dash-header-icon" />
            <div className="dash-title-box">
              <h1>{currentStage.title}</h1>
            </div>        
          </div>
        </header>
        
        <div className="dash-map-render">
          <svg viewBox="0 0 1000 684" className="dash-svg">
            <g strokeLinejoin="round" strokeLinecap="round">
              {Object.keys(europePaths).map((countryCode) => {
                const countryData = currentData.find(c => c.id === countryCode);
                const isSelected = selectedCountry?.id === countryCode;
                const isHovered = hoveredCountry?.id === countryCode;
                
                const fillColor = getFillColor(countryData);
                const strokeColor = isSelected ? "#1C2A3A" : (isHovered && countryData) ? "#1C2A3A" : "#FFFFFF";

                return (
                  <path
                    key={countryCode}
                    d={europePaths[countryCode]} 
                    fill={fillColor}
                    className={countryData ? "dash-path-active" : "dash-path-inactive"}
                    style={{
                      stroke: strokeColor,
                      strokeWidth: isSelected ? "3" : isHovered ? "2" : "0.5",
                      opacity: isHovered || isSelected ? 1 : 0.95
                    }}
                    onClick={() => countryData && setSelectedCountry(countryData)}
                    onMouseMove={(e) => handleMouseMove(e, countryData)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Hover Tooltip */}
        {hoveredCountry && (
          <div className="dash-tooltip" style={{ left: mousePos.x, top: mousePos.y }}>
            <span className="tooltip-country">{hoveredCountry.name}</span>
            <span className="tooltip-value">
              {currentStage.format(hoveredCountry[currentStage.metric])}
            </span>
          </div>
        )}

        {/* Timeline */}
        <div className="dash-timeline-vertical">
          <div className="timeline-track-text">
            {timelineYears.map((y) => (
              <button 
                key={y} 
                onClick={() => setYear(y)} 
                className={`dash-timeline-btn ${year === y ? 'timeline-active' : 'timeline-inactive'}`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dash-stages-nav">
          {stages.map((s) => (
            <button 
              key={s.id}
              onClick={() => setStage(s.id)}
              className={`dash-stage-btn ${stage === s.id ? 'stage-active' : 'stage-inactive'}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Back Button*/}
        <button onClick={onBack} className="dash-back-btn" title="Go Back">
          <img src="/icons/icono-triangulo-izquierda.svg" alt="Back" className="back-icon" />
        </button>

      </div>

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="sidebar-legend">
          <h3>Map Legend ({year})</h3>
          {stage === 3 ? (
            <div className="legend-box-split">
              <div><span className="dot dot-red"></span> Top 10 Emitters</div>
              <div><span className="dot dot-white"></span> Rest of EU</div>
            </div>
          ) : (
            <div className="legend-box-gradient">
              <div className="legend-bar" style={{
                backgroundImage: stage === 1 ? 'linear-gradient(to right, #B4C4E0, #476EAE)' :
                stage === 2 ? 'linear-gradient(to right, #E8F0FE, #48B3AF)' :
                'linear-gradient(to right, #A7E399, #F4F7FC, #FF6B6B)'
              }}></div>
              <div className="legend-labels">
                <span>Min: {currentStage.format(minVal)}</span>
                <span>Max: {currentStage.format(maxVal)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-content">
          {!selectedCountryData ? (
            <div className="sidebar-empty">
              <p className="empty-title">Explore the data</p>
              <p className="empty-desc">Click on any valid country on the map to analyze its operational snapshot.</p>
            </div>
          ) : (
            <div className="sidebar-data fade-in">
              <div className="data-header">
                <div className="data-flag bg-blue">{selectedCountryData.id}</div>
                <div>
                  <h2>{selectedCountryData.name}</h2>
                  <p className="data-year text-blue">Data Year {year}</p>
                </div>
              </div>

              <div className="data-metrics">
                
                <MetricCard
                  imgSrc="/icons/icono-pasajeros.svg" 
                  title="Total Passengers" 
                  value={selectedCountryData.pax} format="M" 
                  max={maxPaxGlobal} 
                  isSelected={stage === 1} 
                  color={getFillColor(selectedCountryData, 1)} 
                />
                
                <MetricCard 
                  imgSrc="/icons/icono-aeropuerto.svg"
                  title="Main Airports" 
                  value={selectedCountryData.mainAirports} format="" 
                  max={maxAirportsGlobal} 
                  isSelected={stage === 2} 
                  color={getFillColor(selectedCountryData, 2)} 
                />

                <div className={`metric-card emi-card ${stage === 3 ? 'emi-active' : ''}`}>
                  <div className="metric-title-group mb-1">
                    <img src="/icons/icono-emisores.svg" alt="Emissions" className="metric-icon" />
                    <h4>Carbon Footprint (GEI)</h4>
                  </div>
                  
                  <div className="emi-row">
                    <span className="emi-label">Domestic Aviation</span>
                    <span className="emi-val">{selectedCountryData.domestic.toLocaleString()} <span>k Tons</span></span>
                  </div>
                  <div className="emi-bar-bg">
                    <div className="emi-bar-fill bg-green" style={{ width: `${Math.min(100, (selectedCountryData.domestic / (selectedCountryData.emissions || 1)) * 100)}%` }}></div>
                  </div>

                  <div className="emi-row">
                    <span className="emi-label">International Aviation</span>
                    <span className="emi-val">{selectedCountryData.international.toLocaleString()} <span>k Tons</span></span>
                  </div>
                  <div className="emi-bar-bg">
                    <div className="emi-bar-fill bg-blue" style={{ width: `${Math.min(100, (selectedCountryData.international / (selectedCountryData.emissions || 1)) * 100)}%` }}></div>
                  </div>

                  <div className="emi-total">
                    <span>Total Emissions</span>
                    <span className="emi-total-val">{selectedCountryData.emissions.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className={`metric-card evo-card ${stage === 4 ? 'evo-active' : ''}`}>
                  <div className="evo-row">
                    <div className="metric-title-group">
                      <img src="/icons/icono-variacion.svg" alt="Variation" className="metric-icon" />
                      <div className="evo-label">Var. vs {year === 2014 ? 'Base Year' : year - 1}</div>
                    </div>
                    <div className={`evo-val ${selectedCountryData.change < 0 ? 'text-green' : selectedCountryData.change > 0 ? 'text-red' : ''}`}>
                      {selectedCountryData.change > 0 ? '+' : ''}{selectedCountryData.change}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function MetricCard({ imgSrc, title, value, format, max, isSelected, color }) {
  const safeValue = Number(value) || 0;
  const safeMax = Number(max) > 0 ? Number(max) : 1;
  const percentage = Math.min(100, Math.max(0, (safeValue / safeMax) * 100));

  return (
    <div className={`metric-card ${isSelected ? 'metric-active' : ''}`}>
      <div className="metric-header">
        <div className="metric-title-group">
          {imgSrc && <img src={imgSrc} alt={title} className="metric-icon" />}
          <span className="metric-title">{title}</span>
        </div>
        <span className="metric-val">{safeValue} <span>{format}</span></span>
      </div>
      <div className="metric-bar-bg">
        <div 
          className="metric-bar-fill" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
}