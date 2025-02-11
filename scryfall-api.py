import csv
import requests

# Function to get card image URL from Scryfall
def get_card_image_url(card_name):
    url = f"https://api.scryfall.com/cards/named?exact={card_name}"
    response = requests.get(url)
    if response.status_code == 200:
        card_data = response.json()
        return card_data.get('image_uris', {}).get('normal', 'Image not found')
    else:
        return 'Card not found'

# Read the input CSV
input_csv = 'input.csv'
output_csv = 'cards.csv'

with open(input_csv, mode='r') as infile, open(output_csv, mode='w', newline='') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)
    
    # Write header to output CSV
    writer.writerow(['rank', 'item', 'image'])
    
    for row in reader:
        quantity, card_name = row
        image_url = get_card_image_url(card_name)
        writer.writerow([quantity, card_name, image_url])

print(f"Data written to {output_csv}")

with open('csv2json.py', 'r') as file:
    script = file.read()
exec(script)
print(f"Converted to json")