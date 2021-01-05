---
layout: base.liquid
---

# Welcome to my site!

{% for post in collections.posts reversed %}
  <a href="{{ post.url }}">
    <h2>{{ post.data.title }}</h2>
    <time>{{ post.data.date | toUTCString }}</time>
  </a>
{% endfor %}

### Important note:
Text between `--- ---` is called `frontmatter`
