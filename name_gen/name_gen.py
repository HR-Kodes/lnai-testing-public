import requests

def fetch_distinct_names(desc):
    url = "https://engine.renderforest.com/api/v1/business-name-suggestions"
    headers = {
        "Host": "engine.renderforest.com",
        "Origin": "https://www.renderforest.com",
        "Referer": "https://www.renderforest.com/business-name-suggestions",
    }
    data = {"description": desc, "limit": 20, "offset": 0}

    distinct_names = set()  # To store distinct names
    total_collected = 0
    desired_total = 150

    while total_collected < desired_total:
        response = requests.post(url, headers=headers, data=data)
        names = response.json().get('data', {}).get('names', [])

        for name in names:
            if name not in distinct_names:
                distinct_names.add(name)
                total_collected += 1

                if total_collected >= desired_total:
                    break

        data['offset'] += 20

    return list(distinct_names)

# Call the function to get the list of names
# all_names = fetch_distinct_names()

# # Print the collected distinct names
# for idx, name in enumerate(all_names, start=1):
#     print(f"{idx}. {name}")

# print(f"Collected {len(all_names)} distinct names.")

