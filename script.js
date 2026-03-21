// ===== Bias themes: colors, images & audio =====
const biasThemes = {
    "BTS": {
        bg: "#5B2C6F",  // deep purple, keep as is
        accent: "linear-gradient(120deg, #9B59B6, #D2B4DE)", // softer purple-pink gradient
        text: "#F8F9F9", // soft off-white
        container: "linear-gradient(145deg, rgba(155,89,182,0.4), rgba(210,180,222,0.3))", // frosted violet-pink
        gif: "gif/jungkook.gif",
        image: "images/bts.jpg"
    },
    "Stray Kids": {
        bg: "#FF0000", // bold red
        accent: "linear-gradient(120deg, #FF6666, #FFB3B3)", // pinkish-red gradient
        text: "#FFFFFF", // white for contrast
        container: "linear-gradient(145deg, rgba(255,102,102,0.4), rgba(255,179,179,0.3))", // soft red frosted
        gif: "gif/hyunjin.gif",
        image: "images/straykids.jpg"
    },
    "Enhypen": {
        bg: "#00AEEF", // bright cyan
        accent: "linear-gradient(120deg, #33CCFF, #99E6FF)", // soft cyan-blue gradient
        text: "#FFFFFF", // white for readability
        container: "linear-gradient(145deg, rgba(51,204,255,0.3), rgba(153,230,255,0.2))", // frosted cyan
        gif: "gif/sunghoon.gif",
        image: "images/enhypen.jpg"
    },
    "TXT": {
        bg: "#F7E417", // bright yellow
        accent: "linear-gradient(120deg, #FFF176, #FFE57F)", // pastel yellow gradient
        text: "#000000", // black for contrast
        container: "linear-gradient(145deg, rgba(255,241,118,0.3), rgba(255,229,127,0.25))", // frosted yellow
        gif: "gif/taehyun.gif",
        image: "images/txt.jpg"
    }
};

// ===== Bias emoji lists =====
const biasEmojis = {
    "BTS": ["💜","🖤","✨","🎶","🎤"],
    "Stray Kids": ["🔥","💥","🖤","🎧","🎵"],
    "Enhypen": ["💙","🌟","🎹","🎵","⚡"],
    "TXT": ["💛","⚡","🎸","🎤","🌈"]
};

// ===== Change page theme when bias selected =====
function changeBias() {
    const select = document.getElementById("bias");
    const selected = select.value;

    if (!selected || !biasThemes[selected]) return;

    const theme = biasThemes[selected];

    // Body & container theme
    document.body.style.backgroundImage = `url('${theme.image}')`;
    document.documentElement.style.setProperty('--main-bg', theme.bg);
    document.documentElement.style.setProperty('--accent-bg', theme.accent);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--container-bg', theme.container);

    
    // Update h1 gradient dynamically
    const h1 = document.querySelector("h1");
    switch(selected) {
    case "BTS":
        // bg: #5B2C6F (deep purple) → use bright pink/purple for contrast
        h1.style.background = "linear-gradient(135deg, #FFC0CB, #FF69B4)";
        break;

    case "Stray Kids":
        // bg: #FF0000 (bold red) → use white/pale yellow for contrast
        h1.style.background = "linear-gradient(135deg, #FFFACD, #FFFFE0)";
        break;

    case "Enhypen":
        // bg: #00AEEF (cyan) → use bright magenta/purple for contrast
        h1.style.background = "linear-gradient(135deg, #fdfafa, #f9ff9e)";
        break;

    case "TXT":
        // bg: #F7E417 (yellow) → use deep purple/pink for contrast
        h1.style.background = "linear-gradient(135deg, #8A2BE2, #D580FF)";
        break;

    default:
        h1.style.background = "linear-gradient(135deg, #D580FF, #8A2BE2)"; // fallback
}

    h1.style.webkitBackgroundClip = "text";
    h1.style.webkitTextFillColor = "transparent";
}

// ===== Add new task =====
function addTask() {
    const input = document.getElementById("task-input");
    const task = input.value.trim();
    if (!task) return;

    const select = document.getElementById("bias");
    const selectedBias = select.value;

    const emoji = "⬜"; // placeholder emoji for incomplete

    const li = document.createElement("li");
    li.textContent = `${emoji} ${task}`;
    li.onclick = () => completeTask(li);

    document.getElementById("todo-list").appendChild(li);

    saveTasks();
    input.value = "";
}

// ===== Complete task =====
function completeTask(li) {
    const select = document.getElementById("bias");
    const selectedBias = select.value;

    // pick random emoji from bias list
    let emojis = biasEmojis[selectedBias] || ["✅"];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    li.textContent = `${randomEmoji} ${li.textContent.slice(2)}`;
    li.classList.add("done");

    // play audio
    // play audio
    // play audio
if (selectedBias && biasThemes[selectedBias]) {
    const audio = document.getElementById("audio");
    audio.src = biasThemes[selectedBias].audio;
    audio.play();

    // ===== SHOW GIF =====
    const gifUrl = biasThemes[selectedBias].gif;

    if (gifUrl) {
        const img = document.createElement("img");
        img.src = gifUrl;
        img.classList.add("task-gif");
        document.body.appendChild(img);

        // remove after 3.5 sec
        setTimeout(() => {
            img.remove();
        }, 3500);
    }
}

    saveTasks();

    // remove after 3.5 seconds
    setTimeout(() => {
        li.remove();
        saveTasks();
    }, 4500);
}

// ===== Save tasks to localStorage =====
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push(li.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Load tasks from localStorage =====
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    savedTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        li.onclick = () => completeTask(li);
        if (!task.startsWith("⬜")) li.classList.add("done");
        ul.appendChild(li);
    });
}

// ===== Initialize on page load =====
window.onload = () => {
    loadTasks();
};