import requests
import subprocess
import os
import zipfile

# Função para obter a versão atual do Google Chrome
def get_chrome_version():
    result = subprocess.run(
        ['reg', 'query', 'HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon', '/v', 'version'], 
        capture_output=True, text=True
    )
    version_line = result.stdout.strip().split()[-1]
    return version_line.split('.')[0]

# Obter a versão atual do Chrome
chrome_version = get_chrome_version()

# URL do endpoint JSON para versões do ChromeDriver
LATEST_RELEASE_URL = "https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone-with-downloads.json"

# Obter a versão mais recente do ChromeDriver para a versão correspondente
response = requests.get(LATEST_RELEASE_URL)
latest_versions = response.json()

# Obter a versão correta do ChromeDriver para o Chrome instalado
latest_version_info = latest_versions["milestones"][chrome_version]["downloads"]["chromedriver"]

# Encontre o URL do ChromeDriver para win64 (ou a sua plataforma)
platform = 'win64'
download_url = None
for version in latest_version_info:
    if version['platform'] == platform:
        download_url = version['url']
        break

# Baixar e extrair o ChromeDriver
if download_url:
    response = requests.get(download_url)
    with open("chromedriver.zip", "wb") as file:
        file.write(response.content)
    with zipfile.ZipFile("chromedriver.zip", "r") as zip_ref:
        zip_ref.extractall(".")
    os.remove("chromedriver.zip")
    print("ChromeDriver baixado e extraído com sucesso.")
else:
    print(f"Não foi encontrado ChromeDriver para a versão {chrome_version}.")
