import requests
import json
import urllib.parse
from name_gen import fetch_distinct_names
from combine_check import fetch_session_token, check_llp_name, check_private_limited_name
from requests_toolbelt.multipart.encoder import MultipartEncoder

# Rest of the code for session token extraction and check functions...
def main():
    session_token = fetch_session_token()
    suffix = input("Enter 'llp' or 'private limited': ").strip().lower()
    desc=input("Enter desc")
    av_names=[]
    if suffix == "llp" or suffix == "private limited":
        base_names = fetch_distinct_names(desc)
        print(base_names)
        for base_name in base_names:
            full_name = f"{base_name} {suffix.upper()}"
            if suffix == "llp":
                if check_llp_name(full_name, session_token):
                    # print(f"{full_name} is available as LLP.")
                    print(full_name)
                    av_names.append(full_name)
                else:
                    print(f"{full_name} is not available as LLP.")
            elif suffix == "private limited":
                if check_private_limited_name(full_name, session_token):
                    # print(f"{full_name} is available as Private Limited.")
                    print(full_name)
                    av_names.append(full_name)
                    print(av_names)
                else:
                    print(f"{full_name} is not available as Private Limited.")
                    # return None
    else:
        print("Invalid input. Please enter 'llp' or 'private limited'.")

if __name__ == "__main__":
    main()

