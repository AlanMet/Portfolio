#!/bin/bash
# Find all HTML files and update the navigation
for file in *.html; do
    sed -i '' 's/<a href="index"/<a href=".\/"/' "$file"
    sed -i '' 's/<a href="about"/<a href="about.html" class="nav-link"/' "$file"
    sed -i '' 's/<a href="projects"/<a href="projects.html" class="nav-link"/' "$file"
done
