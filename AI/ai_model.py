from resources import resources_data

roles_data = {
    "Frontend Developer": ["HTML", "CSS", "JavaScript", "React"],
    "Backend Developer": ["Node.js", "Express", "MongoDB", "Python"],
    "Fullstack Developer": ["JavaScript", "Node.js", "React", "MongoDB"],
    "Data Scientist": ["Python", "Pandas", "NumPy", "Machine Learning"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD"]
}

def recommend_roles(user_skills):
    recommendations = []
    for role, skills_required in roles_data.items():
        match_count = len(set(user_skills) & set(skills_required))
        match_percentage = match_count / len(skills_required)
        if match_percentage > 0:
            recommendations.append({
                "role": role,
                "match": round(match_percentage * 100),
                "resources": resources_data.get(role, [])
            })
    recommendations.sort(key=lambda x: x["match"], reverse=True)
    return recommendations
