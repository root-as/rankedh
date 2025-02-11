import csv
import requests

# Function to get card image URL from Scryfall
def get_card_image_url(card_name):
    url = f"https://api.scryfall.com/cards/named?exact={card_name}"
    response = requests.get(url)
    if response.status_code == 200:
        card_data = response.json()
        
        # Check if the card is a flip card
        if card_data.get('layout') == 'flip':
            # Flip cards have a single image
            return card_data.get('image_uris', {}).get('normal', 'Image not found')
        # Check if the card is double-faced
        elif 'card_faces' in card_data:
            # Use the front face by default
            return card_data['card_faces'][0]['image_uris']['normal']
        else:
            # Single-faced card
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
    

        

        # Process each row
    for row in reader:
        # Treat the entire row as a single string
        row_str = ','.join(row)
        
        # Split into 'num' and 'name' manually
        rank = row_str.split(',', 1)[0]  # Split on the first comma only
        card_name = row_str.split(',', 1)[1] if ',' in row_str else row_str

        image_url = get_card_image_url(card_name)
        writer.writerow([rank, card_name, image_url])

print(f"Data written to {output_csv}")

with open('csv2json.py', 'r') as file:
    script = file.read()
exec(script)
print(f"Converted to json")