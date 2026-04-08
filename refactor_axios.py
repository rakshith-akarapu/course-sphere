import os
import re

def get_relative_api_path(file_path, base_path):
    # get relative depth
    rel_path = os.path.relpath(os.path.dirname(file_path), base_path)
    if rel_path == '.':
        return './api/api'
    
    depth = len(rel_path.split(os.sep))
    return '../' * depth + 'api/api'

def refactor_file(file_path, base_path):
    if file_path.endswith('api.js') or not (file_path.endswith('.jsx') or file_path.endswith('.js')):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # check if 'axios' is imported
    if not re.search(r'import\s+axios\s+from\s+[\'"]axios[\'"]', content):
        return

    rel_api_path = get_relative_api_path(file_path, base_path)
    
    # Replace import
    new_content = re.sub(r'import\s+axios\s+from\s+[\'"]axios[\'"];?', f'import API from "{rel_api_path}";', content)
    
    # Replace axios calls
    new_content = re.sub(r'\baxios\.', 'API.', new_content)
    
    # Replace hardcoded base URL localhost:8080
    # Match strings inside quotes or backticks "http://localhost:8080/api/" to "/"
    new_content = re.sub(r'(["\'`])http://localhost:8080/api/', r'\1/', new_content)
    # What if no trailing slash? (e.g. ".../api")
    new_content = re.sub(r'(["\'`])http://localhost:8080/api(["\'`])', r'\1/\2', new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Refactored: {file_path}")

def main():
    src_dir = r"c:\Users\nikhi\OneDrive\Documents\2nd_year\fullstack\Projects\course-sphere\src"
    base_path = src_dir
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            file_path = os.path.join(root, file)
            refactor_file(file_path, base_path)

if __name__ == "__main__":
    main()
