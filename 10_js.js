// Keeps track of new article numbering (so IDs stay unique)
let nextArticleNumber = 11;

window.addEventListener("DOMContentLoaded", () => {
  // Start with filter visible and add form hidden (matches your current CSS defaults)
  // But we also apply filtering once to ensure it behaves immediately.
  filterArticles();
});

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  // Toggle filter on/off, and always hide the add form when filter is shown
  if (filterForm.style.display === "none") {
    filterForm.style.display = "block";
    addForm.style.display = "none";
  } else {
    filterForm.style.display = "none";
  }
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  // Toggle add form on/off, and always hide the filter when add form is shown
  if (addForm.style.display === "none" || addForm.style.display === "") {
    addForm.style.display = "flex";
    filterForm.style.display = "none";
  } else {
    addForm.style.display = "none";
  }
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  const articles = document.querySelectorAll("#articleList article");

  articles.forEach((article) => {
    const isOpinion = article.classList.contains("opinion");
    const isRecipe = article.classList.contains("recipe");
    const isUpdate = article.classList.contains("update");

    let shouldShow = true;

    if (isOpinion && !showOpinion) shouldShow = false;
    if (isRecipe && !showRecipe) shouldShow = false;
    if (isUpdate && !showUpdate) shouldShow = false;

    article.style.display = shouldShow ? "" : "none";
  });
}

function addNewArticle() {
  const titleEl = document.getElementById("inputHeader");
  const textEl = document.getElementById("inputArticle");

  const title = titleEl.value.trim();
  const text = textEl.value.trim();

  const type = getSelectedType(); // "opinion" | "recipe" | "update"
  if (!title || !text || !type) {
    alert("Please enter a title, select a type, and enter text.");
    return;
  }

  // Build the new <article>
  const article = document.createElement("article");
  article.classList.add(type);
  article.id = "a" + nextArticleNumber;

  // Marker (this is what your CSS colors)
  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent = type === "opinion" ? "Opinion" : type === "recipe" ? "Recipe" : "Update";

  // Title
  const h2 = document.createElement("h2");
  h2.textContent = title;

  // Body text
  const pText = document.createElement("p");
  pText.textContent = text;

  // Read more link (matches your existing pattern)
  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  // Add to list
  document.getElementById("articleList").appendChild(article);

  // Clear form inputs
  titleEl.value = "";
  textEl.value = "";
  clearSelectedType();

  nextArticleNumber++;

  // Apply current filters so the new article is hidden/shown correctly
  filterArticles();
}

function getSelectedType() {
  const radios = document.querySelectorAll("input[name='articleType']");
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return null;
}

function clearSelectedType() {
  const radios = document.querySelectorAll("input[name='articleType']");
  radios.forEach((r) => (r.checked = false));
}