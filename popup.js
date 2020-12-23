const buy = document.querySelector(".buy")
buy.addEventListener("click", pop)

function pop () {
    var cover = document.createElement("div");
    cover.classList.add('cover');
    var alert = document.createElement("div");
    alert.classList.add('alert');
    var text = document.createElement("span");
    text.textContent = "Varning, du ligger minus!";

    var btn = document.createElement("button");
    btn.textContent="stäng";
    btn.onclick = () => cover.remove();

    alert.appendChild(text);
    alert.appendChild(btn);
    cover.appendChild(alert);
    document.body.appendChild(cover);
}
