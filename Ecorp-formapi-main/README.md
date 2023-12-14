# FORM FILLING AI

## Description

Extracts data from documents and fills the required fields in Form-9, Part-B and Subscriber Sheet forms. Azure AI services are been unsed.

This code is tested on UBUNTU and might need changes if ran on Windows

> Before deployment along with requirements.txt following things are to be done 

- Export key and endpoint url to environment

        export MY_ENDPOINT="YOUR_ENDPOINT_URL_HERE"
        export MY_SECRET_KEY="YOUR_KEY_HERE"

- Install unoconv in ubuntu to convert docx file to pdf file with following command

        sudo apt-get update
        sudo apt install unoconv

- If that didn't work try installing libreoffice then install unoconv again with following command

        sudo apt-get update
        sudo apt-get install libreoffice

- Make changes in file names before deployment
- Files nned to be in same folder or we may have to change the file locations in the code
- Few tags are been left for user input need some changes at the time of deployment



