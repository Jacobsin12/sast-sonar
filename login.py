import hashlib

def hash_password(password):
    """Simula el hasheo de una contraseña (Buena práctica)"""
    return hashlib.sha256(password.encode()).hexdigest()

def login_seguro(username, password):
    # En un sistema real, esto vendría de una DB cifrada
    # No hay contraseñas en texto plano aquí
    users_db = {
        "admin": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", # admin123
        "jacob": "63f8682a220261a877995a97561a38210350d757530869695d77759c2520626b"  # 0512
    }
    
    if username in users_db:
        if users_db[username] == hash_password(password):
            return True
    return False

if __name__ == "__main__":
    user = input("Usuario: ")
    pw = input("Contraseña: ")
    
    if login_seguro(user, pw):
        print("Acceso concedido.")
    else:
        print("Acceso denegado.")