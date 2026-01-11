import pandas as pd
import logging
from src.api_client import api_call
from src.config import LEAGUE_ID, SEASON

def extract_fixtures():
    """Extract all fixtures"""
    logging.info("Extracting fixtures...")
    
    data = api_call('fixtures', {'league': LEAGUE_ID, 'season': SEASON})
    
    if not data or 'response' not in data:
        logging.error("No fixture data returned")
        return pd.DataFrame()
    
    fixtures = []
    for match in data['response']:
        try:
            fixtures.append({
                'fixture_id': match['fixture']['id'],
                'date': match['fixture']['date'],
                'venue': match['fixture']['venue'].get('name', 'Unknown'),
                'city': match['fixture']['venue'].get('city', 'Unknown'),
                'status': match['fixture']['status']['short'],
                'round': match['league']['round'],
                'home_team_id': match['teams']['home']['id'],
                'home_team': match['teams']['home']['name'],
                'away_team_id': match['teams']['away']['id'],
                'away_team': match['teams']['away']['name'],
                'home_goals': match['goals']['home'],
                'away_goals': match['goals']['away']
            })
        except KeyError as e:
            logging.warning(f"Missing field in fixture data: {e}")
            continue
    
    df = pd.DataFrame(fixtures)
    logging.info(f"Extracted {len(df)} fixtures")
    return df

def extract_standings():
    """Extract standings"""
    logging.info("Extracting standings...")
    
    data = api_call('standings', {'league': LEAGUE_ID, 'season': SEASON})
    
    if not data or 'response' not in data:
        logging.error("No standings data returned")
        return pd.DataFrame()
    
    standings = []
    for group in data['response'][0]['league']['standings']:
        for team in group:
            standings.append({
                'group': team['group'],
                'rank': team['rank'],
                'team_id': team['team']['id'],
                'team': team['team']['name'],
                'played': team['all']['played'],
                'win': team['all']['win'],
                'draw': team['all']['draw'],
                'lose': team['all']['lose'],
                'goals_for': team['all']['goals']['for'],
                'goals_against': team['all']['goals']['against'],
                'goal_diff': team['goalsDiff'],
                'points': team['points']
            })
    
    df = pd.DataFrame(standings)
    logging.info(f"Extracted standings for {len(df)} teams")
    return df

def extract_top_scorers():
    """Extract top scorers"""
    logging.info("Extracting top scorers...")
    
    data = api_call('players/topscorers', {'league': LEAGUE_ID, 'season': SEASON})
    
    if not data or 'response' not in data:
        logging.error("No top scorers data returned")
        return pd.DataFrame()
    
    scorers = []
    for player in data['response'][:30]:  # Top 30
        scorers.append({
            'player_id': player['player']['id'],
            'player_name': player['player']['name'],
            'team': player['statistics'][0]['team']['name'],
            'goals': player['statistics'][0]['goals']['total'],
            'assists': player['statistics'][0]['goals'].get('assists', 0),
            'appearances': player['statistics'][0]['games']['appearences'],
            'minutes': player['statistics'][0]['games']['minutes']
        })
    
    df = pd.DataFrame(scorers)
    logging.info(f"Extracted {len(df)} top scorers")
    return df
