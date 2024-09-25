let time = document.querySelector(".time");

// algne aeg
time.innerHTML = new Intl.DateTimeFormat('et-EE', { hour: 'numeric', minute: 'numeric', hour12: false }).format(new Date());
time.setAttribute("title", new Intl.DateTimeFormat('et-EE', { hour: 'numeric', minute: 'numeric', hour12: false, year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()));

// uuenda kella aega iga minut
let timeSetter = setInterval(() => {
    time.innerHTML = new Intl.DateTimeFormat('et-EE', { hour: 'numeric', minute: 'numeric', hour12: false }).format(new Date());
    time.setAttribute("title", new Intl.DateTimeFormat('et-EE', { hour: 'numeric', minute: 'numeric', hour12: false, year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()));
}, 60000);

document.querySelector(".desktop").onclick = function () {
    document.querySelectorAll(".icon").forEach((e) => {
        e.classList.remove("selected");
    });
}

// Ikooni valimine
document.querySelectorAll(".icon").forEach((icon) => {
    icon.onclick = function () {
        setTimeout(() => {
            document.querySelectorAll(".icon").forEach((e) => {
                e.classList.remove("selected");
            });
            this.classList.add("selected");
        }, 1);
    };
});

// Salvesta akna algne positsioon
let originalWidth, originalHeight, originalTop, originalLeft;
let isMaximized = false;
let isMinimized = false;

// Suurenda nupp/maximize
document.querySelector(".max").onclick = function () {
    const windowElement = document.querySelector(".window");

    if (!isMaximized) {
        //originaal positsiooni ja suuruse salvestamine
        originalWidth = windowElement.offsetWidth;
        originalHeight = windowElement.offsetHeight;
        originalTop = windowElement.offsetTop;
        originalLeft = windowElement.offsetLeft;

        // Maximize
        windowElement.classList.add("maximized");
        windowElement.style.top = "0"; 
        windowElement.style.left = "0"; 
        windowElement.style.width = "100%";
        windowElement.style.height = "calc(100% - 32px)"; 
    } else {
        // Taasta suurus ja positsioon
        windowElement.classList.remove("maximized");
        windowElement.style.width = originalWidth + "px";
        windowElement.style.height = originalHeight + "px";
        windowElement.style.top = originalTop + "px";
        windowElement.style.left = originalLeft + "px";
    }

    // Toggle maximize
    isMaximized = !isMaximized;

    // Tühista akna lohistamine maximized seisus
    if (isMaximized) {
        document.querySelector(".title-bar").style.cursor = "default"; // Change cursor to default
    
        document.querySelector(".title-bar").onmousedown = null;
    } else {
        document.querySelector(".title-bar").style.cursor = "move"; // Restore draggable cursor
        // Lase lohistada kui taastada vaike aken
        dragWindow(windowElement);
    }
};

// Minimize button
document.querySelector(".min").onclick = function () {
    const windowElement = document.querySelector(".window");
    if (!isMinimized) {
        // peida aken
        windowElement.style.display = "none";
        isMinimized = true; //minimized seis
    } else {
        // taasta aken
        windowElement.style.display = "block";
        if (isMaximized) {
            // If maximized, pole rohkem suurendada vaja
        } else {
    
            windowElement.style.width = originalWidth + "px";
            windowElement.style.height = originalHeight + "px";
            windowElement.style.top = originalTop + "px";
            windowElement.style.left = originalLeft + "px";
        }
        isMinimized = false; // Reset minimized state
    }
};

// Toggle hinnangu leht (readme)
document.querySelector(".readme").onclick = function () {
    const readmeTab = document.querySelector(".readme");
    const windowElement = document.querySelector(".window");
    
    
    readmeTab.classList.toggle("active");
    windowElement.classList.toggle("minimized");

 
    if (windowElement.classList.contains("minimized")) {
        windowElement.style.display = "none"; // peida aken
    } else {
        windowElement.style.display = "initial"; // näita akent
    }
};

// Sulgemis nupp
document.querySelector(".cls").onclick = function () {
    document.querySelector(".readme").style.display = "none"; // Hide ReadME tab
    document.querySelector(".window").style.display = "none"; // Hide the window
};

// Notepad avamine
document.querySelector(".note-pad").ondblclick = function () {
    setTimeout(() => { this.classList.remove("selected"); }, 2);
    
    // Show hinnang 
    document.querySelector(".readme").style.display = "initial";
    document.querySelector(".window").style.display = "initial";
    
   
    document.querySelector(".readme").classList.add("active");
    document.querySelector(".window").classList.remove("minimized");
}

// akna lohistamine
function dragWindow(elmnt) {
    var offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    document.querySelector(".title-bar").onmousedown = function(e) {
        e = e || window.event;
        e.preventDefault();

        mouseX = e.clientX;
        mouseY = e.clientY;

        offsetX = mouseX - elmnt.offsetLeft;
        offsetY = mouseY - elmnt.offsetTop;

        document.onmouseup = stopDragging;
        document.onmousemove = draggedWindow;
    }

    function draggedWindow(e) {
        e = e || window.event;
        e.preventDefault();

        elmnt.style.left = (e.clientX - offsetX) + "px";
        elmnt.style.top = (e.clientY - offsetY) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// lase aknal lohiseda
dragWindow(document.querySelector(".window"));
