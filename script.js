const issuesContainer = document.getElementById("issuesContainer")
const loadingSpinner = document.getElementById("loadingSpinner")
const openBtn = document.getElementById("open")




function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    issuesContainer.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add("hidden")
    loadingSpinner.classList.remove("flex")
}

// Change ALL,Open,Closed
function setActiveTab(id) {
    ["all", "open", "closed"].forEach(btnId => {
        document.getElementById(btnId).classList.remove("btn-active");
        document.getElementById(btnId).classList.remove("btn-primary");
    });
    document.getElementById(id).classList.add("btn-active");
    document.getElementById(id).classList.add("btn-primary");
}


async function loadIssues() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    hideLoading();
    setActiveTab("all");
    displayIssues(info.data);
}


async function opendBtn() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    const openOnly = info.data.filter(issue => issue.status === "open"); // ✅ filter!
    hideLoading();
    setActiveTab("open");
    displayIssues(openOnly);
}

async function closedBtn() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    const closedOnly = info.data.filter(issue => issue.status === "closed");
    hideLoading();
    setActiveTab("closed");
    displayIssues(closedOnly);
}


function displayIssues(issues) {
    // console.log(issues)
    issues.forEach(issu => {
        console.log(issu);
        const card = document.createElement("div")
        card.className = "card bg-base-100 shadow-sm";
        card.innerHTML = `
        
                <div class="card-body space-y-2">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                            <h2 class="badge badge-soft badge-error px-6 rounded-full">${issu.priority}</h2>
                    </div>
                    <h2 class="card-title">
                        ${issu.title}
                    </h2>
                    <p class="line-clamp-2">${issu.description}</p>
                    <div class="card-actions justify-start">
                        <div class="badge  badge-error"><i class="fa-solid fa-bug"></i>${issu.labels[0]}</div>
                        <div class="badge  badge-warning"><i class="fa-solid fa-circle-radiation"></i>${issu.labels[1]}</div>
                        <div class="badge badge-accent">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>Enhancement
                        </div>

                    </div>

                    <hr>

                        <div>
                            <h1><span>#${issu.id}</span> ${issu.author}</h1>
                            <p>${issu.updatedAt}</p>
                        </div>
                </div>
        `;
        issuesContainer.appendChild(card)
    });
}

function displayOpenIssues(issues) {
    issues.array.forEach(issu => {
        const cardO = document.createElement("div");
        cardO.className = "card bg-base-100 shadow-sm";
        cardO.innerHTML =
            `
        <div class="card-body space-y-2">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                            <h2 class="badge badge-soft badge-error px-6 rounded-full">${issu.priority}</h2>
                    </div>
                    <h2 class="card-title">
                        ${issu.title}
                    </h2>
                    <p class="line-clamp-2">${issu.description}</p>
                    <div class="card-actions justify-start">
                        <div class="badge  badge-error"><i class="fa-solid fa-bug"></i>${issu.labels[0]}</div>
                        <div class="badge  badge-warning"><i class="fa-solid fa-circle-radiation"></i>${issu.labels[1]}</div>
                        <div class="badge badge-accent">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>Enhancement
                        </div>

                    </div>

                    <hr>

                        <div>
                            <h1><span>#${issu.id}</span> ${issu.author}</h1>
                            <p>${issu.updatedAt}</p>
                        </div>
                </div>
        `
        issuesContainer.appendChild(cardO)
    });
}
loadIssues();
opendBtn();