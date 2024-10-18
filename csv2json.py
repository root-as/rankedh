import csv
import json

csv_file = 'cards.csv'  
json_file = 'cards.json'

data = []
with open(csv_file, mode='r', newline='') as file:
    reader = csv.DictReader(file)
    for row in reader:
        row['rank'] = int(row['rank'])
        data.append(row)

with open(json_file, mode='w') as file:
    json.dump(data, file, indent=2)

print(f"Successfully converted {csv_file} to {json_file}")