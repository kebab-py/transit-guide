# Transit Guide - Public Transport Made Easy 🚊

A community-driven web application that combines official public transport information with local insights and tips from travelers and residents worldwide.

## Features

### ✅ Current Features (v1)

- **City Overview Pages**: Each city has a dedicated page with:
  - Ticketing system details (types, prices, where to buy, payment methods)
  - Transport modes (tram, bus, metro, train, etc.)
  - Cultural tips and etiquette
  - Official links to transport authority websites and apps
  - Verified badge for official information

- **Community Contributions**:
  - Users can submit tips, warnings, and insights
  - Upvoting system for helpful content
  - User attribution and timestamps
  - Distinction between verified official data and community content

- **Search & Browse**:
  - Search cities by name or country
  - Visual transport mode indicators
  - Responsive grid layout

- **User System**:
  - Login/logout functionality (demo mode)
  - User profiles
  - Contribution tracking

### 🚀 Future Features (Roadmap)

- Photo upload and gallery
- Multi-language support
- Route planning integration
- Discount information database
- Mobile app (React Native/Flutter)
- Admin panel for content moderation
- Real user authentication (OAuth, email)
- API for third-party integrations
- Offline mode for travelers
- Push notifications for transport updates

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Styling**: Pure CSS (no framework dependencies)
- **Future Backend**: Node.js/Express or Firebase (TBD)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd transit-guide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Project Structure

```
transit-guide/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Current Data

The app currently uses mock data stored in the application. Cities included:
- Bratislava, Slovakia
- Banská Bystrica, Slovakia
- Porto, Portugal

### Adding New Cities (Current Manual Process)

Edit the `initialCities` array in `src/App.js`:

```javascript
{
  id: 'city-slug',
  name: 'City Name',
  country: 'Country',
  ticketing: {
    types: ['ticket types'],
    prices: 'price range',
    whereToBuy: 'where to purchase',
    paymentMethods: 'accepted payments'
  },
  transport: ['Bus', 'Tram', 'Metro'],
  culturalTips: ['tip 1', 'tip 2'],
  officialLinks: {
    website: 'url',
    app: 'app name',
    planner: 'url'
  },
  verified: true
}
```

## Next Steps for Development

### Phase 1: Backend & Database (Priority)
- Set up backend API (recommended: Node.js + Express or Firebase)
- Database schema for cities, users, contributions
- Authentication system (JWT or Firebase Auth)
- Image upload to cloud storage (Cloudinary/AWS S3)

### Phase 2: AI Integration
- Web scraping script for official transport websites
- AI-powered data extraction from transport authority sites
- Automated data validation and updates

### Phase 3: Enhanced Features
- Advanced search with filters
- User reputation system
- Content moderation tools
- Analytics dashboard
- Multi-language interface

### Phase 4: Mobile App
- React Native or Flutter implementation
- Offline functionality
- Push notifications
- GPS-based suggestions

## Contributing

This is currently a solo project in early development. Contribution guidelines will be added as the project matures.

### Ideas for Contributors:
- Add your city's data
- Improve UI/UX design
- Translate interface to other languages
- Write documentation
- Report bugs

## Monetization Ideas (Future)

- Premium city listings for transport authorities
- Featured placement for local businesses near transit
- API access for developers
- Pro features for frequent travelers
- Donation model (Patreon/Ko-fi)

## Design Philosophy

- **User-first**: Information should be easy to find and understand
- **Community-driven**: Local knowledge is valuable
- **Minimal ads**: If ads exist, they should be contextual and helpful
- **Mobile-friendly**: Most users will access on phones
- **Offline-capable**: Travelers may not have internet access

## License

[Choose appropriate license - MIT, GPL, etc.]

## Contact

[Your contact information or project email]

## Acknowledgments

- Initial cities data: Personal knowledge and official transport websites
- Icons: Emoji (temporary, will be replaced with icon library)
- Inspiration: The chaos of figuring out public transport in unfamiliar cities

---

**Note**: This is an early-stage prototype. Many features are planned but not yet implemented. The demo login is for UI demonstration only.
