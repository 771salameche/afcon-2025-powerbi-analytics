# AFCON 2025 Power BI Analytics Dashboard

This project provides a data extraction pipeline for the Africa Cup of Nations (AFCON) 2025 tournament. It fetches data from the [api-football.com](https://www.api-football.com/) API, processes it, and saves it into CSV files ready for analysis and visualization in Power BI.

## Features

- **Fixture Data:** Extracts the full schedule of matches, including dates, venues, teams, and scores.
- **Group Standings:** Fetches the latest standings for each group, including points, goal difference, and form.
- **Top Scorers:** Retrieves a list of the top goal scorers in the tournament.

## Requirements

- Python 3.8+
- An API key for [api-football.com](https://www.api-football.com/)

## Setup and Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/afcon-2025-powerbi-analytics.git
    cd afcon-2025-powerbi-analytics
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    python -m venv myenv
    source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
    pip install -r requirements.txt
    ```

3.  **Set up your API key:**
    - Create a file named `.env` in the root of the project.
    - Add your API key to the `.env` file as follows:
      ```
      API_FOOTBALL_KEY='your_api_key_here'
      ```

4.  **Run the extraction script:**
    ```bash
    python main.py
    ```
    The script will create a `data/processed` directory and save the following files:
    - `afcon_fixtures.csv`
    - `afcon_standings.csv`
    - `afcon_top_scorers.csv`

    A log file `extraction.log` will also be created to monitor the script's execution.

## Power BI Integration

The generated CSV files in the `data/processed` directory can be used as data sources in Power BI to create a comprehensive analytics dashboard for the AFCON 2025 tournament.

---

*This project is for educational purposes and is not affiliated with the official AFCON tournament.*
