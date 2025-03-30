import requests
import os

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# List of images to download with direct Unsplash URLs
images = {
    'nagoya-castle.jpg': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
    'atsuta-shrine.jpg': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    'toyota-museum.jpg': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
    'science-museum.jpg': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
    'nagoya-tv-tower.jpg': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c',
    'noritake-garden.jpg': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    'osu-kannon.jpg': 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
    'jazz-dream.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    'richmond-hotel.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    'centrair-airport.jpg': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    'kishimen.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    'miso-katsu.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    'chicken-wings.jpg': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2',
    'hitsumabushi.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    'nagoya-skyline.jpg': 'https://images.unsplash.com/photo-1519003722824-194d4455a60c',
    'sakae-district.jpg': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
}

# Download each image
for filename, url in images.items():
    print(f'Downloading {filename}...')
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(os.path.join('images', filename), 'wb') as f:
                f.write(response.content)
            print(f'Successfully downloaded {filename}')
        else:
            print(f'Failed to download {filename} (Status code: {response.status_code})')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

print('Download complete!') 