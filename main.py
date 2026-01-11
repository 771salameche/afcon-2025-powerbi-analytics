import os
import sys
import time
import logging
from datetime import datetime
from src.config import API_KEY, DATA_DIR, LOG_FILE
from src.data_processing import extract_fixtures, extract_standings, extract_top_scorers

def main():
    """Main execution function"""
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(LOG_FILE),
            logging.StreamHandler(sys.stdout)
        ]
    )

    if not API_KEY:
        logging.error("API_FOOTBALL_KEY not found in .env file!")
        sys.exit(1)

    # Create data directory if it doesn't exist
    os.makedirs(DATA_DIR, exist_ok=True)

    logging.info("=" * 60)
    logging.info("AFCON 2025 Data Extraction Started")
    logging.info(f"Timestamp: {datetime.now()}")
    logging.info("=" * 60)

    try:
        # Extract fixtures
        fixtures_df = extract_fixtures()
        if not fixtures_df.empty:
            filepath = os.path.join(DATA_DIR, 'afcon_fixtures.csv')
            fixtures_df.to_csv(filepath, index=False)
            logging.info(f"Saved to {filepath}\n")

        time.sleep(2)  # Rate limiting

        # Extract standings
        standings_df = extract_standings()
        if not standings_df.empty:
            filepath = os.path.join(DATA_DIR, 'afcon_standings.csv')
            standings_df.to_csv(filepath, index=False)
            logging.info(f"Saved to {filepath}\n")

        time.sleep(2)

        # Extract top scorers
        scorers_df = extract_top_scorers()
        if not scorers_df.empty:
            filepath = os.path.join(DATA_DIR, 'afcon_top_scorers.csv')
            scorers_df.to_csv(filepath, index=False)
            logging.info(f"Saved to {filepath}\n")

        logging.info("=" * 60)
        logging.info("Data extraction completed successfully!")
        logging.info("=" * 60)

    except Exception as e:
        logging.error(f"Extraction failed: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()
