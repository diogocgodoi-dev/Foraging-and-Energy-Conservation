jatos.onLoad(() => {
  const prolificID = jatos.workerId || "unknown";

  const buttonPIS = document.querySelector("#button-PIS");
  const pis = document.getElementById("PIS");
  const consentForm = document.getElementById("ConsentForm");
  const checkboxes = document.querySelectorAll(".consent-checkbox");
  const buttonConsent = document.getElementById("button-Consent");
  const demographicInfo = document.getElementById("demographic-info");
  const medicationRadios = document.querySelectorAll(
    'input[name="medication-status"]'
  );
  const medicationsBox = document.getElementById("medications-box");
  const instructionsPage = document.getElementById("instructions-page");
  const instructionsQuiz = document.getElementById("instructions-quiz");
  const startButton = document.getElementById("button-start-task");

  // Hide everything else until instructions are read
  const allSections = document.querySelectorAll(".page-section");
  allSections.forEach((sec) => (sec.style.display = "none"));

  // 🟩 Show Consent Form when PIS button clicked
  buttonPIS.addEventListener("click", () => {
    pis.style.display = "none";
    consentForm.style.display = "block";
    window.scrollTo(0, 0);
  });

  // 🟩 Continue only if all consent checkboxes are checked
  buttonConsent.addEventListener("click", () => {
    const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
    if (allChecked) {
      consentForm.style.display = "none";
      demographicInfo.style.display = "block";
      window.scrollTo(0, 0);
    } else {
      alert(
        'Continuing with this experiment requires all boxes to be checked. If you do not consent to any of the below items, please click the "Quit" button.'
      );
    }
  });

  // 🟩 Show or hide medication text box dynamically
  medicationRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      medicationsBox.style.display = this.value === "1" ? "block" : "none";
    });
  });

  // 🟩 Validate demographics before continuing
  document
    .getElementById("button-demographics")
    .addEventListener("click", () => {
      const age = document.getElementById("age").value;
      const sex =
        document.querySelector('input[name="sex"]:checked')?.value || null;
      const education =
        document.querySelector('input[name="education"]:checked')?.value ||
        null;
      const medication =
        document.querySelector('input[name="medication-status"]:checked')
          ?.value || null;

      const mh1 =
        document.querySelector('input[name="Mental-Health-1"]:checked')
          ?.value || null;

      const mh2 =
        document.querySelector('input[name="Mental-Health-2"]:checked')
          ?.value || null;

      const mh3 =
        document.querySelector('input[name="Mental-Health-3"]:checked')
          ?.value || null;

      const mh4 =
        document.querySelector('input[name="Mental-Health-4"]:checked')
          ?.value || null;

      const videoGames =
        document.querySelector('input[name="video-games"]:checked')?.value ||
        null;

      const medicationsText = document
        .getElementById("medications")
        .value.trim();

      // Validation
      if (!age || !sex || !education || !medication) {
        alert("Please fill in all available fields before continuing.");
        return;
      }

      if (medication === "1" && medicationsText === "") {
        alert("Please list your medications before continuing.");
        return;
      }

      // ✅ Store data
      const demographics = {
        participantID: prolificID,
        age: age,
        sex: sex,
        education: education,
        medicationStatus: medication,
        medicationsList: medicationsText,
        videoGames: videoGames,
        MH1: mh1,
        MH2: mh2,
        MH3: mh3,
        MH4: mh4,
        timestamp: new Date().toISOString(),
      };

      console.log("Collected demographics:", demographics);

      // Check the instruction quiz

      document
        .getElementById("button-instructions-quiz")
        .addEventListener("click", () => {
          const instruction1 = Number(
            document.querySelector('input[name="Instruction-quiz-1"]:checked')
              ?.value
          );

          const instruction2 = Number(
            document.querySelector('input[name="Instruction-quiz-2"]:checked')
              ?.value
          );

          console.log(instruction1 + instruction2);
          if (instruction1 + instruction2 == 2) {
            jatos.startNextComponent();
          } else {
            alert(
              "You have answered these questions wrong, please re-read the instructions page and answer them correctly to continue."
            );
            instructionsQuiz.style.display = "none";
            instructionsPage.style.display = "block";
            window.scrollTo(0, 0);
          }
        });

      // ✅ Save to JATOS before proceeding

      function convertToCSV(obj) {
        const keys = Object.keys(obj);
        const values = keys.map((key) => obj[key]); // get all values in order
        let csvRows = [];

        csvRows.push(keys.join(",")); // header
        csvRows.push(values.join(",")); // one row of data

        return csvRows.join("\n");
      }

      jatos;
      const demographicsCsvString = convertToCSV(demographics);
      const demographicsFileName = `${prolificID}_demographics_data.csv`;
      const demographicsBlob = new Blob([demographicsCsvString], {
        type: "text/csv",
      });
      jatos
        .uploadResultFile(demographicsBlob, demographicsFileName)
        .then(() => {
          console.log("Demographics saved successfully!");
          demographicInfo.style.display = "none";
          instructionsPage.style.display = "block";
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.error("Error submitting data:", err);
        });
    });

  // When participant clicks "Start Task", move to next section/component
  startButton.addEventListener("click", () => {
    instructionsPage.style.display = "none";
    instructionsQuiz.style.display = "block";
    window.scrollTo(0, 0);
  });
});
