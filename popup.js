const initPopup = () => {
    let prInput = document.getElementById("pr");
    prInput.addEventListener("keyup", handleKeyUp);
    prInput.addEventListener("change", handleChange);

    restoreLastPR();
};

const handleChange = () => {
    updateUrlsWithInput();
};

const handleKeyUp = (event) => {
    if (event.key === "Enter") {
        document.getElementById("manageCases").click();
    } else {
        updateUrlsWithInput();
    }
};

const restoreLastPR = () => {
    chrome.storage.local.get(["lastPR"]).then((result) => {
        if (result.lastPR !== undefined) {
            let prInput = document.getElementById("pr");
            prInput.value = result.lastPR;
            prInput.select();

            updateUrls(result.lastPR);
        }
    });
};

const updateUrlsWithInput = () => {
    let pr = document.getElementById("pr").value;
    updateUrls(pr);
    chrome.storage.local.set({"lastPR": pr});
};

const updateUrls = (pr) => {
    chrome.storage.local.get(["manageCases", "manageOrg", "ccdAdminWeb"]).then((result) => {
        document.getElementById("manageCases").href = result.manageCases.replace("{{number}}", pr);
        document.getElementById("manageOrg").href = result.manageOrg.replace("{{number}}", pr);
        document.getElementById("ccdAdminWeb").href = result.ccdAdminWeb.replace("{{number}}", pr);
    });
};

document.addEventListener("DOMContentLoaded", initPopup);
