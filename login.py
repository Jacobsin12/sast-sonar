import os
import sqlite3
import hashlib

# 1. ERROR CRÍTICO: Credenciales grabadas en el código (Hardcoded)
ADMIN_USER = "admin"
ADMIN_PASS = "12345678" 

def sistema_inseguro():
    print("--- SISTEMA DE CONTROL TOTAL ---")
    
    # 2. VULNERABILIDAD: Inyección de SQL (Concatenar strings en queries)
    usuario = input("Introduce usuario para buscar en DB: ")
    conn = sqlite3.connect('usuarios.db')
    cursor = conn.cursor()
    # Esto es un pecado capital en SQL:
    query = "SELECT * FROM users WHERE name = '" + usuario + "'"
    cursor.execute(query)
    
    # 3. VULNERABILIDAD: Inyección de Comandos de Sistema
    # Un usuario malintencionado podría escribir "; rm -rf /"
    archivo = input("Dime qué archivo quieres borrar: ")
    os.system("rm " + archivo) 

    # 4. CODE SMELL: Uso de funciones obsoletas o peligrosas
    # eval() es extremadamente peligroso
    comando_loco = input("Escribe una operación matemática: ")
    print("Resultado: ", eval(comando_loco))

    # 5. CODE SMELL: Código muerto (nunca se ejecuta)
    if False:
        a = 10
        b = 20
        print(a + b)

if __name__ == "__main__":
    sistema_inseguro()