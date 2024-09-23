from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configura o WebDriver para usar o ChromeDriver baixado
service = Service(executable_path="./chromedriver-win64/chromedriver.exe")
driver = webdriver.Chrome(service=service)

# Define uma espera explícita

wait = WebDriverWait(driver, 6000)

nomeTesteSucesso = "Osvaldo Oscar"
email = "Osvaldo3@osvaldo.com"
matricula = "777777774"
senha = "12345678"


def faz_loginStudent(driver):
    driver.get("http://localhost:3000/login")
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(email)
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)
    time.sleep(2)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    WebDriverWait(driver, 10).until(EC.url_contains("student/profile"))



def navega_profile(driver, pagina):
    menu_button = driver.find_element(By.CLASS_NAME, 'btn-circle')
    time.sleep(3)
    menu_button.click()

        # Esperar o dropdown aparecer e localizar o dropdown
    time.sleep(3)
    dropdown_menu = driver.find_element(By.CSS_SELECTOR, ".menu.menu-sm.dropdown-content")

        # Dentro do dropdown, encontrar e clicar no link "Projetos"
    time.sleep(2)
    projetos_button = dropdown_menu.find_element(By.LINK_TEXT, pagina)
    time.sleep(3)
    projetos_button.click()

    wait.until(EC.url_contains("/student/projects"))



def test_signup_validStudent_credentials():
    driver.get("http://localhost:3000/signup/aluno")
    # Preenche o formulário de cadastro
    time.sleep(2)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='nome']"))).send_keys(nomeTesteSucesso)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='email']"))).send_keys(email)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='matricula']"))).send_keys(matricula)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password']"))).send_keys(senha)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input.input-bordered[type='password-confirm']"))).send_keys(senha)

    # Submete o formulário
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

    # Verifica se o redirecionamento para a página de login ocorreu
    assert wait.until(EC.url_contains("login")), "Redirecionamento para a página de login falhou"
    print("Teste para cadastro de Aluno bem-sucedido!")


# Teste de login
def test_login_valid_credentials():
    driver.get("http://localhost:3000/login")
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    
    # Adicione um tempo de espera para garantir que o redirecionamento ocorra
    wait.until(EC.url_contains("student/profile"))
    assert "http://localhost:3000/student/profile" in driver.current_url
    print("Teste para login de Aluno bem-sucedido!")





def test_dropdown_project():

    faz_loginStudent(driver)

    time.sleep(3)
    driver.get("http://localhost:3000/student/profile")
    time.sleep(2)
    menu_button = driver.find_element(By.CLASS_NAME, 'btn-circle')
    time.sleep(2)
    menu_button.click()

        # Esperar o dropdown aparecer e localizar o dropdown
    time.sleep(3)
    dropdown_menu = driver.find_element(By.CSS_SELECTOR, ".menu.menu-sm.dropdown-content")

        # Dentro do dropdown, encontrar e clicar no link "Projetos"
    time.sleep(3)
    projetos_button = dropdown_menu.find_element(By.LINK_TEXT, 'Candidaturas')
    time.sleep(3)
    projetos_button.click()

    wait.until(EC.url_contains("/student/applications"))

    assert "http://localhost:3000/student/applications" in driver.current_url
    print("Tela de clique no botao Candidaturas foi bem-sucedido!")
        # Fechar o navegador após o teste
    driver.quit()


def test_click_details_button():
    # Usa o driver global
    try:
        faz_loginStudent(driver)
        
        # Navega para a página de projetos
        navega_profile(driver, 'Projetos')
        time.sleep(3)
        # Aguarda até que o botão "Detalhes" esteja presente
        details_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary[href^='/student/applications/']")))

        # Verifica se o botão foi encontrado antes de clicar
        if details_button:
            time.sleep(3)
            details_button.click()

            # Verifica se o redirecionamento ocorreu corretamente
            wait.until(EC.url_contains("/student/applications/"))
            assert "/student/applications/" in driver.current_url, "Redirecionamento para a página de detalhes falhou"
            print("Teste de clique no botao 'Detalhes' foi bem-sucedido!")
        else:
            print("Botao 'Detalhes' não encontrado.")

    except Exception as e:
        print(f"Ocorreu um erro: {e}")



#Testes de Professor
nomeProfessorTesteSucesso = "Nikola Tesla"
emailProfessor = "tesla@tesla.com"
matriculaProfessor = "101010101"
senha = "12345678"



def faz_loginProfessor(driver):
    driver.get("http://localhost:3000/login")
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(emailProfessor)  # Use a variável correta para o email do professor
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)  # Use a variável correta para a senha
    time.sleep(2)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    wait.until(EC.url_contains("/professor"))

def test_login_valid_professor_credentials():
    # Acessa a página de login
    driver.get("http://localhost:3000/login")
    time.sleep(2)
    # Preenche o formulário de login do professor
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='email']").send_keys(emailProfessor)
    driver.find_element(By.CSS_SELECTOR, "input.input-bordered[type='password']").send_keys(senha)
    driver.find_element(By.CSS_SELECTOR, "button.btn-primary").click()
    
    time.sleep(2)
    # Espera até que a URL contenha "/professor"
    wait.until(EC.url_contains("/professor"))
    
    # Verifica se o redirecionamento para a página do professor ocorreu
    assert "http://localhost:3000/professor" in driver.current_url, "Redirecionamento para a página do professor falhou"
    print("Teste de login do professor foi bem-sucedido!")

# Dados para o novo projeto
novo_projeto_nome = f"Projeto Aleatório"
novo_projeto_descricao = "Descrição do projeto aleatório"
novo_projeto_data = "2024-09-30"
novo_projeto_slots = 5

def test_add_new_project():
    faz_loginProfessor(driver)
    
    # Espera pelo redirecionamento para a página do professor
    wait.until(EC.url_contains("/professor"))

    # Clica no botão "Adicionar +"
    time.sleep(3)
    wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Adicionar')]"))).click()
    time.sleep(3)

    # Verifica se o modal está aberto
    wait.until(EC.visibility_of_element_located((By.ID, "create_project_modal")))

    # Preenche os detalhes do novo projeto
    novo_projeto_nome = "Nome Teste"

    # Para o campo 'Nome'
    name_label = driver.find_element(By.XPATH, "//span[text()='Nome']/ancestor::label//input")
    name_label.send_keys(novo_projeto_nome)

    # Para o campo 'Laboratório'
    lab_label = driver.find_element(By.XPATH, "//span[text()='Laboratório']/ancestor::label//input")
    lab_label.send_keys("Laboratório Teste")
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='number']"))).send_keys("5")
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "textarea"))).send_keys("Descrição do projeto")

    # Clica no botão para salvar o novo projeto
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[type='submit']"))).click()

    # Aguarda o tempo necessário para a atualização da página
    time.sleep(3)  # Opcional

    # Verifica se o novo projeto foi adicionado
    wait.until(EC.visibility_of_element_located((By.XPATH, f"//h2[contains(text(), '{novo_projeto_nome}')]")))
    assert novo_projeto_nome in driver.page_source, "O novo projeto nao foi adicionado com sucesso!"

    print("O novo projeto foi adicionado com sucesso!")
    driver.quit()

#baixe o selenium e o webdriver. se usar o chrome execute o installChromedriver
#para rodar os teste é só remover as '#' e executar

# Rodar o teste de Alunos
# test_click_details_button()
# time.sleep(2)
# driver.quit()
# test_dropdown_project()

# test_signup_validStudent_credentials()
# test_login_valid_professor_credentials()
test_add_new_project()