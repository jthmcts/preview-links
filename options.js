const saveOptions = () => {
   const manageCases = document.getElementById("manageCases").value;
   const manageOrg = document.getElementById("manageOrg").value;
    const ccdAdminWeb = document.getElementById("ccdAdminWeb").value;

   chrome.storage.local.set(
       { manageCases: manageCases, manageOrg: manageOrg, ccdAdminWeb: ccdAdminWeb }).then(() => {
          const status = document.getElementById("status");
          status.textContent = "Options saved";
          setTimeout(() => {
             status.textContent = "";
          }, 750);
       }
   );
};

const restoreOptions = () => {
   chrome.storage.local.get(
       ["manageCases", "manageOrg", "ccdAdminWeb"]).then((options) => {
          document.getElementById("manageCases").value = options.manageCases;
          document.getElementById("manageOrg").value = options.manageOrg;
          document.getElementById("ccdAdminWeb").value = options.ccdAdminWeb;
       }
   );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
