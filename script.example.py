import requests
import json
import os

# Your cookie (replace with your actual cookie string)
cookie = { "cookie_name": "YOUR_COOKIE_AT_FANBOX" }
headers = {
    "User-Agent": "Mozilla/5.0 (Linux) Gecko/20100101 Firefox/100.0 iFanboxFetch/1.0",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://fanbox.cc",
    "Referer": "https://fanbox.cc",
}

# List of file URLs you want to download
urls = []

# Directory to save the downloaded files
download_dir = "./"

with open('./metadata/images.json', 'r') as f:
    urls = json.load(f)

session = requests.Session()
session.cookies.update(cookie)
session.headers.update(headers)

def get_file(session, download_dir, url, file_name):
    # Make a GET request with the cookie
    response = session.get(url)

    # Save the file to the specified directory
    if response.status_code == 200:
        with open(download_dir + file_name, 'wb') as f:
            f.write(response.content)
        print(f'{file_name} downloaded successfully.')
    else:
        print(f'Failed to download {file_name}. Status code: {response.status_code}')

# Loop through each URL and download the file
# for index, item in enumerate(urls, start=1):
# start=1 makes the index start from 1 instead of 0
for index, item in enumerate(urls, start=1):    
    url = item["originalUrl"]

    # Extract the file name from the URL
    file_name = str(index) + "." + item["extension"]
    file_path = os.path.join(download_dir, file_name)

    # Check if the file already exists
    if os.path.exists(file_path):
        print(f"Skipping {file_name} (already exists)")
        # continue  # Skip this iteration if the file already exists
    else:
        print(f"Downloading {url} ...")
        get_file(session, download_dir, url, file_name)
