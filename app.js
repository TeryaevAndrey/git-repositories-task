const search = document.getElementById("search");
const form = document.getElementById("form");
const list = document.querySelector(".list");
const loading = document.querySelector(".form__loading");

const submitForm = async (e) => {
  e.preventDefault();

  list.innerHTML = "";

  loading.style.display = "flex";

  await fetch(
    `https://api.github.com/search/repositories?q=${search.value}&per_page=10`,
    {
      method: "GET",
    }
  )
    .then(async (res) => {
      const data = await res.json();

      if (data.total_count === 0) {
        list.innerHTML = `<p>Ничего не найдено</p>`;
      }

      const repositories = data.items;

      repositories.map((rep) => {
        return setRepositoryHTML(
          rep.id,
          rep.svn_url,
          rep.name,
          rep.owner.login
        );
      });
    })
    .catch(() => {
      list.innerHTML = `<p>Ошибка, попробуйте снова</p>`;
    });

  search.value = "";

  loading.style.display = "none";
};

const setRepositoryHTML = (id, url, repName, userName) => {
  let html = `
    <div class="item">
        <a class="item__name" href="${url}">${repName}</a>
        <p class="item__text">Пользователь: ${userName}</p>
        <p class="item__text">ID: ${id}</p>
    </div>
    `;

  return list.insertAdjacentHTML("beforeend", html);
};

form.addEventListener("submit", submitForm);
