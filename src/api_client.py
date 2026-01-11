import requests
import time
import logging
from src.config import BASE_URL, API_KEY

headers = {'x-apisports-key': API_KEY}

def api_call(endpoint, params, max_retries=3):
    """Make API call with error handling and retries"""
    url = f"{BASE_URL}/{endpoint}"
    
    for attempt in range(max_retries):
        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check if API returned errors
                if 'errors' in data and data['errors']:
                    logging.error(f"API Error: {data['errors']}")
                    return None
                
                logging.info(f"✓ Successfully fetched {endpoint}")
                return data
                
            elif response.status_code == 429:
                logging.warning(f"Rate limit hit. Waiting 60 seconds...")
                time.sleep(60)
                continue
                
            elif response.status_code == 401:
                logging.error("Authentication failed. Check your API key.")
                return None
                
            else:
                logging.error(f"HTTP {response.status_code}: {response.text}")
                return None
                
        except requests.exceptions.Timeout:
            logging.warning(f"Timeout on attempt {attempt + 1}/{max_retries}")
            time.sleep(5)
            
        except requests.exceptions.RequestException as e:
            logging.error(f"Request failed: {e}")
            return None
    
    logging.error(f"Failed after {max_retries} attempts")
    return None
