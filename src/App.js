import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import citiesData from './citiesData';

// Mock user content data
const initialUserContent = [
  {
    id: 1,
    cityId: 'bratislava',
    type: 'tip',
    author: 'Martin K.',
    date: '2024-11-15',
    content: 'The ticket machines at Hlavná stanica often have long queues. Download the IDS BK app before you arrive!',
    upvotes: 24,
    verified: false
  },
  {
    id: 2,
    cityId: 'banska-bystrica',
    type: 'tip',
    author: 'Jana S.',
    date: '2024-10-22',
    content: 'Drivers are very helpful if you don\'t speak Slovak. Just show them your destination and they\'ll help.',
    upvotes: 15,
    verified: false
  },
  {
    id: 3,
    cityId: 'porto',
    type: 'warning',
    author: 'Carlos M.',
    date: '2024-12-01',
    content: 'Don\'t confuse the historic tram line 1 with the regular trams - different tickets!',
    upvotes: 31,
    verified: false
  }
];

// Header Component
function Header({ user, onLogin, onLogout }) {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🚊</span>
          <span className="logo-text">Transit Guide</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Cities</Link>
          <Link to="/about" className="nav-link">About</Link>
          {user ? (
            <>
              <Link to="/contribute" className="nav-link">Contribute</Link>
              <span className="nav-user">👤 {user.name}</span>
              <button onClick={onLogout} className="btn-secondary">Logout</button>
            </>
          ) : (
            <button onClick={onLogin} className="btn-primary">Login</button>
          )}
        </nav>
      </div>
    </header>
  );
}

// Home Page - City List
function HomePage({ cities }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="hero">
        <h1>Navigate Any City's Public Transport</h1>
        <p>Community-driven guides combining official information with local insights</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="city-grid">
        {filteredCities.map(city => (
          <Link to={`/city/${city.id}`} key={city.id} className="city-card">
            {city.image && (
              <img src={city.image} alt={city.name} className="city-card-image" />
            )}
            <div className="city-card-content">
              <div className="city-card-header">
                <h3>{city.name}</h3>
                {city.verified && <span className="badge-verified">✓ Verified</span>}
              </div>
              <p className="city-country">{city.country}</p>
              <div className="city-transport-icons">
                {city.transport.map(mode => (
                  <span key={mode} className="transport-badge">{mode}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="empty-state">
          <p>No cities found. Want to add this city?</p>
          <button className="btn-primary">Suggest a City</button>
        </div>
      )}
    </div>
  );
}

// City Detail Page with Enhanced Data Display
function CityPage({ cities, userContent, user, onAddContent }) {
  const { cityId } = useParams();
  const city = cities.find(c => c.id === cityId);
  const [activeTab, setActiveTab] = useState('overview');
  const [showContributeForm, setShowContributeForm] = useState(false);

  if (!city) {
    return <div className="container"><h2>City not found</h2></div>;
  }

  const cityContent = userContent.filter(c => c.cityId === cityId);

  return (
    <div className="container">
      <div className="city-header">
        <div>
          <h1>{city.name}</h1>
          <p className="city-subtitle">{city.country}</p>
        </div>
        {city.verified && <span className="badge-verified-large">✓ Verified Official Data</span>}
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'fares' ? 'active' : ''}`}
          onClick={() => setActiveTab('fares')}
        >
          Fares & Tickets
        </button>
        <button
          className={`tab ${activeTab === 'apps' ? 'active' : ''}`}
          onClick={() => setActiveTab('apps')}
        >
          Apps & Tools
        </button>
        <button
          className={`tab ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          Community Tips ({cityContent.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <OverviewTab city={city} />
      )}

      {activeTab === 'fares' && (
        <FaresTab city={city} />
      )}

      {activeTab === 'apps' && (
        <AppsTab city={city} />
      )}

      {activeTab === 'community' && (
        <CommunityTab 
          cityContent={cityContent}
          cityId={cityId}
          user={user}
          onAddContent={onAddContent}
          showContributeForm={showContributeForm}
          setShowContributeForm={setShowContributeForm}
        />
      )}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ city }) {
  return (
    <div className="city-content">
      {/* Metadata */}
      <section className="info-section">
        <h2>🏛️ Authority & System</h2>
        <div className="info-card">
          <div className="info-row">
            <strong>Transport Authority:</strong>
            <span>{city.metadata.authority}</span>
          </div>
          <div className="info-row">
            <strong>Integrated System:</strong>
            <span>{city.metadata.integratedSystem}</span>
          </div>
          <div className="info-row">
            <strong>Primary Language:</strong>
            <span>{city.metadata.primaryLanguage}</span>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="info-section">
        <h2>🗺️ Zones</h2>
        <div className="zone-card">
          <div className="zone-main">
            <strong>{city.zones.main}</strong>
            <p>{city.zones.description}</p>
          </div>
          {city.zones.note && (
            <div className="zone-note">
              ℹ️ {city.zones.note}
            </div>
          )}
        </div>
      </section>

      {/* Transport Modes */}
      <section className="info-section">
        <h2>🚇 Transport Modes</h2>
        <div className="transport-modes">
          {city.transport.map(mode => (
            <span key={mode} className="transport-badge-large">{mode}</span>
          ))}
        </div>
      </section>

      {/* Validation Rules */}
      <section className="info-section">
        <h2>✓ Validation Rules</h2>
        <ul className="tips-list">
          {city.validation.rules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>
      </section>

      {/* Visitor Notes */}
      <section className="info-section">
        <h2>💡 Visitor Tips</h2>
        <div className="visitor-notes">
          {city.visitorNotes.map((note, idx) => (
            <div key={idx} className="visitor-note-card">
              {note}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Fares Tab Component
function FaresTab({ city }) {
  return (
    <div className="city-content">
      <section className="info-section">
        <h2>🎫 Basic Fares</h2>
        <div className="fare-table-container">
          <table className="fare-table">
            <thead>
              <tr>
                <th>Ticket Type</th>
                <th>Validity</th>
                <th>Price</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {city.fares.basic.map((fare, idx) => (
                <tr key={idx}>
                  <td><strong>{fare.type}</strong></td>
                  <td>{fare.validity}</td>
                  <td className="fare-price">{fare.price}</td>
                  <td>{fare.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Passes if they exist */}
      {city.fares.passes && (
        <section className="info-section">
          <h2>🎟️ Tourist Passes</h2>
          <div className="fare-table-container">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Pass Type</th>
                  <th>Validity</th>
                  <th>Price</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {city.fares.passes.map((fare, idx) => (
                  <tr key={idx}>
                    <td><strong>{fare.type}</strong></td>
                    <td>{fare.validity}</td>
                    <td className="fare-price">{fare.price}</td>
                    <td>{fare.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Discounted Fares */}
      {city.fares.discounted && (
        <section className="info-section">
          <h2>💳 Discounted Fares</h2>
          {city.fares.discountNote && (
            <div className="discount-note">
              ⚠️ {city.fares.discountNote}
            </div>
          )}
          <div className="fare-table-container">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Ticket Type</th>
                  <th>Validity</th>
                  <th>Price</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {city.fares.discounted.map((fare, idx) => (
                  <tr key={idx}>
                    <td><strong>{fare.type}</strong></td>
                    <td>{fare.validity}</td>
                    <td className="fare-price">{fare.price}</td>
                    <td>{fare.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Eligibility */}
      <section className="info-section">
        <h2>👥 Who Gets Discounts?</h2>
        <div className="eligibility-grid">
          {city.eligibility.map((elig, idx) => (
            <div key={idx} className="eligibility-card">
              <div className="eligibility-type">{elig.type}</div>
              <div className="eligibility-discount">{elig.discount}</div>
              <div className="eligibility-conditions">{elig.conditions}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Apps Tab Component  
function AppsTab({ city }) {
  return (
    <div className="city-content">
      {/* Official Apps */}
      <section className="info-section">
        <h2>📱 Official Apps</h2>
        <div className="apps-grid">
          {city.apps.map((app, idx) => (
            <div key={idx} className="app-card">
              <div className="app-header">
                <h3>{app.name}</h3>
                <div className="app-platforms">
                  {app.platforms.map(platform => (
                    <span key={platform} className="platform-badge">{platform}</span>
                  ))}
                </div>
              </div>
              <p className="app-description">{app.description}</p>
              <ul className="app-features">
                {app.features.map((feature, fidx) => (
                  <li key={fidx}>{feature}</li>
                ))}
              </ul>
              {app.links && (
                <div className="app-links">
                  {app.links.android && (
                    <a href={app.links.android} target="_blank" rel="noopener noreferrer" className="app-download-btn android">
                      <span>📱</span> Android
                    </a>
                  )}
                  {app.links.ios && (
                    <a href={app.links.ios} target="_blank" rel="noopener noreferrer" className="app-download-btn ios">
                      <span>🍎</span> iOS
                    </a>
                  )}
                  {app.links.info && (
                    <a href={app.links.info} target="_blank" rel="noopener noreferrer" className="app-info-btn">
                      More Info →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Journey Planners */}
      <section className="info-section">
        <h2>🗺️ Journey Planners</h2>
        <div className="planners-grid">
          {city.planners.map((planner, idx) => (
            <a 
              key={idx} 
              href={planner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="planner-card"
            >
              <div className="planner-header">
                <strong>{planner.name}</strong>
                <span className="planner-type">{planner.type}</span>
              </div>
              <p>{planner.description}</p>
              <span className="planner-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Official Links */}
      <section className="info-section">
        <h2>🔗 Official Websites</h2>
        <div className="links-grid">
          {Object.entries(city.officialLinks).map(([key, url]) => (
            <a 
              key={key}
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="link-card"
            >
              <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</strong>
              <span>→</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

// Community Tab Component
function CommunityTab({ cityContent, cityId, user, onAddContent, showContributeForm, setShowContributeForm }) {
  return (
    <div className="city-content">
      <div className="community-header">
        <h2>Community Tips & Insights</h2>
        {user && (
          <button
            className="btn-primary"
            onClick={() => setShowContributeForm(!showContributeForm)}
          >
            + Add Tip
          </button>
        )}
      </div>

      {showContributeForm && user && (
        <ContributeForm
          cityId={cityId}
          user={user}
          onSubmit={(content) => {
            onAddContent(content);
            setShowContributeForm(false);
          }}
          onCancel={() => setShowContributeForm(false)}
        />
      )}

      <div className="content-list">
        {cityContent.map(content => (
          <div key={content.id} className="content-card">
            <div className="content-header">
              <div className="content-author">
                <strong>{content.author}</strong>
                <span className="content-date">{content.date}</span>
              </div>
              {content.type === 'warning' && <span className="badge-warning">⚠️ Warning</span>}
              {content.verified && <span className="badge-verified">✓ Verified</span>}
            </div>
            <p className="content-text">{content.content}</p>
            <div className="content-footer">
              <button className="upvote-btn">👍 {content.upvotes}</button>
            </div>
          </div>
        ))}

        {cityContent.length === 0 && (
          <div className="empty-state">
            <p>No community tips yet. Be the first to contribute!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Contribute Form Component
function ContributeForm({ cityId, user, onSubmit, onCancel }) {
  const [tipText, setTipText] = useState('');
  const [tipType, setTipType] = useState('tip');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipText.trim()) return;

    const newContent = {
      id: Date.now(),
      cityId,
      type: tipType,
      author: user.name,
      date: new Date().toISOString().split('T')[0],
      content: tipText,
      upvotes: 0,
      verified: false
    };

    onSubmit(newContent);
    setTipText('');
  };

  return (
    <form className="contribute-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Type:</label>
        <select value={tipType} onChange={(e) => setTipType(e.target.value)}>
          <option value="tip">General Tip</option>
          <option value="warning">Warning/Issue</option>
        </select>
      </div>
      <div className="form-group">
        <label>Your Tip:</label>
        <textarea
          value={tipText}
          onChange={(e) => setTipText(e.target.value)}
          placeholder="Share your experience or insight..."
          rows="4"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Submit</button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="container">
      <div className="about-content">
        <h1>About Transit Guide</h1>
        <p>
          Transit Guide is a community-driven platform that makes public transport easier to understand
          in cities worldwide. We combine official information from transport authorities with practical
          tips and insights from locals and travelers.
        </p>
        <h2>Our Mission</h2>
        <p>
          Every city has unique quirks in its public transport system - which ticket machines actually work,
          where you can buy tickets, what payment methods are accepted, and the unwritten rules locals know.
          We're building a global knowledge base that captures both the official information and the
          practical reality.
        </p>
        <h2>How It Works</h2>
        <ul>
          <li><strong>Official Data:</strong> We gather and verify information from transport authorities</li>
          <li><strong>Community Tips:</strong> Local contributors share practical insights and updates</li>
          <li><strong>Visual Guides:</strong> Photos help you recognize ticket machines, validators, and signage</li>
        </ul>
        <h2>Get Involved</h2>
        <p>
          Know your city's transport system? Help travelers and newcomers by contributing tips, photos,
          and updates. Create an account to start contributing!
        </p>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [userContent, setUserContent] = useState(initialUserContent);
  const [user, setUser] = useState(null);

  // Simulate login
  const handleLogin = () => {
    setUser({ id: 1, name: 'Demo User', email: 'demo@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddContent = (content) => {
    setUserContent([content, ...userContent]);
  };

  return (
    <Router>
      <div className="app">
        <div className="app-stage">
          <div className="main">
            <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<HomePage cities={citiesData} />} />
              <Route
                path="/city/:cityId"
                element={
                  <CityPage
                    cities={citiesData}
                    userContent={userContent}
                    user={user}
                    onAddContent={handleAddContent}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <footer className="footer">
              <div className="container">
                <p>© 2024 Transit Guide - Making public transport accessible to everyone</p>
                <p className="footer-links">
                  <a href="https://github.com/kebab-py/transit-guide">GitHub</a> · <a href="mailto:contact@transitguide.com">Contact</a> · <a href="https://github.com/kebab-py/transit-guide/blob/main/README.md">About</a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
