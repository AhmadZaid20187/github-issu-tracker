const issuesContainer = document.getElementById("issuesContainer")




// async function loadIssues() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//     const info = await res.json();
//     console.log(info)
//     info.data.forEach(issues => {
//         console.log(issues)



//         // BTN for test

//         // const btn = document.createElement("button")
//         // btn.className = "btn btn-primary px-9";
//         // btn.textContent = issues.status
//         // openClosedBtn.appendChild(btn)
//     });
//     // openClosedBtn.innerHTML = `button will be in there`
// }

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const info = await res.json();
    displayIssues(info.data)
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

loadIssues();