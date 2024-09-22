from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configura o WebDriver para usar o ChromeDriver baixado
service = Service(executable_path="./chromedriver-win64/chromedriver.exe")
driver = webdriver.Chrome(service=service)

# Define uma espera explícita
wait = WebDriverWait(driver, 10)

# Abre a página de cadastro
driver.get("http://localhost:3000/signup/aluno")  # Verifique se essa URL está correta

# Preenche o formulário de cadastro
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='nome']"))).send_keys("Nome Teste")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='email']"))).send_keys("teste@ex.com")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='matricula']"))).send_keys("123456")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password']"))).send_keys("12345678")

# Preenche o campo de confirmação de senha
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password-confirm']"))).send_keys("12345678")

# Submete o formulário
wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

# Verifica se o redirecionamento para a página de login ocorreu
try:
    wait.until(EC.url_contains("login"))
    print("Redirecionamento para a página de login com sucesso!")
except:
    print("O redirecionamento para a página de login falhou. Verifique a implementação ou os dados do formulário.")

# Preenche o formulário de cadastro
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='nome']"))).send_keys("Nome Teste")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='email']"))).send_keys("teste@ex.com")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='matricula']"))).send_keys("123456")
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password']"))).send_keys("12345678")

# Fecha o navegador
driver.quit()
