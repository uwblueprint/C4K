import csv

websites = {}

# 12, 13, 16
with open('../data/service_providers/service_providers_raw.csv', newline='', encoding="ISO-8859-1") as file:
    reader = csv.reader(file, delimiter=',')
    for row in reader:
        site = row[15].split('/')
        name = row[0].split(' - ')[0]
        # Use domain of website as key, if no website, use name
        if len(site) > 2:
            key = site[2]
        else:
            key = name

        if key not in websites:
            websites[key] = name

        
with open('../data/service_providers/service_providers_parsed.csv', 'w', newline='', encoding="ISO-8859-1") as file:
    writer = csv.writer(file, delimiter=',')
    # Write headers
    writer.writerow(['Name', 'Website'])
    for key in websites:
        # No website found
        if key == websites[key]:
            writer.writerow([key])
        else:
            writer.writerow([websites[key], key])

# for key in websites:
#     print('Name: {}, Website: {}'.format(websites[key], key))

print(len(websites))