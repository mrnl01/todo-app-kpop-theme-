// ===== Bias themes: colors, images & gifs =====
const biasThemes = {
    "BTS": {
        bg: "#5B2C6F",
        accent: "linear-gradient(120deg, #9B59B6, #D2B4DE)",
        text: "#F8F9F9",
        container: "linear-gradient(145deg, rgba(155,89,182,0.4), rgba(210,180,222,0.3))",
        gif: "gifs/jungkook.gif",
        image: "images/bts.jpg"
    },
    "Stray Kids": {
        bg: "#3a07f3",
        accent: "linear-gradient(120deg, #ff2f00, #6c0707)",
        text: "#FFFFFF",
        container: "linear-gradient(145deg, rgba(249, 85, 67, 0.4), rgba(212, 132, 132, 0.3))",
        gif: "gifs/hyunjin.gif",
        image: "images/skz.jpg"
    },
    "Enhypen": {
        bg: "#00AEEF",
        accent: "linear-gradient(120deg, #33CCFF, #99E6FF)",
        text: "#FFFFFF",
        container: "linear-gradient(145deg, rgba(249, 155, 170, 0.3), rgba(153,230,255,0.2))",
        gif: "gifs/sunghoon.gif",
        image: "images/enhypen.jpg"
    },
    "TXT": {
        bg: "#a4ebe3",
        accent: "linear-gradient(120deg, #76f8ff, #FFE57F)",
        text: "#000000",
        container: "linear-gradient(145deg, rgba(241, 244, 203, 0.3), rgba(248, 244, 230, 0.25))",
        gif: "gifs/taehyun.gif",
        image: "images/txt.jpg"
    }
};

// ===== Emoji lists =====
const biasEmojis = {
    "BTS": ["💜","🖤","✨","🎶","🎤"],
    "Stray Kids": ["🔥","💥","🖤","🎧","🎵"],
    "Enhypen": ["💙","🌟","🎹","🎵","⚡"],
    "TXT": ["💛","⚡","🎸","🎤","🌈"]
};

// ===== Change theme =====
function changeBias() {
    const selected = document.getElementById("bias").value;
    if (!selected || !biasThemes[selected]) return;

    const theme = biasThemes[selected];

    // 🌌 Background image with overlay
    document.body.style.background = `
        linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
        url('${theme.image}') no-repeat center center / cover
    `;

    // CSS variables
    document.documentElement.style.setProperty('--main-bg', theme.bg);
    document.documentElement.style.setProperty('--accent-bg', theme.accent);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--container-bg', theme.container);

    // 🎨 h1 gradient
    const h1 = document.querySelector("h1");

    switch(selected) {
        case "BTS":
            h1.style.background = "linear-gradient(135deg, #FFC0CB, #FF69B4)";
            break;
        case "Stray Kids":
            h1.style.background = "linear-gradient(135deg, #FFFACD, #FFFFE0)";
            break;
        case "Enhypen":
            h1.style.background = "linear-gradient(135deg, #FFFFFF, #F9FF9E)";
            break;
        case "TXT":
            h1.style.background = "linear-gradient(135deg, #01001c, #092258)";
            break;
        default:
            h1.style.background = "linear-gradient(135deg, #D580FF, #8A2BE2)";
    }

    h1.style.webkitBackgroundClip = "text";
    h1.style.webkitTextFillColor = "transparent";
}

// ===== Add task =====
function addTask() {
    const input = document.getElementById("task-input");
    const task = input.value.trim();
    if (!task) return;

    const li = document.createElement("li");
    li.textContent = `⬜ ${task}`;
    li.onclick = () => completeTask(li);

    document.getElementById("todo-list").appendChild(li);

    saveTasks();
    input.value = "";
}

// ===== Complete task =====
function completeTask(li) {
    const selectedBias = document.getElementById("bias").value;

    let emojis = biasEmojis[selectedBias] || ["✅"];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // replace emoji
    li.textContent = `${randomEmoji} ${li.textContent.slice(2)}`;

    // 🎬 SHOW GIF
    const gifUrl = biasThemes[selectedBias]?.gif;

    if (gifUrl) {
        const img = document.createElement("img");
        img.src = gifUrl;
        img.classList.add("task-gif");
        document.body.appendChild(img);

        setTimeout(() => img.remove(), 3500);
    }

    saveTasks();

    // ❌ remove task after 4.5 sec
    setTimeout(() => {
        li.remove();
        saveTasks();
    }, 4500);
}

// ===== Save tasks =====
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Load tasks =====
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const ul = document.getElementById("todo-list");

    ul.innerHTML = "";

    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        li.onclick = () => completeTask(li);
        ul.appendChild(li);
    });
}

// ===== Init =====
window.onload = () => {
    loadTasks();
};
