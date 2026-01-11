import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration
API_KEY = os.getenv('API_FOOTBALL_KEY')
BASE_URL = "https://v3.football.api-sports.io"
LEAGUE_ID = 6
SEASON = 2025
DATA_DIR = "data/processed"
LOG_FILE = "extraction.log"
