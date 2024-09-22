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

nomeTesteSucesso = "Osvaldo Cruz"
email = "Osvaldo@osvaldinho.com"
matricula = "77777"
senha = "12345678"


def faz_login(driver):
    driver.get("http://localhost:3000/login")
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    WebDriverWait(driver, 10).until(EC.url_contains("student/profile"))



def test_signup_valid_credentials():
    # Preenche o formulário de cadastro
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='nome']"))).send_keys(nomeTesteSucesso)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='email']"))).send_keys(email)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='matricula']"))).send_keys(matricula)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password']"))).send_keys(senha)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password-confirm']"))).send_keys(senha)

    # Submete o formulário
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

    # Verifica se o redirecionamento para a página de login ocorreu
    assert wait.until(EC.url_contains("login")), "Redirecionamento para a página de login falhou"


# Teste de login
def test_login_valid_credentials():
    driver.get("http://localhost:3000/login")
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    
    # Adicione um tempo de espera para garantir que o redirecionamento ocorra
    wait.until(EC.url_contains("student/profile"))
    assert "http://localhost:3000/student/profile" in driver.current_url



def test_dropdown_project():

    faz_login()

    driver.get("http://localhost:3000/student/profile")

    menu_button = driver.find_element(By.CLASS_NAME, 'btn-circle')
    menu_button.click()

        # Esperar o dropdown aparecer e localizar o dropdown
    dropdown_menu = driver.find_element(By.CSS_SELECTOR, ".menu.menu-sm.dropdown-content")

        # Dentro do dropdown, encontrar e clicar no link "Projetos"
    projetos_button = dropdown_menu.find_element(By.LINK_TEXT, 'Projetos')
    projetos_button.click()

    wait.until(EC.url_contains("/student/projects"))

    assert "http://localhost:3000/student/projects" in driver.current_url

        # Fechar o navegador após o teste


def test_click_details_button():
    # Usa o driver global
    try:
        faz_login(driver)

        # Navega para a página de projetos
        driver.get("http://localhost:3000/student/projects")

        # Aguarda até que o botão "Detalhes" esteja presente
        details_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary[href^='/student/applications/']")))

        # Verifica se o botão foi encontrado antes de clicar
        if details_button:
            details_button.click()


            # Verifica se o redirecionamento ocorreu corretamente
            wait.until(EC.url_contains("/student/applications/"))
            assert "/student/applications/" in driver.current_url, "Redirecionamento para a página de detalhes falhou"
            print("Teste de clique no botão 'Detalhes' foi bem-sucedido!")
        else:
            print("Botão 'Detalhes' não encontrado.")

    except Exception as e:
        print(f"Ocorreu um erro: {e}")

    finally:
        # Fecha o navegador
        driver.quit()

# Rodar o teste
test_click_details_button()

