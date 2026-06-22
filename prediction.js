// ==============================
// Disease Prediction Script
// ==============================

// Predict Button
document.getElementById("predictBtn").addEventListener("click", predictDisease);

// Clear Button
document.getElementById("clearBtn").addEventListener("click", clearSelection);

// Search Symptoms
document.getElementById("searchInput").addEventListener("keyup", searchSymptoms);


// ==============================
// Predict Disease
// ==============================

function predictDisease() {

    let selectedSymptoms = [];

    document.querySelectorAll(".symptom-grid input:checked").forEach((item) => {
        selectedSymptoms.push(item.value);
    });

    if (selectedSymptoms.length === 0) {

        alert("Please select at least one symptom.");

        return;
    }

    let bestDisease = null;

    let highestScore = -1;

    diseaseDatabase.forEach((disease) => {

        let score = 0;

        disease.symptoms.forEach(symptom => {

            if (selectedSymptoms.includes(symptom)) {

                score++;

            }

        });

        if (score > highestScore) {

            highestScore = score;

            bestDisease = disease;

        }

    });

    showResult(bestDisease, highestScore);

}


// ==============================
// Show Result
// ==============================

function showResult(disease, score) {

    let confidence = Math.round(
        (score / disease.symptoms.length) * 100
    );

    if (confidence > 100)
        confidence = 100;

    document.getElementById("result").innerHTML =

        "<h2>" + disease.name + "</h2>" +

        "<p>" + disease.description + "</p>";



    document.getElementById("diseaseName").innerHTML = disease.name;

    document.getElementById("causes").innerHTML = disease.causes;

    document.getElementById("treatment").innerHTML = disease.treatment;

    document.getElementById("prevention").innerHTML = disease.prevention;

    document.getElementById("diet").innerHTML = disease.diet;



    document.getElementById("confidenceText").innerHTML =

        confidence + "% Match";



    document.getElementById("progressBar").style.width =

        confidence + "%";

}



// ==============================
// Clear
// ==============================

function clearSelection() {

    document.querySelectorAll(".symptom-grid input").forEach((box) => {

        box.checked = false;

    });

    document.getElementById("searchInput").value = "";

    document.getElementById("result").innerHTML =

        "<h3>No prediction yet.</h3><p>Select symptoms and click Predict Disease.</p>";

    document.getElementById("diseaseName").innerHTML = "-";

    document.getElementById("causes").innerHTML = "-";

    document.getElementById("treatment").innerHTML = "-";

    document.getElementById("prevention").innerHTML = "-";

    document.getElementById("diet").innerHTML = "-";

    document.getElementById("confidenceText").innerHTML = "0%";

    document.getElementById("progressBar").style.width = "0%";

}



// ==============================
// Search Symptoms
// ==============================

function searchSymptoms() {

    let value = document.getElementById("searchInput").value.toLowerCase();

    let labels = document.querySelectorAll(".symptom-grid label");

    labels.forEach((label) => {

        if (label.innerText.toLowerCase().includes(value)) {

            label.style.display = "block";

        }

        else {

            label.style.display = "none";

        }

    });

}
