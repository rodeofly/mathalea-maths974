# Fichier créé pour supprimer tous les fonctionComparaison inutile
# EE la 19/12/2024
# Fichier amené à disparaitre

import os
import re

def parcourir_repertoires(dir_path, extensions):
    """Récupère tous les fichiers avec les extensions données dans un répertoire et ses sous-répertoires."""
    fichiers = []
    for root, _, files in os.walk(dir_path):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                fichiers.append(os.path.join(root, file))
    return fichiers

def modifier_fichier(file_path, compteur_modifications):
    """Modifie un fichier en suivant les règles spécifiées."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    modifie = False

    # Supprimer `, compare: fonctionComparaison`
    content_nouveau = re.sub(r',\s*compare:\s*fonctionComparaison', '', content)
    if content != content_nouveau:
        modifie = True
        content = content_nouveau

    # Supprimer `this.compare = fonctionComparaison`
    content_nouveau = re.sub(r'this\.compare\s*=\s*fonctionComparaison\s*;?', '', content)
    if content != content_nouveau:
        modifie = True
        content = content_nouveau

    # Si modification, gérer les imports ou références
    if modifie:
        # Supprimer toute ligne contenant `{ fonctionComparaison }`
        regex_import = r'^.*\{\s*fonctionComparaison\s*\}.*$'
        content = re.sub(regex_import, '', content, flags=re.MULTILINE)

        # Sinon, supprimer `, fonctionComparaison` ou `fonctionComparaison,`
        content = re.sub(r',\s*fonctionComparaison', '', content)
        content = re.sub(r'fonctionComparaison,\s*', '', content)

        # Écrire le fichier uniquement si des modifications ont été apportées
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Modifié : {file_path}")

        # Incrémenter le compteur
        compteur_modifications[0] += 1
        if compteur_modifications[0] >= 100:
            return True  # Arrêter après 100 modifications

    return False


def main():
    """Fonction principale pour parcourir et modifier les fichiers."""
    dossier_de_depart = './'  # Répertoire à analyser
    extensions = ['.ts', '']  # Extensions ciblées

    # Récupérer tous les fichiers
    fichiers = parcourir_repertoires(dossier_de_depart, extensions)

    # Compteur de modifications
    compteur_modifications = [0]  # Utilisé comme une liste pour partager l'état

    # Appliquer les modifications, limiter à 50 fichiers
    for fichier in fichiers:
        if modifier_fichier(fichier, compteur_modifications):
            print("Limite de 100 fichiers modifiés atteinte.")
            break


if __name__ == '__main__':
    main()
