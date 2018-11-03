import csv

# Script for parsing raw CYMH data into unique service providers

SERVICE_PROVIDER_INITIAL = '../data/service_providers/service_providers_raw.csv'
SERVICE_PROVIDER_PARSED = '../data/service_providers/service_providers_parsed.csv'

websites = {}

with open(SERVICE_PROVIDER_INITIAL, newline='', encoding="ISO-8859-1") as file:
    reader = csv.reader(file, delimiter=',')
    for row in reader:
        # Reading name from column 1, and website from column 16
        site = row[15].split('/')
        name = row[0].split(' - ')[0]

        # Use domain of website as key, if no website, use provider name as key
        # eg: { 'www.kidshealth.com' : 'Kids Health', 'website-less' : 'website-less' }
        if len(site) > 2:
            key = site[2]
        else:
            key = name

        if key not in websites:
            websites[key] = name

        
with open(SERVICE_PROVIDER_PARSED, 'w', newline='', encoding="ISO-8859-1") as file:
    writer = csv.writer(file, delimiter=',')
    # Write headers
    writer.writerow(['Name', 'Website'])
    for key in websites:

        # No website found
        if key == websites[key]:
            writer.writerow([key])
        # Insert name and website info
        else:
            writer.writerow([websites[key], key])

print(('{} providers parsed.').format(len(websites)))
