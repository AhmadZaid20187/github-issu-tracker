const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const issueCounter = document.querySelector("span");
const issuDetailsModal = document.getElementById("issuDetailsModal");
const modalTitle = document.getElementById("modalTitle");
const modalBadge = document.getElementById("modalBadge");
const modalAurthor2 = document.getElementById("modalAurthor2");
const modalDate = document.getElementById("modalDate");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAuthor = document.getElementById("modalAuthor");
const modalPriority = document.getElementById("modalPriority");



function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    issuesContainer.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

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

async function searchIssues(query) {
    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const info = await res.json();
    hideLoading();
    displayIssues(info.data);
}

function getLabels(labels) {
    const iconMap = {
        bug: { icon: "fa-bug", cls: "badge-error" },
        enhancement: { icon: "fa-wand-magic-sparkles", cls: "badge-accent" },
        "help wanted": { icon: "fa-circle-radiation", cls: "badge-warning" },
    };
    return labels.map(label => {
        const style = iconMap[label] || { icon: "fa-tag", cls: "badge-info" };
        return `<div class="badge ${style.cls}">
                    <i class="fa-solid ${style.icon}"></i> ${label}
                </div>`;
    }).join("");
}


function displayIssues(issues) {
    issuesContainer.innerHTML = "";
    issueCounter.textContent = issues.length;

    if (issues.length === 0) {
        issuesContainer.innerHTML = `<div class="col-span-4 text-center py-10 text-gray-400 text-xl">No Issues Found</div>`;
        return;
    }

    issues.forEach(issue => {
        const card = document.createElement("div");
        card.className = `card bg-base-100 shadow-sm border-t-4 ${issue.status === 'open' ? 'border-t-green-400' : 'border-t-purple-400'}`;
        card.innerHTML = `
            <div class="card-body space-y-2" onclick="openIssuModel(${issue.id})">
                <div class="flex justify-between">
                    <img src="./assets/${issue.status === 'open' ? 'Open-Status.png' : 'Closed-Status.png'}" alt="" width="24" height="24"/>
                    <h2 class="badge badge-soft ${issue.priority === 'high' ? 'badge-error' : issue.priority === 'medium' ? 'badge-warning' : 'badge-success'} px-6 rounded-full">
                        ${issue.priority}
                    </h2>
                </div>
                <h2 class="card-title" >${issue.title}</h2>
                <p class="line-clamp-2">${issue.description}</p>
                <div class="card-actions justify-start">
                    ${getLabels(issue.labels)}
                </div>
                <hr>
                <div>
                    <h1><span>#${issue.id}</span> ${issue.author}</h1>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        issuesContainer.appendChild(card);
    });
}
document.querySelector("#search").addEventListener("click", () => {
    const query = document.querySelector("input[type='text']").value;
    if (query === "") {
        loadIssues();
    } else {
        searchIssues(query);
    }
});


async function openIssuModel(issuId) {
    console.log(issuId);
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issuId}`);
    const info = await res.json();
    const issuDetails = info.data;
    modalTitle.textContent = issuDetails.title;
    modalBadge.textContent = issuDetails.status;
    modalBadge.className = `badge ${issuDetails.status === 'open' ? 'badge-accent' : 'badge-error'}`;
    modalAuthor.textContent = issuDetails.author;
    modalAurthor2.textContent = issuDetails.author;
    modalDate.textContent = new Date(issuDetails.createdAt).toLocaleDateString();
    modalDescription.textContent = issuDetails.description;
    modalLabels.innerHTML = getLabels(issuDetails.labels);
    modalPriority.textContent = issuDetails.priority;
    modalPriority.className = `badge px-6 py-3 rounded-full ${issuDetails.priority === 'high' ? 'badge-error' :
        issuDetails.priority === 'medium' ? 'badge-warning' :
            'badge-success'
        }`;
    issuDetailsModal.showModal();
}


loadIssues(); 