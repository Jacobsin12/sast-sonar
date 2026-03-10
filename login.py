import hashlib

# Simulación de una base de datos de usuarios (Esto es un "Code Smell" para Sonar)
USERS_DB = {
    "admin": "admin",
    "jacob": "0512",
    "user": "user"
}

def login():
    print("--- Sistema de Login Seguro ---")
    username = input("Usuario: ")
    password = input("Contraseña: ")

    # Verificación de credenciales
    if username in USERS_DB:
        # Vulnerabilidad a propósito: comparando texto plano
        if USERS_DB[username] == password:
            print(f"¡Bienvenido de nuevo, {username}!")
            return True
        else:
            print("Contraseña incorrecta.")
    else:
        print("El usuario no existe.")
    
    return False

if __name__ == "__main__":
    login()