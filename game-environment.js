if (!window.gameInitialized) {
  window.gameInitialized = true;

  jatos.onLoad(() => {
    // Jatos initialisation
    jatos.addAbortButton();

    // Variables

    const prolificID = jatos.workerId || "unknown";

    console.log(prolificID);

    const conditionOrders = {
      // Set Condition Orders
      1: [
        { season: "summer", reward: "high", rule: "tree" },
        { season: "winter", reward: "low", rule: "tree" },
        { season: "winter", reward: "low", rule: "water" },
        { season: "summer", reward: "high", rule: "water" },
        { season: "summer", reward: "high", rule: "elevation" },
        { season: "winter", reward: "low", rule: "elevation" },
      ],
      2: [
        { season: "summer", reward: "high", rule: "elevation" },
        { season: "winter", reward: "low", rule: "elevation" },
        { season: "winter", reward: "low", rule: "tree" },
        { season: "summer", reward: "high", rule: "tree" },
        { season: "summer", reward: "high", rule: "water" },
        { season: "winter", reward: "low", rule: "water" },
      ],
      3: [
        { season: "summer", reward: "high", rule: "water" },
        { season: "winter", reward: "low", rule: "water" },
        { season: "winter", reward: "low", rule: "elevation" },
        { season: "summer", reward: "high", rule: "elevation" },
        { season: "summer", reward: "high", rule: "tree" },
        { season: "winter", reward: "low", rule: "tree" },
      ],
      4: [
        { season: "summer", reward: "low", rule: "tree" },
        { season: "winter", reward: "high", rule: "tree" },
        { season: "winter", reward: "high", rule: "water" },
        { season: "summer", reward: "low", rule: "water" },
        { season: "summer", reward: "low", rule: "elevation" },
        { season: "winter", reward: "high", rule: "elevation" },
      ],
      5: [
        { season: "summer", reward: "low", rule: "elevation" },
        { season: "winter", reward: "high", rule: "elevation" },
        { season: "winter", reward: "high", rule: "tree" },
        { season: "summer", reward: "low", rule: "tree" },
        { season: "summer", reward: "low", rule: "water" },
        { season: "winter", reward: "low", rule: "water" },
      ],
      6: [
        { season: "summer", reward: "low", rule: "water" },
        { season: "winter", reward: "high", rule: "water" },
        { season: "winter", reward: "high", rule: "elevation" },
        { season: "summer", reward: "low", rule: "elevation" },
        { season: "summer", reward: "low", rule: "tree" },
        { season: "winter", reward: "high", rule: "tree" },
      ],
      7: [
        { season: "winter", reward: "high", rule: "tree" },
        { season: "summer", reward: "low", rule: "tree" },
        { season: "summer", reward: "low", rule: "water" },
        { season: "winter", reward: "high", rule: "water" },
        { season: "winter", reward: "high", rule: "elevation" },
        { season: "summer", reward: "low", rule: "elevation" },
      ],
      8: [
        { season: "winter", reward: "high", rule: "elevation" },
        { season: "summer", reward: "low", rule: "elevation" },
        { season: "summer", reward: "low", rule: "tree" },
        { season: "winter", reward: "high", rule: "tree" },
        { season: "winter", reward: "high", rule: "water" },
        { season: "summer", reward: "low", rule: "water" },
      ],

      9: [
        { season: "winter", reward: "high", rule: "water" },
        { season: "summer", reward: "low", rule: "water" },
        { season: "summer", reward: "low", rule: "elevation" },
        { season: "winter", reward: "high", rule: "elevation" },
        { season: "winter", reward: "high", rule: "tree" },
        { season: "summer", reward: "low", rule: "tree" },
      ],
      10: [
        { season: "winter", reward: "low", rule: "tree" },
        { season: "summer", reward: "high", rule: "tree" },
        { season: "summer", reward: "high", rule: "water" },
        { season: "winter", reward: "low", rule: "water" },
        { season: "winter", reward: "low", rule: "elevation" },
        { season: "summer", reward: "low", rule: "elevation" },
      ],
      11: [
        { season: "winter", reward: "low", rule: "elevation" },
        { season: "summer", reward: "high", rule: "elevation" },
        { season: "summer", reward: "high", rule: "tree" },
        { season: "winter", reward: "low", rule: "tree" },
        { season: "winter", reward: "low", rule: "water" },
        { season: "summer", reward: "high", rule: "water" },
      ],

      12: [
        { season: "winter", reward: "low", rule: "water" },
        { season: "summer", reward: "high", rule: "water" },
        { season: "summer", reward: "high", rule: "elevation" },
        { season: "winter", reward: "low", rule: "elevation" },
        { season: "winter", reward: "low", rule: "tree" },
        { season: "summer", reward: "high", rule: "tree" },
      ],
    };

    const grid = document.querySelector(".grid");

    const gridWidth = 60;
    const gridHeight = 40;

    grid.style.width = "610px";
    grid.style.height = "403px";

    // Convert the string values like "1205px" to numbers
    const gridPixelWidth = parseInt(grid.style.width); // 1205
    const gridPixelHeight = parseInt(grid.style.height); // 805

    grid.style.gridTemplateColumns = `repeat(${gridWidth}, ${
      gridPixelWidth / gridWidth
    }px)`;
    grid.style.gridTemplateRows = `repeat(${gridHeight}, ${
      gridPixelHeight / gridHeight
    }px)`;

    let foragerIndex = gridWidth * gridHeight - Math.floor(gridWidth / 2);

    let energyIndex;

    let rewardIndex;

    let cells;

    document.getElementById("mood-slider").value = 0;
    document.getElementById("energy-slider").value = 0;

    let previousPositions = []; // Array of previous positions

    const restReward = 100;

    const restTime = 50;

    const rewardPerSecond = restReward / restTime;

    let energy = 200;

    const energyBar = document.querySelector(".energy-bar");

    const minHue = 0;

    const maxHue = 130;

    let currentTrial = 1;

    let backgroundDatabase = [
      // "0",
      "1",
      "2",
      "3",
      "4",
      // "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      // "12",
      // "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "21",
      "23",
    ]; // All available backgrounds

    const backgroundOrder = shuffleArray(backgroundDatabase); // Order of backgrounds

    let currentBackground = backgroundOrder[currentTrial - 1]; // The current background we are on

    let randomisedOrderNumber = randomNumber(1, 13); // The order which the experiment is taking

    let randomisedOrder = conditionOrders[randomisedOrderNumber]; // The variables in the order which the experiment is taking

    let conditionIndex = 0; // Current condition

    let repetitionCount = 1; // Repetition count within condition

    const repetitionsPerCondition = 3; // Run each condition 3 times

    let environmentSetup;

    const rewardCodes = {
      1: "Tree",
      2: "Water",
      3: "Crag",
    };

    let randomisationValues = {
      randomisedOrder: [],
      block: [],
      trial: [],
      environment: [],
      season: [],
      reward: [],
      rule: [],
    };

    for (let block = 0; block < 6; block++) {
      for (let i = 0; i < 3; i++) {
        randomisationValues.randomisedOrder.push(randomisedOrderNumber);
        randomisationValues.trial.push(block * 3 + i + 1);
        randomisationValues.block.push(block + 1);
        randomisationValues.environment.push(backgroundOrder[block * 3 + i]);
        randomisationValues.season.push(randomisedOrder[block].season);
        randomisationValues.reward.push(randomisedOrder[block].reward);
        randomisationValues.rule.push(randomisedOrder[block].rule);
      }
    }

    let csv = {
      position: [],
      movement: [],
      presentEnergy: [],
      changeEnergy: [],
      timeTaken: [],
      currentCell: [],
      alphaTrees: [],
      betaTrees: [],
      alphaCrag: [],
      betaCrag: [],
      alphaWater: [],
      betaWater: [],
      treesVisited: [],
      cragVisited: [],
      waterVisited: [],
      totalAlpha: [],
      totalBeta: [],
    };

    let environmentCsv = {
      position: [],
      y: [],
      landmark: [],
      distanceFromStart: [],
      meanObjectDispersion: [],
    };

    let summaryCsv = {
      participantId: [],
      randomisedOrder: [],
      currentBlock: [],
      presentTrial: [],
      environment: [],
      season: [],
      reward: [],
      rule: [],
      prediction: [],
      certainty: [],
      decision: [],
      startingEnergy: [],
      endEnergy: [],
      energyChange: [],
      totalMoves: [],
      moodLikert: [],
      energyLikert: [],
      totalTime: [],
      alphaTrees: [],
      alphaCrag: [],
      alphaWater: [],
      betaTrees: [],
      betaCrag: [],
      betaWater: [],
      treesVisited: [],
      cragVisited: [],
      waterVisited: [],
      totalAlpha: [],
      totalBeta: [],
    };

    let decision = [];

    let lastMoveTime;

    let trialCondition; // declare globally at the top of your script

    let betaData;

    let currentCondition;

    let objectIndex = [];

    let alphaTrees = 0;

    let alphaCrag = 0;

    let alphaWater = 0;

    let betaTrees = 0;

    let betaCrag = 0;

    let betaWater = 0;

    let movesAtTrialStart = 0;

    let timeThisTrial = 0.0;

    // Capture trial starting energy at the beginning of trial
    let trialStartingEnergy;

    let objectDistances;

    let objectProximities;

    let objectPositions;

    let objectLandmark;

    // Environmental Features for each environment

    const backgroundDistanceMap = {
      1: 29.11764706,
      2: 33.36363636,
      3: 40.72727273,
      4: 31.42857143,
      6: 40.76,
      7: 29.52941176,
      8: 31.41666667,
      9: 30.2,
      10: 38.92,
      11: 44.09090909,
      14: 36.72727273,
      15: 32.36363636,
      16: 27.18181818,
      17: 26.375,
      18: 31,
      19: 29.1875,
      21: 24.18181818,
      23: 47,
    };

    const backgroundXDevMap = {
      1: -0.058823529,
      2: 1.909090909,
      3: 20.63636364,
      4: 7,
      6: -20.52,
      7: 4.176470588,
      8: -4.833333333,
      9: 3.3,
      10: -18.2,
      11: -16.45454545,
      14: 0.545454545,
      15: 15.18181818,
      16: -11.09090909,
      17: 4.125,
      18: -4.476190476,
      19: 4.9375,
      21: 0.454545455,
      23: 4.5,
    };

    const backgroundDispMap = {
      1: 26.96193772,
      2: 27.30578512,
      3: 21.12396694,
      4: 24.81632653,
      6: 17.4848,
      7: 29.74394464,
      8: 24.90277778,
      9: 27.76,
      10: 18.88,
      11: 24,
      14: 31.47107438,
      15: 21.12396694,
      16: 12.76033058,
      17: 26.8125,
      18: 29.2154195,
      19: 29.6328125,
      21: 20.89256198,
      23: 27.4,
    };

    //
    //
    //
    //
    //
    //
    //
    //
    // Functions
    async function loadCSV(url) {
      try {
        const response = await fetch(url);
        const csvText = await response.text();

        // Split into rows
        const rows = csvText.trim().split("\n");

        // Split each row into columns (strings)
        const array2D = rows.map((row) => row.split(","));
        return array2D; // 2D array of strings
      } catch (err) {
        return null;
      }
    }

    function convertToCSV(obj) {
      const keys = Object.keys(obj);
      const length = obj[keys[0]].length;
      let csvRows = [];

      // Add headers
      csvRows.push(keys.join(","));

      // Add rows
      for (let i = 0; i < length; i++) {
        const row = keys.map((key) => obj[key][i]);
        csvRows.push(row.join(","));
      }

      return csvRows.join("\n");
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // random index 0–i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
      }
      return array;
    }

    function randomNumber(min, max) {
      const array = new Uint32Array(1);
      self.crypto.getRandomValues(array);

      // Same range logic as your original function: [min, max)
      return min + (array[0] % (max - min));
    }

    // Create environment
    async function createEnvironment(trialNumber, season, reward, rule) {
      // Load CSV and compute energy/reward indices
      const data = await loadCSV(
        `img/Environments/${currentBackground}/${rule}.csv`
      );
      energyIndex = data.flat().map(Number);

      const totalEnergy = reward === "high" ? 500 : 150;

      rewardIndex = energyIndex
        .map((v, i) => (v > 0 ? i : 0))
        .filter((i) => i !== 0);

      energyIndex = energyIndex.map((value) => Math.round(totalEnergy * value));

      // Clear grid and create cells
      grid.innerHTML = "";

      // Load background image dynamically
      const img = new Image();
      img.src = `img/Environments/${currentBackground}/${season}.png`;

      img.onload = () => {
        const imgWidth = img.width / 4.5; // Change this in order to alter the size of the grid
        const imgHeight = img.height / 4.5; // Change this in order to alter the size of the grid

        // Set grid size to match image
        grid.style.width = `${imgWidth}px`;
        grid.style.height = `${imgHeight}px`;

        // Compute cell size
        const cellWidth = imgWidth / gridWidth;
        const cellHeight = imgHeight / gridHeight;

        // Set grid-template dynamically
        grid.style.gridTemplateColumns = `repeat(${gridWidth}, ${cellWidth}px)`;
        grid.style.gridTemplateRows = `repeat(${gridHeight}, ${cellHeight}px)`;

        for (let i = 0; i < gridWidth * gridHeight; i++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.style.width = `${cellWidth}px`;
          cell.style.height = `${cellHeight}px`;
          grid.appendChild(cell);
        }

        cells = Array.from(document.querySelectorAll(".cell"));

        // Set background
        grid.style.backgroundImage = `url("img/Environments/${currentBackground}/${season}.png")`;
        grid.style.backgroundSize = "cover";
        grid.style.backgroundPosition = "center";
        grid.style.backgroundRepeat = "no-repeat";

        // Add itemMapping
        loadCSV(
          `img/Environments/${currentBackground}/environment_data.csv`
        ).then((data) => {
          betaData = data.flat().map(Number);

          // Transpose betaData from 40x60 (cols x rows) to 60x40 (rows x cols)
          const rows = gridHeight; // 60
          const cols = gridWidth; // 40

          objectIndex = new Array(betaData.length);

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const originalIndex = c * rows + r; // index in original 40x60
              const transposedIndex = r * cols + c; // index in new 60x40
              objectIndex[transposedIndex] = betaData[originalIndex];
            }
          }

          objectPositions = objectIndex
            .map((v, i) => (v > 0 ? i : 0))
            .filter((i) => i !== 0);

          objectLandmark = objectIndex.filter((i) => i !== 0);

          let distanceToForager = function (i) {
            let x = i % gridWidth;
            let y = Math.floor(i / gridWidth);
            return Math.abs(gridWidth / 2 - x) + Math.abs(gridHeight - 1 - y);
          };

          let coordinates = function (i) {
            let x = i % gridWidth;
            let y = Math.floor(i / gridWidth);
            return [x, y];
          };

          let objectCoordinates = objectPositions.map(coordinates);

          let distanceToOthers = function (index) {
            const [myX, myY] = objectCoordinates[index];

            let sum = 0;
            for (let t = 0; t < objectCoordinates.length; t++) {
              const [x, y] = objectCoordinates[t];
              sum += Math.abs(myX - x) + Math.abs(myY - y);
            }

            return sum / objectCoordinates.length;
          };

          objectDistances = objectPositions.map(distanceToForager);

          objectProximities = objectCoordinates.map((_, idx) =>
            distanceToOthers(idx, objectCoordinates)
          );

          //   // Highlight cells based on transposed objectIndex
          //     objectIndex.forEach((val, idx) => {
          //       if (val !== 0) {
          //         cells[idx].classList.add("reward");
          //         cells[idx].style.backgroundColor = "rgba(255, 0, 0, 0.5)";
          //       }
          //     });

          //   //   objectIndex.forEach((val, idx) => {
          //       if (val !== 0) {
          //         cells[idx].classList.add("reward");
          //         cells[idx].style.backgroundColor = "rgba(11, 79, 98, 0.5)";
          //       }

          //   // Add rewardMapping
          //     for (let i = 0; i < rewardIndex.length; i++) {
          //       cells[rewardIndex[i]].textContent = "⏺";
          //     }
          // });

          // Place forager
          cells[foragerIndex].classList.add("forager");
          cells[foragerIndex].textContent = "↑";

          // Show grid
          grid.classList.remove("hidden");

          // Set and log environment setup
          environmentSetup = `Randomised Order: ${randomisedOrderNumber} | Trial: ${trialNumber} | Environment: "${currentBackground}" | Season: ${season} | Reward: ${reward} | Rule: ${rule}`;
        });
      };
    }

    // Play The Step Sound

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playStepSound() {
      if (audioCtx.state === "suspended") audioCtx.resume();

      const cf = 220;
      const sf = 400;
      const d = 0.1;
      const n = sf * d;

      const s = Array.from({ length: n }, (_, i) => i / 400);
      const step_sound = s.map((t) => Math.sin(2 * Math.PI * cf * t));
      const maxVal = Math.max(...step_sound.map(Math.abs));
      const normalized = step_sound.map((x) => x / maxVal);

      const buffer = audioCtx.createBuffer(1, normalized.length, 96000);
      buffer.copyToChannel(Float32Array.from(normalized), 0);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start();
    }

    function playRewardSound() {
      const rewardSound = new Audio("sounds/bellring.wav");
      rewardSound.play();
    }

    energyBar.style.backgroundColor = `hsla(130, 90%, 45%, 1.00)`;

    function updateEnergyBar() {
      document.querySelector(".energy-label").textContent =
        "Energy Points:" + energy;

      energyBar.style.width = energy * 2.5 + "px"; // Set width as percentage

      let hue = minHue + (energy / 200) * (maxHue - minHue);

      hue = Math.min(Math.max(hue, minHue), maxHue);

      energyBar.style.backgroundColor = `hsl(${hue}, 90%, 45%)`;

      if (energy > 500) {
        // Limit bar size to 100
        energyBar.style.width = "1250px";
      }
    }

    const moveDynamics = function (unit) {
      // Change the appearance of square
      cells[foragerIndex].classList.remove("forager");
      cells[foragerIndex].classList.add("past-forager");

      // Check If current index should receive a reward
      let futureIndex = foragerIndex + unit;

      checkAlpha(futureIndex);

      // Attribute Rewards
      if (
        !previousPositions.includes(futureIndex) // If the current square has not been visited before
      ) {
        energy += energyIndex[futureIndex]; // Add the energy matching the square

        if (energyIndex[futureIndex] === 0) {
          // If the square is not a reward
          playStepSound(440, 0.1);
          energy--;
        } else {
          playRewardSound();
        }
      } else {
        playStepSound(440, 0.1);
        energy--;
      }

      // Update position
      foragerIndex = futureIndex;

      cells[foragerIndex].classList.remove("past-forager");
      cells[foragerIndex].classList.add("forager");

      previousPositions.push(foragerIndex);
      updateEnergyBar();
    };

    const restForager = function (secondsLeft = restTime, callback) {
      if (secondsLeft <= 0) {
        if (callback) callback();
        return;
      }
      energy += rewardPerSecond;
      updateEnergyBar();
      setTimeout(() => restForager(secondsLeft - 1, callback), 1000);
      updateCsv("Rest", foragerIndex);
    };

    const moveForager = function (e) {
      if (!grid.classList.contains("hidden")) {
        switch (e.key) {
          case "ArrowLeft":
            if (foragerIndex % gridWidth !== 0 && energy > 0) {
              moveDynamics(-1);
              document.querySelector(".forager").textContent = "←";
              updateCsv("Left", foragerIndex);
            }
            break;
          case "ArrowRight":
            if (foragerIndex % gridWidth !== gridWidth - 1 && energy > 0) {
              moveDynamics(1);
              document.querySelector(".forager").textContent = "→";
              updateCsv("Right", foragerIndex);
            }

            break;
          case "ArrowUp":
            if (foragerIndex - gridWidth >= 0 && energy > 0) {
              moveDynamics(-gridWidth);
              document.querySelector(".forager").textContent = "↑";
              updateCsv("Up", foragerIndex);
            }
            break;
          case "ArrowDown":
            if (
              foragerIndex + gridWidth < gridWidth * gridHeight &&
              energy > 0
            ) {
              moveDynamics(gridWidth);
              document.querySelector(".forager").textContent = "↓";
              updateCsv("Down", foragerIndex);
            }
            break;
        }
      }
    };

    // Check which object to increase
    let checkAlpha = function (square) {
      switch (
        rewardCodes[objectIndex[square]] // Latest Object
      ) {
        case "Tree":
          if (
            energyIndex[square] === 0 &&
            !previousPositions.includes(square)
          ) {
            betaTrees++;
          } else if (!previousPositions.includes(square)) {
            alphaTrees++;
          }
          break;
        case "Water":
          if (
            energyIndex[square] === 0 &&
            !previousPositions.includes(square)
          ) {
            betaWater++;
          } else if (!previousPositions.includes(square)) {
            alphaWater++;
          }
          break;
        case "Crag":
          if (
            energyIndex[square] === 0 &&
            !previousPositions.includes(square)
          ) {
            betaCrag++;
          } else if (!previousPositions.includes(square)) {
            alphaCrag++;
          }
          break;
      }
    };

    const updateCsv = function (move, square, endOfTrial = false) {
      csv.position.push(foragerIndex);
      csv.movement.push(move);
      csv.presentEnergy.push(Number(energy));
      if (csv.presentEnergy.length > 1) {
        csv.changeEnergy.push(
          Math.round(
            Number(csv.presentEnergy.at(-1)) - Number(csv.presentEnergy.at(-2))
          )
        );
      } else {
        csv.changeEnergy.push(0);
      }

      // Calculate time between each move
      let currentTime = performance.now();

      csv.timeTaken.push(((currentTime - lastMoveTime) / 1000).toFixed(5));
      lastMoveTime = currentTime;

      csv.currentCell.push(
        objectIndex && rewardCodes[objectIndex[square]]
          ? rewardCodes[objectIndex[square]]
          : "0"
      );

      csv.alphaTrees.push(alphaTrees);
      csv.betaTrees.push(betaTrees);

      csv.alphaCrag.push(alphaCrag);
      csv.betaCrag.push(betaCrag);

      csv.alphaWater.push(alphaWater);
      csv.betaWater.push(betaWater);

      csv.treesVisited.push(alphaTrees + betaTrees);
      csv.cragVisited.push(alphaCrag + betaCrag);
      csv.waterVisited.push(alphaWater + betaWater);

      csv.totalAlpha.push(alphaTrees + alphaCrag + alphaWater);

      csv.totalBeta.push(betaTrees + betaCrag + betaWater);

      // Add a separator after the trial ends
      if (endOfTrial) {
        // Update Environment CSV

        let objectsVisited = objectPositions.map((square) =>
          previousPositions.includes(square) ? 1 : 0
        );

        environmentCsv.position.push(
          `Trial ${currentTrial}; Environment ${currentBackground}`,
          ...objectPositions
        ),
          environmentCsv.y.push(null, ...objectsVisited),
          environmentCsv.landmark.push(null, ...objectLandmark),
          environmentCsv.distanceFromStart.push(null, ...objectDistances),
          environmentCsv.meanObjectDispersion.push(null, ...objectProximities);
      }
    };

    const updateSummary = function () {
      summaryCsv.participantId.push(prolificID);
      summaryCsv.prediction.push(
        document.getElementById("energy-guess")?.value
      );
      summaryCsv.certainty.push(
        document.getElementById("confidence-slider")?.value
      );
      summaryCsv.decision.push(decision);
      summaryCsv.startingEnergy.push(trialStartingEnergy);
      summaryCsv.endEnergy.push(energy);
      summaryCsv.energyChange.push(energy - trialStartingEnergy);
      const totalMovesThisBlock =
        csv.movement.filter(
          (m) =>
            m && // not null or undefined
            m.trim() !== "" && // not empty string
            m !== "EndTrial" && // exclude EndTrial marker
            m !== "Start" && // exclude Start marker
            m != "Rest"
        ).length - movesAtTrialStart;

      summaryCsv.totalMoves.push(totalMovesThisBlock);

      // Update for next block
      movesAtTrialStart = csv.movement.filter(
        (m) =>
          m && // not null or undefined
          m.trim() !== "" && // not empty string
          m !== "EndTrial" && // exclude EndTrial marker
          m !== "Start" && // exclude Start marker
          m != "Rest"
      ).length;

      summaryCsv.moodLikert.push(
        Number(document.getElementById("mood-slider").value)
      );
      summaryCsv.energyLikert.push(
        Number(document.getElementById("energy-slider").value)
      );
      summaryCsv.randomisedOrder.push(randomisedOrderNumber);
      summaryCsv.presentTrial.push(currentTrial);
      summaryCsv.environment.push(currentBackground);
      summaryCsv.season.push(trialCondition.season);
      summaryCsv.reward.push(trialCondition.reward);
      summaryCsv.rule.push(trialCondition.rule);

      // Calculate total time safely
      let totalTime = csv.timeTaken.reduce(
        (sum, t) => sum + (isNaN(parseFloat(t)) ? 0 : parseFloat(t)),
        0
      );

      // Time spent in this trial/block
      const totalTimeThisTrial = totalTime - (timeThisTrial || 0);

      // Store in summary CSV
      summaryCsv.totalTime.push(totalTimeThisTrial);

      // Update for next trial/block
      timeThisTrial = totalTime;

      // Alpha/Beta updates
      summaryCsv.alphaTrees.push(alphaTrees);
      summaryCsv.betaTrees.push(betaTrees);
      summaryCsv.alphaCrag.push(alphaCrag);
      summaryCsv.betaCrag.push(betaCrag);
      summaryCsv.alphaWater.push(alphaWater);
      summaryCsv.betaWater.push(betaWater);
      summaryCsv.treesVisited.push(alphaTrees + betaTrees);
      summaryCsv.cragVisited.push(alphaCrag + betaCrag);
      summaryCsv.waterVisited.push(alphaWater + betaWater);
      summaryCsv.totalAlpha.push(alphaTrees + alphaCrag + alphaWater);
      summaryCsv.totalBeta.push(betaTrees + betaCrag + betaWater);
      summaryCsv.currentBlock.push(conditionIndex + 1);
    };

    // Start Foraging
    let startForaging = function () {
      let energyGuess = document.getElementById("energy-guess")?.value;

      if (energyGuess) {
        currentCondition = "Foraging";
        document.querySelector("#modal2").classList.add("hidden"); // Hide Modal
        document.querySelector(".overlay").classList.add("hidden"); // Hide Overlay

        decision = "Forage";

        document.addEventListener("keydown", moveForager); // Actually move the forager
      } else {
        alert(
          "Please Indicate how many points you think are available in this environment."
        );
      }
    };

    document.addEventListener("keydown", function (event) {
      // End Trial
      if (event.key.toLowerCase() === "f" && currentCondition === "Foraging") {
        endTrial();
        currentCondition = "Not Foraging";
      }
    });

    // Start Rest

    let startResting = function () {
      let energyGuess = document.getElementById("energy-guess")?.value;

      if (energyGuess) {
        document.querySelector("#modal2").classList.add("hidden"); // Hide Modal
        document.querySelector(".overlay").classList.add("hidden"); // Hide Overlay
        document.querySelector("#resting-modal").classList.remove("hidden");

        decision = "Rest";

        restForager(restTime, () => {
          document.querySelector("#resting-modal").classList.add("hidden");
          endTrial();
        });

        document.addEventListener("keydown", moveForager); // Actually move the forager
      } else {
        alert(
          "Please Indicate how many points you think are available in this environment."
        );
      }
    };

    let endTrial = function () {
      // Append results to Summary Csv
      updateSummary();

      // Reset Active CSV
      updateCsv("EndTrial", foragerIndex, true);

      // Hide grid and turn off commands
      foragerIndex = gridWidth * gridHeight - Math.floor(gridWidth / 2); // Reset forager Index

      energyBar.classList.add("hidden"); // Hide Energy Bar
      document.querySelector(".energy-label").classList.add("hidden"); // Hide Energy label

      grid.classList.add("hidden"); // Hide Grid

      previousPositions = []; // Reset previous positions

      // Remove keydown listener to stop movement
      document.removeEventListener("keydown", moveForager);

      decision = null; // Reset Decision + Prediction + Certainty
      document.getElementById("mood-slider").value = 0;
      document.getElementById("energy-slider").value = 0;
      document.getElementById("mood-value").textContent = 0;
      document.getElementById("energy-value").textContent = 0;
      document.getElementById("energy-guess").value = null;
      document.getElementById("confidence-slider").value = 50;

      if (repetitionCount === repetitionsPerCondition) {
        // Checks if block is finished
        // Show the Break screen
        repetitionCount = 0; // Reset Repetition Count
        showBreakScreen();
        movesAtTrialStart = 0;
        timeThisTrial = 0;

        // If finished all repetitions for the current condition

        // Save CSV for this condition
        const conditionNumber = conditionIndex + 1; // index → human-readable
        const csvString = convertToCSV(csv);
        const fileName = `${prolificID}_block_${conditionNumber}.csv`;

        const blob = new Blob([csvString], { type: "text/csv" });
        jatos.uploadResultFile(blob, fileName);

        const environmentCsvString = convertToCSV(environmentCsv);
        const environmentFileName = `${prolificID}_env_block${conditionNumber}.csv`;
        const environmentBlob = new Blob([environmentCsvString], {
          type: "text/csv",
        });
        jatos.uploadResultFile(environmentBlob, environmentFileName);

        const summaryCsvString = convertToCSV(summaryCsv);
        const summaryFileName = `${prolificID}_summary_data.csv`;
        const summaryBlob = new Blob([summaryCsvString], { type: "text/csv" });
        jatos.uploadResultFile(summaryBlob, summaryFileName);

        // Reset CSV for next condition
        for (let key in csv) {
          csv[key] = [];
        }

        for (let key in environmentCsv) {
          environmentCsv[key] = [];
        }
      } else {
        nextTrial();
      }
    };

    const nextTrial = function () {
      repetitionCount++;

      if (currentTrial >= 18) {
        // Completed Trial: Fill with JATOS Commands
        // Convert to Csv And Export
        const summaryCsvString = convertToCSV(summaryCsv);
        const summaryFileName = `${prolificID}_summary_data.csv`;
        const summaryBlob = new Blob([summaryCsvString], { type: "text/csv" });
        jatos.uploadResultFile(summaryBlob, summaryFileName);

        jatos.startNextComponent();
      } else {
        // Repeat the same condition again
        currentTrial++;
        startTrial(currentTrial);
      }
    };

    function showBreakScreen() {
      document.getElementById("rating-screen").classList.remove("hidden");
    }

    // Starts Trial depending on the trial Number

    const startTrial = function (trialNumber) {
      currentBackground = backgroundOrder[trialNumber - 1];

      lastMoveTime = performance.now(); // Define Starting Time

      csv.position.push(
        `Trial ${currentTrial} | Environment ${currentBackground}`
      );
      csv.movement.push(null);
      csv.presentEnergy.push(null);
      csv.changeEnergy.push(null);
      csv.timeTaken.push(null);
      csv.currentCell.push(null);
      csv.alphaTrees.push(null);
      csv.betaTrees.push(null);
      csv.alphaCrag.push(null);
      csv.betaCrag.push(null);
      csv.alphaWater.push(null);
      csv.betaWater.push(null);
      csv.treesVisited.push(null);
      csv.cragVisited.push(null);
      csv.waterVisited.push(null);
      csv.totalAlpha.push(null);
      csv.totalBeta.push(null);

      updateCsv("Start", foragerIndex); // Define Starting move in CSV File

      trialStartingEnergy = energy;

      updateEnergyBar();

      // Get the condition for this trial
      trialCondition = randomisedOrder[conditionIndex];

      // Create Grid

      createEnvironment(
        trialNumber,
        trialCondition.season,
        trialCondition.reward,
        trialCondition.rule
      );

      setTimeout(() => {
        // Adds delay in case the environment takes long to load
        energyBar.classList.remove("hidden");
        document.querySelector(".energy-label").classList.remove("hidden");
        document.querySelector("#modal1").classList.remove("hidden");
      }, 100);
    };

    //
    //
    //
    // Actual executions
    //
    const randomisationCsvString = convertToCSV(randomisationValues);
    const randomisationFileName = `${prolificID}_randomisation.csv`;
    const randomisationBlob = new Blob([randomisationCsvString], {
      type: "text/csv",
    });

    jatos.uploadResultFile(randomisationBlob, randomisationFileName);

    //
    //
    //
    // Reset Items
    document.getElementById("energy-guess").value = null;
    document.getElementById("confidence-slider").value = 50;

    startTrial(currentTrial);

    //
    //
    // Rest

    document
      .querySelector("#rest-button")
      .addEventListener("click", startResting);

    //
    //
    // Forage

    document
      .querySelector("#forage-button")
      .addEventListener("click", startForaging);
    //
    //
    //
    // Rating Modal Buttons

    // Make values in Rating Modal Appear Dynamically
    document.getElementById("mood-slider").addEventListener("input", (e) => {
      document.getElementById("mood-value").textContent = e.target.value;
    });
    document.getElementById("energy-slider").addEventListener("input", (e) => {
      document.getElementById("energy-value").textContent = e.target.value;
    });

    // Continue button functionality

    document.getElementById("continue-button").addEventListener("click", () => {
      document.getElementById("rating-screen").classList.add("hidden");
      // continue to next trial
      conditionIndex++;
      nextTrial();
    });

    // Submit Button Functionality
    document.getElementById("submit-button").addEventListener("click", () => {
      document.getElementById("modal1").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
      setTimeout(() => {
        document.getElementById("modal2").classList.remove("hidden");
        document.querySelector(".overlay").classList.remove("hidden");
      }, 5000); // Show Overlay
    });
  });
}
