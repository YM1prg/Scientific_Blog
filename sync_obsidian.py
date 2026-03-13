import os
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path

# --- Configuration ---
# Blog Project Paths (Relative to this script)
BLOG_ROOT = Path(__file__).parent
BLOG_POSTS_PATH = BLOG_ROOT / "content/posts"
BLOG_IMAGES_PATH = BLOG_ROOT / "public/images/blog"

# Default settings if frontmatter is missing
DEFAULT_CATEGORY = "other"

def ensure_dirs():
    """Ensure that the blog posts and images directories exist."""
    BLOG_POSTS_PATH.mkdir(parents=True, exist_ok=True)
    BLOG_IMAGES_PATH.mkdir(parents=True, exist_ok=True)

def process_frontmatter(content, file_name):
    """Ensure frontmatter exists and has required fields."""
    if not content.startswith('---'):
        # Add basic frontmatter
        title = file_name.replace('.md', '').replace('-', ' ').title()
        date = datetime.now().strftime('%Y-%m-%d')
        header = f"---\ntitle: {title}\ndate: '{date}'\ncategory: {DEFAULT_CATEGORY}\ntags: []\nexcerpt: ''\n---\n\n"
        return header + content
    
    # If frontmatter exists, we could further process it here if needed
    # For now, we assume it's mostly correct but ensure date is present if missing
    if 'date:' not in content[:500]:
        date = datetime.now().strftime('%Y-%m-%d')
        content = content.replace('---\n', f"---\ndate: '{date}'\n", 1)
        
    return content

def sync_post(obsidian_file_path, vault_root=None):
    ensure_dirs()
    
    obsidian_path = Path(obsidian_file_path)
    if not obsidian_path.exists():
        print(f"Error: File {obsidian_file_path} not found.")
        return

    file_name = obsidian_path.name
    with open(obsidian_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Process Frontmatter
    content = process_frontmatter(content, file_name)

    # 2. Process Images (WikiLinks: ![[image.png]])
    # Regex for ![[image.png]] or ![[image.png|caption]]
    image_pattern = r'!\[\[(.*?)\]\]'
    matches = re.findall(image_pattern, content)

    # Try to find attachments folder
    # 1. Check relative 'attachments' folder
    # 2. Check vault-wide 'attachments' if we can find vault root
    if vault_root is None:
        current = obsidian_path.parent
        while current != current.parent:
            if (current / ".obsidian").exists():
                vault_root = current
                break
            current = current.parent

    for match in matches:
        img_full_name = match.split('|')[0]
        img_src_path = None
        
        # Search strategy:
        # A. Same folder as MD file
        # B. 'attachments' folder in same folder
        # C. Global attachments folder in vault root
        possible_paths = [
            obsidian_path.parent / img_full_name,
            obsidian_path.parent / "attachments" / img_full_name,
        ]
        if vault_root:
            possible_paths.append(vault_root / "attachments" / img_full_name)
            # Add other common attachments paths if needed

        for p in possible_paths:
            if p.exists():
                img_src_path = p
                break
        
        if img_src_path:
            # Copy image to blog public folder
            target_img_name = img_full_name.replace(" ", "_") # Web-friendly names
            shutil.copy2(img_src_path, BLOG_IMAGES_PATH / target_img_name)
            
            # Replace Obsidian link with Web link
            web_link = f"![](/images/blog/{target_img_name})"
            content = content.replace(f"![[{match}]]", web_link)
            print(f"Synced image: {img_full_name} -> {target_img_name}")
        else:
            print(f"Warning: Image '{img_full_name}' not found in possible locations.")

    # 3. Save processed file to blog posts folder
    # Ensure extension is .mdx for our loader
    target_file_name = file_name if file_name.endswith('.mdx') else file_name.replace('.md', '.mdx')
    target_path = BLOG_POSTS_PATH / target_file_name
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Success: Post '{file_name}' synced to {target_path}")

def sync_directory(directory_path):
    """Recursively sync all .md files in a directory."""
    root_path = Path(directory_path)
    if not root_path.exists():
        print(f"Error: Directory {directory_path} not found.")
        return

    print(f"Syncing directory: {directory_path}")
    
    # Find all .md files (excluding those in hidden folders like .obsidian)
    # using rglob
    for file_path in root_path.rglob("*.md"):
        # Skip hidden files/folders
        if any(part.startswith('.') for part in file_path.parts):
            continue
            
        print(f"Processing: {file_path.name}")
        try:
            sync_post(file_path, vault_root=root_path)
        except Exception as e:
            print(f"Error syncing {file_path.name}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python sync_obsidian.py <path_to_obsidian_file_or_directory>")
        sys.exit(1)
    
    input_path = Path(sys.argv[1])
    
    if input_path.is_dir():
        sync_directory(input_path)
    elif input_path.is_file():
        sync_post(input_path)
    else:
        print(f"Error: Path {input_path} does not exist.")
        sys.exit(1)
