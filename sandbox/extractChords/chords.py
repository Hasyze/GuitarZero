from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_chords_with_selenium(url):
    # Chemin vers le fichier chromedriver.exe, assurez-vous de télécharger la version compatible avec votre navigateur
    chromedriver_path = '/chemin/vers/chromedriver.exe'

    # Initialisation de Selenium avec le service Chrome
    service = ChromeService(chromedriver_path)
    driver = webdriver.Chrome(service=service)

    try:
        # Charger la page
        driver.get(url)

        # Attente jusqu'à ce que les éléments contenant les accords soient chargés (ajustez si nécessaire)
        wait = WebDriverWait(driver, 10)
        chords_elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.chord')))

        # Récupérer les accords
        chords = [chord.text for chord in chords_elements]

        return chords

    finally:
        # Fermer le navigateur
        driver.quit()

# Remplacez 'URL_DE_LA_PAGE' par l'URL réelle de la page web
url_page = 'https://www.boiteachansons.net/partitions/indochine/j-ai-demande-a-la-lune'
accords = get_chords_with_selenium(url_page)

if accords:
    print("Accords trouvés :", accords)
else:
    print("Aucun accord trouvé.")
