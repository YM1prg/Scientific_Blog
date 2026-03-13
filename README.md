## Automated Publishing (Obsidian to Next.js)

This project includes a built-in automation to sync content from an Obsidian vault to the blog.

### How it works

The `sync_obsidian.py` script scans the `content/obsidian-vault` directory for markdown files. It automatically:
1.  Copies `.md` files to `content/posts`.
2.  Adds/updates frontmatter (title, date).
3.  Copies linked images to `public/images/blog`.
4.  Rewrites Obsidian wiki-links `![[image.png]]` to standard Markdown `![](/images/blog/image.png)`.

### Workflow

1.  **Place your Obsidian files** in `content/obsidian-vault`.
    *   You can copy your entire vault or just the folder you want to publish.
    *   Images should be in the same folder as the note or in an `attachments` subfolder.
2.  **Commit and Push**:
    ```bash
    git add content/obsidian-vault
    git commit -m "Add new blog posts"
    git push
    ```
3.  **Netlify Build**:
    *   Netlify will automatically run `npm run sync-obsidian` before building the site.
    *   Your new posts will appear on the live site.

### Local Preview

To preview changes locally:

```bash
npm run sync-obsidian
npm run dev
```

### Configuration

The sync script is located at `sync_obsidian.py`. You can customize:
*   Default category.
*   Image paths.
*   Frontmatter logic.

