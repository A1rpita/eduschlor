
# Logic snippet for Project Presentation
# Explaining how EduScholar Portal performs the Decision Support analysis

import json

def analyze_scholarship_eligibility(student_profile, scholarship_db):
    """
    Mock Logic of the Decision Support System
    """
    eligible_matches = []
    
    for scholarship in scholarship_db:
        score = 0
        
        # 1. Mandatory Income Check
        if student_profile['income'] <= scholarship['eligibility']['income_limit']:
            score += 1
            
        # 2. Merit Matching
        if student_profile['marks'] >= scholarship['eligibility'].get('min_marks', 0):
            score += 1
            
        # 3. Category/Social Logic
        if scholarship['eligibility'].get('category'):
            if student_profile['category'] in scholarship['eligibility']['category']:
                score += 1
        
        # If score passes threshold, the AI generates the Guide
        if score >= 2:
            eligible_matches.append(scholarship)
            
    return eligible_matches

# Example student profile
student = {
    "name": "Rahul",
    "income": 250000,
    "marks": 85,
    "category": "General",
    "state": "Maharashtra"
}

# The system combines this rule-based logic with LLM reasoning
# to provide the final 'Comprehensive Guide' found in the UI.