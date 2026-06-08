import React, { useEffect, useState } from 'react';
import './IntroView.css';

export default function IntroView({ onStart }) {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="intro-container">
      {/* NAVBAR */}
      <header className="intro-navbar">
        <div className="intro-brand">
          <img src="public/logo-nimbo-logo.svg" alt="Nimbo" className="intro-logo" />
          Nimbo
        </div>
      </header>

      {/* STAGE 1: HERO */}
      <section className="intro-hero-section">
        <div className="intro-cloud-1"></div>
        <div className="intro-cloud-2"></div>
        
        <div className="intro-hero-content">
          <div className="intro-hero-badge">Report & Forecasts 2014-2030</div>
          <h1 className="intro-hero-title">
            The invisible footprint <br/> <span className="text-blue-light">of the European sky.</span>
          </h1>
          <p className="intro-hero-text">
            A visual analysis of a decade of commercial flights, technological evolution, and their true climate impact.
          </p>
          
          <div className="intro-scroll-indicator">
            <span className="intro-scroll-text">Start journey</span>
            <img src="/icons/icono-triangulo-abajo.svg" alt="Scroll" className="icon-svg-white" />
          </div>
        </div>
      </section>

      {/* STAGE 2: GENERAL CONTEXT */}
      <section className="intro-context-section">
        <div className="intro-context-grid">
          <div className="intro-context-text">
            <div className="intro-glow-bg"></div>
            <h2>More planes, cleaner engines... <br/> <span className="text-blue-light">Fewer emissions?</span></h2>
            <div className="intro-context-paragraphs">
              <p>Over the last decade, commercial aviation in Europe has experienced a paradox. On one hand, the industry has invested billions in renewing its fleets. Next-generation aircraft consume up to <strong className="text-teal">20% less fuel</strong> per passenger.</p>
              <p>However, cheaper tickets and the explosion of new routes have led us to fly much more than before. This massive growth in the number of operations often eclipses the technical improvements of the engines.</p>
            </div>
            <div className="intro-info-box">
              <img src="/icons/icono-info.svg" alt="Info" className="icon-svg-blue" />
              <p>Add to this the strict European climate policies, which have begun to economically penalize emitted carbon. Has it worked? That is the answer hidden in the data.</p>
            </div>
          </div>

          <div className="intro-stats-grid">
            <div className="intro-stat-card card-light">
              <div className="intro-stat-icon bg-light-blue">
                <img src="/icons/icono-actividad.svg" alt="Growth" className="icon-svg-blue" />
              </div>
              <h3>+40%</h3>
              <p>Flights / Passengers</p>
            </div>
            <div className="intro-stat-card card-dark">
              <div className="intro-stat-icon bg-dark-trans">
                <img src="/icons/icono-nube.svg" alt="Emissions" className="icon-svg-green" />
              </div>
              <h3>?? Tons</h3>
              <p className="stat-label-light">Greenhouse Gases</p>
              <p className="stat-desc-light">The data is calculated by measuring the GHG (Greenhouse Gas) equivalent to more accurately reflect the true climate impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3: TIMELINE */}
      <section className="intro-timeline-section">
        <div className="intro-timeline-container">
          <h2>Context: From the past to the 2030 horizon</h2>
          
          <div className="intro-timeline-track">
            
            <div className="intro-timeline-item">
              <div className="intro-timeline-dot border-blue"></div>
              <div className="intro-timeline-card border-blue-light">
                <div className="intro-timeline-header text-blue">
                  <img src="/icons/icono-avion.svg" alt="Plane" className="icon-svg-blue" />
                  <span>2014 - 2018</span>
                </div>
                <h4>The Connectivity Boom</h4>
                <p>Absolute consolidation of the low-cost model. Flying becomes hyper-accessible, multiplying the network of connected secondary airports and skyrocketing passenger volumes across the European Union.</p>
              </div>
            </div>

            <div className="intro-timeline-item">
              <div className="intro-timeline-dot border-green"></div>
              <div className="intro-timeline-card border-green-light">
                <div className="intro-timeline-header text-green">
                  <img src="/icons/icono-escudo.svg" alt="Shield" className="icon-svg-green" />
                  <span>2019</span>
                </div>
                <h4>The European Green Deal Arrives</h4>
                <p>The European Commission presents its major climate roadmap. Aviation enters the regulatory crosshairs with the Fit for 55 target: forcing a drastic reduction in emissions and making carbon emission allowances more expensive.</p>
              </div>
            </div>

            <div className="intro-timeline-item">
              <div className="intro-timeline-dot border-blue"></div>
              <div className="intro-timeline-card border-blue-light">
                <div className="intro-timeline-header text-blue">
                  <img src="/icons/icono-reciclaje.svg" alt="Refresh" className="icon-svg-blue" />
                  <span>2020 - 2023</span>
                </div>
                <h4>Pause, Renewal, and Reactivation</h4>
                <p>After the unprecedented halt of the pandemic, airlines accelerate the retirement of older aircraft in favor of more efficient families like the A320neo or the 787. Air traffic re-emerges with renewed strength.</p>
              </div>
            </div>

            <div className="intro-timeline-item">
              <div className="intro-timeline-dot border-teal"></div>
              <div className="intro-timeline-card border-teal-light">
                <div className="intro-timeline-header text-teal">
                  <img src="/icons/icono-diana.svg" alt="Target" className="icon-svg-teal" />
                  <span>2024 - 2030</span>
                </div>
                <h4>Forecasts: The Critical Horizon</h4>
                <p className="mb-more">Figures are projected to surpass historical records. Simultaneously, mandatory quotas for clean fuels (SAF) and drastic increases in emission costs come into effect. It is the decisive stage to verify if the industry can grow economically without increasing its climate footprint.</p>
                
                <div className="intro-timeline-note">
                  <img src="/icons/icono-gota.svg" alt="SAF" className="icon-svg-teal mt-fix" />
                  <p><strong>What is SAF?</strong> (Sustainable Aviation Fuel). These are fuels created from waste that are mixed with traditional kerosene, capable of drastically reducing net emissions without modifying current aircraft engines.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STAGE 4: MOTIVATION & LAUNCH */}
      <section className="intro-launch-section">
        <div className="intro-launch-header">
          <div className="intro-launch-icon-box">
            <img src="/icons/icono-mapa.svg" alt="Map" className="icon-svg-blue-xl" />
          </div>
          <h2>Transparency through data.</h2>
          <p>We read news about pollution and green policies, but we rarely get to see the "big picture". This project seeks to <strong>empower the traveler</strong> by transforming millions of technical records into a visual, interactive, and easy-to-explore dashboard.</p>
        </div>

        <div className="intro-launch-grid">
          <div className="intro-launch-card">
            <div className="intro-launch-num text-blue-light">1</div>
            <h4>Real Volume</h4>
            <p>Visualize the evolution of passenger numbers and main operational airports country by country.</p>
          </div>
          <div className="intro-launch-card push-up">
            <div className="intro-launch-num text-green">2</div>
            <h4>Emissions Evolution</h4>
            <p>Check which countries have managed to reduce their emissions and analyze the split between domestic and international flights.</p>
          </div>
          <div className="intro-launch-card">
            <div className="intro-launch-num text-blue-light">3</div>
            <h4>The Top 10</h4>
            <p>Quickly identify the biggest emitters in Europe without commercial filters or bureaucracy.</p>
          </div>
        </div>

        <div className="intro-launch-cta-box">
          <div className="intro-cta-bg"></div>
          <div className="intro-cta-content">
            <img src="/icons/icono-mundo.svg" alt="Globe" className="icon-svg-blue-xxl pulse-anim" />
            <h2>Explore the Interactive Dashboard</h2>
            <p>Navigate the map of Europe, adjust the timeline, and discover the reality of aviation data for yourself.</p>
            <button onClick={onStart} className="intro-start-btn">
              <img src="/icons/icono-actividad.svg" alt="Start" className="icon-svg-white rotate-hover" /> 
              Start Visualization
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}