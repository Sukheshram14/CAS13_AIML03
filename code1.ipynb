import tweepy
import pandas as pd
import time
from transformers import pipeline
import matplotlib.pyplot as plt

# Set pandas option to display full tweet text
pd.set_option('display.max_colwidth', None)

# Twitter API credentials (use secure storage in production!)
api_key = "kf1QbiqqgH6DH8YqkKS5wHZJj"
api_key_secret = "hCh6JriicT9qurbuFgHsrdYJdifXfVhkjgNoQKWna7jOr44m97"
access_token = "1897563954542788608-P1d5lMOf1uIJF7WSS0YIbSJ7j2x59T"
access_token_secret = "jdkmnRWaRObbo1NxT22lhjNwB9NPxk4xFw8l9Nc8DVZYu"
bearer_token = "AAAAAAAAAAAAAAAAAAAAACgEzwEAAAAAOV3bYpCQgtYeAIBr30%2BKD0K2Hxs%3DZbr97S5FA10DOVULHqGJk5R8aDLBZrv0K1jtTy5htYLI8SSNys"

# Create a Tweepy client for API v2
client = tweepy.Client(bearer_token=bearer_token, 
                       consumer_key=api_key, 
                       consumer_secret=api_key_secret, 
                       access_token=access_token, 
                       access_token_secret=access_token_secret)

# Ask the user for a query string (e.g., "iPhone 16")
user_query = input("Enter your query (e.g., iPhone 16): ")
# Build the query string: exclude retweets and limit to English language
query = f"{user_query} -is:retweet lang:en"

# Try to fetch recent tweets using Twitter API v2.
try:
    response = client.search_recent_tweets(query=query, max_results=10)
    tweets = response.data if response.data is not None else []
except tweepy.TooManyRequests:
    print("Rate limit exceeded. Please wait and try again later.")
    tweets = []

if len(tweets) < 10:
    print(f"Warning: Only {len(tweets)} tweet(s) were fetched. Expected minimum 10 tweets if available.")

# Initialize the sentiment analysis pipeline using a pre-trained BERT-based model.
sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
# Initialize the emotion detection pipeline.
emotion_pipeline = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)

# Function to convert the model's star rating into a sentiment category.
def get_category(sentiment):
    label = sentiment['label']  # e.g., "5 stars"
    rating = int(label.split()[0])
    if rating <= 2:
        return "negative"
    elif rating == 3:
        return "neutral"
    else:
        return "positive"

results = []

# Analyze sentiment and emotion for each fetched tweet.
if tweets:
    for tweet in tweets:
        tweet_text = tweet.text
        # Sentiment analysis
        sentiment_result = sentiment_pipeline(tweet_text)[0]
        label = sentiment_result['label']
        rating = int(label.split()[0])
        category = get_category(sentiment_result)
        # Emotion detection
        emotion_result = emotion_pipeline(tweet_text)[0]
        emotion_label = emotion_result['label']
        emotion_score = emotion_result['score']
        results.append({
            "Tweet": tweet_text,
            "Rating": rating,
            "Sentiment": category,
            "Emotion": emotion_label,
            "Emotion Score": round(emotion_score, 3)
        })
    
    # Create and display a DataFrame with full tweet content and results.
    df = pd.DataFrame(results)
    print("\nDetailed Sentiment and Emotion Analysis for Fetched Tweets:")
    print(df)
    
    # Chart 1: Bar chart for sentiment category counts.
    category_counts = df['Sentiment'].value_counts()
    plt.figure(figsize=(8,6))
    category_counts.plot(kind='bar', color=['green', 'blue', 'red'])
    plt.title("Sentiment Category Counts")
    plt.xlabel("Sentiment")
    plt.ylabel("Number of Tweets")
    plt.show()
    
    # Chart 2: Pie chart for sentiment distribution.
    plt.figure(figsize=(8,6))
    category_counts.plot(kind='pie', autopct='%1.1f%%', startangle=90, colors=['green', 'blue', 'red'])
    plt.title("Sentiment Distribution")
    plt.ylabel("")
    plt.show()
else:
    print("No tweets found for the query or rate limit exceeded.")
