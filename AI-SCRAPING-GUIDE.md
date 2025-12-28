# AI-Powered Data Collection Strategy

This document outlines how you can use AI to scrape and extract public transport information from official city websites.

## Overview

Instead of manually entering data for every city, you can:
1. Find official transport authority websites
2. Use AI to extract structured data from these websites
3. Store the data in your database
4. Set up periodic updates to keep information current

## Tools & Approaches

### Option 1: Claude API with Web Scraping

You can use Claude (via API) to:
- Fetch website content
- Extract relevant information
- Structure it in your database format

```python
import anthropic
import requests
from bs4 import BeautifulSoup

def scrape_transport_info(city_url):
    # Fetch the website
    response = requests.get(city_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    page_text = soup.get_text()
    
    # Use Claude to extract structured data
    client = anthropic.Anthropic(api_key="your-api-key")
    
    prompt = f"""
    Extract public transport information from this text and format it as JSON:
    
    {page_text[:5000]}  # Limit text to avoid token limits
    
    Required format:
    {{
        "ticketing": {{
            "types": ["list of ticket types"],
            "prices": "price range as string",
            "whereToBuy": "where to purchase tickets",
            "paymentMethods": "accepted payment methods"
        }},
        "transport": ["Bus", "Tram", "Metro", etc.],
        "culturalTips": ["tip 1", "tip 2"],
        "officialLinks": {{
            "website": "url",
            "app": "app name if mentioned",
            "planner": "journey planner url"
        }}
    }}
    
    Only extract information that is explicitly stated. Return valid JSON only.
    """
    
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return message.content[0].text

# Example usage
city_data = scrape_transport_info("https://www.dpmbb.sk/")
print(city_data)
```

### Option 2: Puppeteer + Claude for Dynamic Sites

Some sites load content with JavaScript. Use Puppeteer to render the page:

```javascript
const puppeteer = require('puppeteer');
const Anthropic = require('@anthropic-ai/sdk');

async function scrapeTransportInfo(url) {
    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate and wait for content
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get page content
    const content = await page.evaluate(() => document.body.innerText);
    
    await browser.close();
    
    // Use Claude to extract data
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
            role: 'user',
            content: `Extract transport data from this text into JSON format: ${content.slice(0, 5000)}`
        }]
    });
    
    return JSON.parse(message.content[0].text);
}
```

### Option 3: OpenAI GPT-4 + BeautifulSoup

Similar approach using OpenAI's API:

```python
import openai
import requests
from bs4 import BeautifulSoup

openai.api_key = "your-openai-key"

def scrape_with_gpt(url):
    # Fetch and parse
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    text = soup.get_text()[:4000]
    
    # Extract with GPT-4
    completion = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Extract public transport information into JSON format."},
            {"role": "user", "content": text}
        ]
    )
    
    return completion.choices[0].message.content
```

## Automated Scraping Pipeline

### Step 1: Build a List of Cities

Start with a CSV of cities and their transport authority URLs:

```csv
city,country,transport_url
Bratislava,Slovakia,https://imhd.sk/ba
Banská Bystrica,Slovakia,https://www.dpmbb.sk/
Porto,Portugal,https://www.stcp.pt/
```

### Step 2: Create a Scraping Script

```python
import csv
import json
import time
from your_scraping_module import scrape_transport_info

def scrape_all_cities(csv_file):
    results = []
    
    with open(csv_file, 'r') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            print(f"Scraping {row['city']}...")
            
            try:
                data = scrape_transport_info(row['transport_url'])
                
                city_data = {
                    'id': row['city'].lower().replace(' ', '-'),
                    'name': row['city'],
                    'country': row['country'],
                    **json.loads(data),
                    'verified': False  # Requires manual verification
                }
                
                results.append(city_data)
                
                # Be respectful: rate limit your requests
                time.sleep(2)
                
            except Exception as e:
                print(f"Error scraping {row['city']}: {e}")
    
    # Save results
    with open('scraped_cities.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return results

# Run the pipeline
scrape_all_cities('cities.csv')
```

### Step 3: Manual Verification

AI scraping isn't perfect. Always:
1. Review extracted data for accuracy
2. Fill in missing information manually
3. Mark as verified only after human review
4. Add photos and community tips

## Advanced: Scheduled Updates

Keep data fresh with automated updates:

```python
from apscheduler.schedulers.background import BackgroundScheduler

def update_city_data():
    # Re-scrape all cities
    cities = scrape_all_cities('cities.csv')
    
    # Compare with existing data
    # Flag changes for review
    # Update database
    
scheduler = BackgroundScheduler()
scheduler.add_job(update_city_data, 'interval', weeks=1)
scheduler.start()
```

## Cost Considerations

### Claude API Pricing (as of 2024)
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

For a typical city page (5,000 tokens in + 500 tokens out):
- Cost per city: ~$0.02
- Cost for 1,000 cities: ~$20

### Optimization Tips
1. Cache scraped data
2. Only re-scrape when websites change
3. Use cheaper models for simple extractions
4. Batch requests when possible

## Data Validation

Always validate scraped data:

```python
def validate_city_data(data):
    required_fields = ['name', 'country', 'ticketing', 'transport']
    
    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"
    
    if not isinstance(data['transport'], list):
        return False, "Transport must be a list"
    
    # More validation rules...
    
    return True, "Valid"
```

## Ethics & Legal Considerations

1. **Respect robots.txt**: Check if scraping is allowed
2. **Rate limiting**: Don't overload servers
3. **Attribution**: Credit source websites
4. **Terms of Service**: Review each site's ToS
5. **Public data only**: Don't scrape private/authenticated content
6. **Verify accuracy**: AI can make mistakes

## Alternative: Official APIs

Before scraping, check if cities offer official APIs:
- Many large cities have open data portals
- GTFS (General Transit Feed Specification) is common
- Some cities offer real-time APIs

Example GTFS cities:
- London (TfL API)
- New York (MTA API)
- San Francisco (511 API)

## Getting Started Checklist

- [ ] Set up API keys (Claude or OpenAI)
- [ ] Create list of target cities
- [ ] Build scraping script
- [ ] Test on 5-10 cities
- [ ] Set up validation pipeline
- [ ] Create manual review process
- [ ] Implement data storage
- [ ] Schedule regular updates

## Recommended Starting Cities

Start with cities where:
1. You have local knowledge (can verify accuracy)
2. Websites are in languages you understand
3. Information is publicly available
4. Transport systems are well-documented

Example starting list:
- Central European capitals (Prague, Vienna, Budapest)
- Major tourist destinations (Barcelona, Amsterdam, Berlin)
- Cities with good documentation (Copenhagen, Zurich)

---

**Next Steps**: Once you have a working scraper for 20-30 cities, you can expand to volunteers who maintain their local cities while AI handles initial data extraction.
