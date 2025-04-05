import json
import matplotlib.pyplot as plt
import os

# Ensure correct file paths
data_dir = './public/data/'  # Adjust based on your project structure

# Load JSON data - use try/except to handle missing files
try:
    # Codeforces data
    codeforces_data = json.load(open(os.path.join(data_dir, 'codeforcesData.json')))
    codeforces_contests = json.load(open(os.path.join(data_dir, 'codeforcesContests.json')))
    
    # CodeChef data
    codechef_data = json.load(open(os.path.join(data_dir, 'codechefData.json')))
    codechef_contests = json.load(open(os.path.join(data_dir, 'codechefContests.json')))
    
    # LeetCode data
    leetcode_data = json.load(open(os.path.join(data_dir, 'leetcodeData.json')))
    leetcode_contests = json.load(open(os.path.join(data_dir, 'leetcodeContests.json')))
except FileNotFoundError as e:
    print(f"Error: {e}")
    print("Please make sure all required data files exist in the ./public/data/ directory")
    exit(1)

# Function to calculate metrics for competitive programming platforms
def calculate_metrics(data, contests):
    problems_solved = sum([each['numberOfProblemsSolved'] for each in data])
    contests_attempted = len(contests)
    rating_increase = sum(contest['ratingChange'] for contest in contests)
    
    total_attempts = sum(problem['numberOfAttempts'] for each in data for problem in each['problemsSolved'])
    accuracy = (problems_solved / total_attempts) * 100 if total_attempts > 0 else 0
    
    problem_ratings = [problem['rating'] for each in data for problem in each['problemsSolved']]
    rating_histogram = {}
    for rating in problem_ratings:
        rating_histogram[rating] = rating_histogram.get(rating, 0) + 1
    
    return {
        'accuracy': accuracy,
        'problems_solved': problems_solved,
        'contests_attempted': contests_attempted,
        'rating_increase': rating_increase,
        'rating_histogram': rating_histogram
    }

# Calculate metrics for each platform
codeforces_metrics = calculate_metrics(codeforces_data, codeforces_contests)
codechef_metrics = calculate_metrics(codechef_data, codechef_contests)
leetcode_metrics = calculate_metrics(leetcode_data, leetcode_contests)
import matplotlib.pyplot as plt

# Histogram plotter (Codeforces, CodeChef)
def generate_histogram(rating_histogram, platform_name, color='skyblue'):
    ratings = list(rating_histogram.keys())
    counts = list(rating_histogram.values())

    plt.figure(figsize=(10, 6))
    plt.bar(ratings, counts, color=color, width=100)

    plt.xlabel('Problem Rating', fontsize=12, fontweight='bold')
    plt.ylabel('Number of Problems Solved', fontsize=12, fontweight='bold')
    plt.title(f'{platform_name} - Problems Solved by Rating', fontsize=14, fontweight='bold')
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()

    plt.savefig(f'./public/images/{platform_name.lower()}_histogram.png', dpi=300)
    plt.close()

# Pie chart plotter (LeetCode)
def generate_pie_chart(rating_histogram, platform_name):
    labels = list(rating_histogram.keys())
    sizes = list(rating_histogram.values())
    colors = ['#f1c40f', '#2ecc71', '#e74c3c']  # Easy, Medium, Hard

    plt.figure(figsize=(8, 8))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', colors=colors, startangle=140, textprops={'fontsize': 12})
    plt.title(f'{platform_name} - Distribution of Problem Ratings', fontsize=14, fontweight='bold')
    plt.axis('equal')  # Equal aspect ratio ensures pie is a circle
    plt.tight_layout()

    plt.savefig(f'./public/images/{platform_name.lower()}_piechart.png', dpi=300)
    plt.close()

# Usage
generate_histogram(codeforces_metrics['rating_histogram'], 'Codeforces', color='#3498db')
generate_histogram(codechef_metrics['rating_histogram'], 'CodeChef', color='#e74c3c')
generate_pie_chart(leetcode_metrics['rating_histogram'], 'LeetCode')

# Print metrics for verification
print("Codeforces Metrics:", codeforces_metrics)
print("CodeChef Metrics:", codechef_metrics)
print("LeetCode Metrics:", leetcode_metrics)
