jatos.onLoad(() => {
  jatos.addAbortButton();

  const prolificID = jatos.urlQueryParameters.PROLIFIC_PID || "unknown";

  // ------------------ Pages ------------------
  const pages = [
    "BDI-Page",
    "BAI-Page",
    "SHAPS-Page",
    "RRS-10-Page",
    "IUS-12-Page",
    "Debrief-Page",
  ];
  let currentPage = 0;
  const allResponses = {}; // store all scale responses

  const showPage = (index) => {
    pages.forEach((id, i) => {
      document.getElementById(id).style.display =
        i === index ? "block" : "none";
    });

    // Disable unload warning once the debrief page is shown
    if (pages[index] === "Debrief-Page") {
      window.onbeforeunload = null;
    }
  };
  showPage(currentPage);

  const nextButtons = {
    "BDI-Page": document.getElementById("button-bdi"),
    "BAI-Page": document.getElementById("button-bai"),
    "SHAPS-Page": document.getElementById("button-shaps"),
    "RRS-10-Page": document.getElementById("button-rrs-10"),
    "IUS-12-Page": document.getElementById("button-ius-12"),
  };

  // ------------------ Validation ------------------
  const validateForm = (formId) => {
    const form = document.getElementById(formId);
    const radioNames = [...form.querySelectorAll("input[type='radio']")].map(
      (r) => r.name
    );
    const uniqueNames = [...new Set(radioNames)];

    for (let name of uniqueNames) {
      if (!form.querySelector(`input[name="${name}"]:checked`)) {
        alert("Please answer all questions on this page before continuing.");
        return false;
      }
    }
    return true;
  };

  // ------------------ Collect responses ------------------
  const collectResponses = (formId) => {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input[type='radio']:checked");
    let responses = { participantID: prolificID };
    inputs.forEach((input) => {
      responses[`${formId}_${input.name}`] = input.value; // safer key naming
    });
    return responses;
  };

  // ------------------ CSV ------------------
  const convertToCSV = (obj) => {
    const keys = Object.keys(obj);
    const values = keys.map((k) => obj[k]);
    return [keys.join(","), values.join(",")].join("\n");
  };

  const saveCSV = (filename, data) => {
    const blob = new Blob([data], { type: "text/csv" });
    return jatos.uploadResultFile(blob, filename);
  };

  // 🧩 Warn users if they try to refresh or leave mid-questionnaire
  window.onbeforeunload = () =>
    "Are you sure you want to leave? Your progress will be lost.";

  // ------------------ Page Navigation ------------------
  Object.keys(nextButtons).forEach((pageId) => {
    nextButtons[pageId].addEventListener("click", () => {
      // if (!validateForm(pageId)) return;
      const responses = collectResponses(pageId);
      Object.assign(allResponses, responses);
      currentPage++;
      showPage(currentPage);
      window.scrollTo({ top: 0 });
    });
  });

  // 🟢 Upload and finish only on Debrief button
  document
    .getElementById("button-debrief")
    .addEventListener("click", async () => {
      const csvString = convertToCSV(allResponses);
      await saveCSV(`${prolificID}_questionnaires.csv`, csvString);
      jatos.startNextComponent();
    });
});
