let currentImageIndex = 1; // Kintamasis, kuris laikys dabartinio paveiksliuko indeksą
let startTime; // Kintamasis, kuriame bus saugomas laikas, kai buvo pradėtas rodyti paveiksliukas
let results = []; // Masyvas, kuriame bus saugomi testo rezultatai
let answersRecord = [];
let i = 1;
let currentTest = 1;
let isWindowActive = "instruction"; // Galimos reikšmės: '', 'test', 'instruction'

const imagesSET1 = [
  // A- jei rodomas juodaodis; L- jei rodomas baltaodis
  { url: "images/BV2.jpg", value: false, title: "B1K1" },
  { url: "images/BV1.jpg", value: false, title: "B1K2" },
  { url: "images/JV2.jpg", value: true, title: "B1K3" },
  { url: "images/BM3.jpg", value: false, title: "B1K4" },
  { url: "images/JM2.jpg", value: true, title: "B1K5" },
  { url: "images/JM1.jpg", value: true, title: "B1K6" },
  { url: "images/JV3.jpg", value: true, title: "B1K7" },
  { url: "images/BM1.jpg", value: false, title: "B1K8" },
  { url: "images/BM2.jpg", value: false, title: "B1K9" },
  { url: "images/JM3.jpg", value: true, title: "B1K10" },
  { url: "images/BV3.jpg", value: false, title: "B1K11" },
  { url: "images/JV1.jpg", value: true, title: "B1K12" },
];

const imagesSET2 = [
  // A- jei rodomas malonus žodis; L- jei rodomas nemalonus žodis
  { url: "images/MZ6.jpg", value: true, title: "B2K1" },
  { url: "images/NZ6.jpg", value: false, title: "B2K2" },
  { url: "images/MZ1.jpg", value: true, title: "B2K3" },
  { url: "images/NZ4.jpg", value: false, title: "B2K4" },
  { url: "images/MZ4.jpg", value: true, title: "B2K5" },
  { url: "images/NZ5.jpg", value: false, title: "B2K6" },
  { url: "images/MZ2.jpg", value: true, title: "B2K7" },
  { url: "images/MZ5.jpg", value: true, title: "B2K8" },
  { url: "images/NZ2.jpg", value: false, title: "B2K9" },
  { url: "images/NZ3.jpg", value: false, title: "B2K10" },
  { url: "images/NZ1.jpg", value: false, title: "B2K11" },
  { url: "images/MZ3.jpg", value: true, title: "B2K12" },
];

const imagesSET3 = [
  // A- jei rodomas baltaodis arba nemalonus žodis; L- jei rodomas juodaodis arba malonus žodis
  { url: "images/MZ6.jpg", value: false, title: "B3K1" },
  { url: "images/BM3.jpg", value: true, title: "B3K2" },
  { url: "images/MZ4.jpg", value: false, title: "B3K3" },
  { url: "images/NZ4.jpg", value: true, title: "B3K4" },
  { url: "images/MZ2.jpg", value: false, title: "B3K5" },
  { url: "images/BM3.jpg", value: true, title: "B3K6" },
  { url: "images/MZ5.jpg", value: false, title: "B3K7" },
  { url: "images/JM1.jpg", value: false, title: "B3K8" },
  { url: "images/MZ1.jpg", value: false, title: "B3K9" },
  { url: "images/NZ1.jpg", value: true, title: "B3K10" },
  { url: "images/JV1.jpg", value: false, title: "B3K11" },
  { url: "images/NZ2.jpg", value: true, title: "B3K12" },
  { url: "images/NZ5.jpg", value: true, title: "B3K13" },
  { url: "images/MZ3.jpg", value: false, title: "B3K14" },
  { url: "images/BV2.jpg", value: true, title: "B3K15" },
  { url: "images/BM1.jpg", value: true, title: "B3K16" },
  { url: "images/JM3.jpg", value: false, title: "B3K17" },
  { url: "images/JV3.jpg", value: false, title: "B3K18" },
  { url: "images/BV3.jpg", value: true, title: "B3K19" },
  { url: "images/JM2.jpg", value: false, title: "B3K20" },
  { url: "images/JV2.jpg", value: false, title: "B3K21" },
  { url: "images/BM2.jpg", value: true, title: "B3K22" },
  { url: "images/NZ6.jpg", value: true, title: "B3K23" },
  { url: "images/NZ3.jpg", value: true, title: "B3K24" },
];

const imagesSET4 = [
  // A- jei rodomas juodaodis arba malonus žodis; L- jei rodomas baltaodis arba nemalonus žodis
  { url: "images/MZ5.jpg", value: true, title: "B4K1" },
  { url: "images/BV3.jpg", value: false, title: "B4K2" },
  { url: "images/MZ1.jpg", value: true, title: "B4K3" },
  { url: "images/BV1.jpg", value: false, title: "B4K4" },
  { url: "images/BM3.jpg", value: false, title: "B4K5" },
  { url: "images/NZ3.jpg", value: false, title: "B4K6" },
  { url: "images/JV3.jpg", value: true, title: "B4K7" },
  { url: "images/NZ6.jpg", value: false, title: "B4K8" },
  { url: "images/NZ2.jpg", value: false, title: "B4K9" },
  { url: "images/BM1.jpg", value: false, title: "B4K10" },
  { url: "images/MZ6.jpg", value: true, title: "B4K11" },
  { url: "images/JM2.jpg", value: true, title: "B4K12" },
  { url: "images/MZ4.jpg", value: true, title: "B4K13" },
  { url: "images/JM3.jpg", value: true, title: "B4K14" },
  { url: "images/BM2.jpg", value: false, title: "B4K15" },
  { url: "images/JM1.jpg", value: true, title: "B4K16" },
  { url: "images/MZ3.jpg", value: true, title: "B4K17" },
  { url: "images/NZ5.jpg", value: false, title: "B4K18" },
  { url: "images/BV2.jpg", value: false, title: "B4K19" },
  { url: "images/MZ2.jpg", value: true, title: "B4K20" },
  { url: "images/NZ1.jpg", value: false, title: "B4K21" },
  { url: "images/JV2.jpg", value: true, title: "B4K22" },
  { url: "images/NZ4.jpg", value: false, title: "B4K23" },
  { url: "images/JV1.jpg", value: true, title: "B4K24" },
];

const imagesSET5 = [
  // A- jei rodomas baltaodis; L- jei rodomas juodaodis
  { url: "images/BV3.jpg", value: true, title: "B5K1" },
  { url: "images/JM1.jpg", value: false, title: "B5K2" },
  { url: "images/JV2.jpg", value: false, title: "B5K3" },
  { url: "images/JM3.jpg", value: false, title: "B5K4" },
  { url: "images/BV1.jpg", value: true, title: "B5K5" },
  { url: "images/JV1.jpg", value: false, title: "B5K6" },
  { url: "images/JM2.jpg", value: false, title: "B5K7" },
  { url: "images/BV2.jpg", value: true, title: "B5K8" },
  { url: "images/BM3.jpg", value: true, title: "B5K9" },
  { url: "images/BM1.jpg", value: true, title: "B5K10" },
  { url: "images/JV3.jpg", value: false, title: "B5K11" },
  { url: "images/BM2.jpg", value: true, title: "B5K12" },
];

const imagesSET6 = [
  // A- jei rodomas nemalonus žodis; L- jei rodomas malonus žodis
  { url: "images/MZ6.jpg", value: false, title: "B6K1" },
  { url: "images/MZ1.jpg", value: false, title: "B6K2" },
  { url: "images/NZ1.jpg", value: true, title: "B6K3" },
  { url: "images/MZ2.jpg", value: false, title: "B6K4" },
  { url: "images/NZ6.jpg", value: true, title: "B6K5" },
  { url: "images/NZ2.jpg", value: true, title: "B6K6" },
  { url: "images/MZ4.jpg", value: false, title: "B6K7" },
  { url: "images/MZ3.jpg", value: false, title: "B6K8" },
  { url: "images/NZ3.jpg", value: true, title: "B6K9" },
  { url: "images/NZ5.jpg", value: true, title: "B6K10" },
  { url: "images/MZ5.jpg", value: false, title: "B6K11" },
  { url: "images/NZ4.jpg", value: true, title: "B6K12" },
];

const imagesSET7 = [
  // A- jei rodomas baltaodis arba malonus žodis; L- jei rodomas juodaodis arba nemalonus žodis
  { url: "images/BM3.jpg", value: true, title: "B7K1" },
  { url: "images/JM1.jpg", value: false, title: "B7K2" },
  { url: "images/MZ1.jpg", value: true, title: "B7K3" },
  { url: "images/NZ3.jpg", value: false, title: "B7K4" },
  { url: "images/BV2.jpg", value: true, title: "B7K5" },
  { url: "images/MZ2.jpg", value: true, title: "B7K6" },
  { url: "images/BV1.jpg", value: true, title: "B7K7" },
  { url: "images/NZ1.jpg", value: false, title: "B7K8" },
  { url: "images/MZ4.jpg", value: true, title: "B7K9" },
  { url: "images/JV3.jpg", value: false, title: "B7K10" },
  { url: "images/NZ2.jpg", value: false, title: "B7K11" },
  { url: "images/JM2.jpg", value: false, title: "B7K12" },
  { url: "images/MZ3.jpg", value: true, title: "B7K13" },
  { url: "images/JM3.jpg", value: false, title: "B7K14" },
  { url: "images/BM2.jpg", value: true, title: "B7K15" },
  { url: "images/BM1.jpg", value: true, title: "B7K16" },
  { url: "images/BV3.jpg", value: true, title: "B7K17" },
  { url: "images/MZ5.jpg", value: true, title: "B7K18" },
  { url: "images/NZ6.jpg", value: false, title: "B7K19" },
  { url: "images/NZ4.jpg", value: false, title: "B7K20" },
  { url: "images/JV1.jpg", value: false, title: "B7K21" },
  { url: "images/NZ5.jpg", value: false, title: "B7K22" },
  { url: "images/JV2.jpg", value: false, title: "B7K23" },
  { url: "images/MZ6.jpg", value: true, title: "B7K24" },
];

const imagesSET8 = [
  // A- jei rodomas juodaodis arba nemalonus žodis; L- jei rodomas baltaodis arba malonus žodis
  { url: "images/JV1.jpg", value: true, title: "B8K1" },
  { url: "images/MZ5.jpg", value: false, title: "B8K2" },
  { url: "images/JV2.jpg", value: true, title: "B8K3" },
  { url: "images/BM1.jpg", value: false, title: "B8K4" },
  { url: "images/JM2.jpg", value: true, title: "B8K5" },
  { url: "images/BV3.jpg", value: false, title: "B8K6" },
  { url: "images/NZ2.jpg", value: true, title: "B8K7" },
  { url: "images/MZ4.jpg", value: false, title: "B8K8" },
  { url: "images/JM1.jpg", value: true, title: "B8K9" },
  { url: "images/MZ2.jpg", value: false, title: "B8K10" },
  { url: "images/NZ3.jpg", value: true, title: "B8K11" },
  { url: "images/MZ3.jpg", value: false, title: "B8K12" },
  { url: "images/MZ1.jpg", value: false, title: "B8K13" },
  { url: "images/BV2.jpg", value: false, title: "B8K14" },
  { url: "images/NZ6.jpg", value: true, title: "B8K15" },
  { url: "images/NZ5.jpg", value: true, title: "B8K16" },
  { url: "images/MZ6.jpg", value: false, title: "B8K17" },
  { url: "images/BM3.jpg", value: false, title: "B8K18" },
  { url: "images/NZ1.jpg", value: true, title: "B8K19" },
  { url: "images/BV1.jpg", value: false, title: "B8K20" },
  { url: "images/NZ4.jpg", value: true, title: "B8K21" },
  { url: "images/JV3.jpg", value: true, title: "B8K22" },
  { url: "images/JM3.jpg", value: true, title: "B8K23" },
  { url: "images/BM2.jpg", value: false, title: "B8K24" },
];

let currentImagesArray; // Globalus kintamasis
let currentActiveButton = "KvietimasButton";

function setCurrentImagesArray(array) {
  currentImagesArray = array;
}
// Eventas, kuris laukia klavišų paspaudimo ir užrašo atsakymą (true arba false) į rezultatus
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("KvietimasButton")
    .addEventListener("click", startAprasas);
  document
    .getElementById("AprasasButton")
    .addEventListener("click", startInstr_1is8);
  document.getElementById("1is8Button").addEventListener("click", startTest1);
  document.getElementById("2is8Button").addEventListener("click", startTest2);
  document.getElementById("3is8Button").addEventListener("click", startTest3);
  document.getElementById("4is8Button").addEventListener("click", startTest4);
  document.getElementById("5is8Button").addEventListener("click", startTest5);
  document.getElementById("6is8Button").addEventListener("click", startTest6);
  document.getElementById("7is8Button").addEventListener("click", startTest7);
  document.getElementById("8is8Button").addEventListener("click", startTest8);

  document.addEventListener("keydown", function (event) {
    // Instrukcijų režimas: reaguoja tik į 'Space' klavišą
    if (isWindowActive === "instruction" && event.code === "Space") {
      // Funkcija, kuri patikrina, ar elementas yra matomas ir aktyvus
      document.getElementById(currentActiveButton).click();
      if (currentActiveButton === "KvietimasButton") {
        currentActiveButton = "AprasasButton";
      } else if (currentActiveButton === "AprasasButton") {
        currentActiveButton = "1is8Button";
      } else if (currentActiveButton === "1is8Button") {
        currentActiveButton = "2is8Button";
      } else if (currentActiveButton === "2is8Button") {
        currentActiveButton = "3is8Button";
      } else if (currentActiveButton === "3is8Button") {
        currentActiveButton = "4is8Button";
      } else if (currentActiveButton === "4is8Button") {
        currentActiveButton = "5is8Button";
      } else if (currentActiveButton === "5is8Button") {
        currentActiveButton = "6is8Button";
      } else if (currentActiveButton === "6is8Button") {
        currentActiveButton = "7is8Button";
      } else if (currentActiveButton === "7is8Button") {
        currentActiveButton = "8is8Button";
      }
    }
    // Testo režimas: reaguoja tik į 'A' ir 'L' klavišus
    if (isWindowActive === "test") {
      if (event.key === "a") {
        // Logika 'A' klavišo paspaudimui testo režime
        // Pavyzdžiui, įrašyti atsakymą ir rodyti kitą paveikslėlį
        recordAnswer("Teisingas", currentImagesArray);
        showNextImage(currentImagesArray);
      } else if (event.key === "l") {
        // Logika 'L' klavišo paspaudimui testo režime
        // Pavyzdžiui, įrašyti atsakymą ir rodyti kitą paveikslėlį
        recordAnswer("Neteisingas", currentImagesArray);
        showNextImage(currentImagesArray);
      }
    }
  });
});

// Funkcija Tyrimo Aprašymui
function startAprasas() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "instruction";
  document.getElementById("Kvietimas").style.display = "none";
  document.getElementById("Aprasymas").style.display = "block";
  document.getElementById("Aprasymas").focus();
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija Tyrimo INSTRUKCIJOS1/8
function startInstr_1is8() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "instruction";
  document.getElementById("Aprasymas").style.display = "none";
  document.getElementById("1").style.display = "grid";
  document.getElementById("2").style.display = "none";
  document.getElementById("test").style.display = "none";
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 1
function startTest1() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "JUODAODIS";
  document.getElementById("textvirsL").textContent = "BALTAODIS";
  document.getElementById("textvirsA1").textContent = "";
  document.getElementById("textvirsA2").textContent = "";
  document.getElementById("textvirsL1").textContent = "";
  document.getElementById("textvirsL2").textContent = "";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas juodaodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas baltaodis"; // pridejau 2024 02 05
  document.getElementById("1").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET1);
  currentImagesArray = imagesSET1;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 2
function startTest2() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "MALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textvirsA1").textContent = "";
  document.getElementById("textvirsA2").textContent = "";
  document.getElementById("textvirsL1").textContent = "";
  document.getElementById("textvirsL2").textContent = "";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas malonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("2").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET2);
  currentImagesArray = imagesSET2;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 3
function startTest3() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "BALTAODIS";
  document.getElementById("textvirsA1").textContent = "ARBA";
  document.getElementById("textvirsA2").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "JUODAODIS";
  document.getElementById("textvirsL1").textContent = "ARBA";
  document.getElementById("textvirsL2").textContent = "MALONUS ŽODIS";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas baltaodis arba nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas juodaodis arba malonus žodis"; // pridejau 2024 02 05
  document.getElementById("3").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET1);
  currentImagesArray = imagesSET3;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 4
function startTest4() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "JUODAODIS";
  document.getElementById("textvirsA1").textContent = "ARBA";
  document.getElementById("textvirsA2").textContent = "MALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "BALTAODIS";
  document.getElementById("textvirsL1").textContent = "ARBA";
  document.getElementById("textvirsL2").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas juodaodis arba malonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas baltaodis arba nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("4").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET2);
  currentImagesArray = imagesSET4;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 5
function startTest5() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "BALTAODIS";
  document.getElementById("textvirsA1").textContent = "";
  document.getElementById("textvirsA2").textContent = "";
  document.getElementById("textvirsL").textContent = "JUODAODIS";
  document.getElementById("textvirsL1").textContent = "";
  document.getElementById("textvirsL2").textContent = "";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas baltaodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas juodaodis"; // pridejau 2024 02 05
  document.getElementById("5").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET1);
  currentImagesArray = imagesSET5;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 6
function startTest6() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textvirsA1").textContent = "";
  document.getElementById("textvirsA2").textContent = "";
  document.getElementById("textvirsL").textContent = "MALONUS ŽODIS";
  document.getElementById("textvirsL1").textContent = "";
  document.getElementById("textvirsL2").textContent = "";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas malonus žodis"; // pridejau 2024 02 05
  document.getElementById("6").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET1);
  currentImagesArray = imagesSET6;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 7
function startTest7() {
  console.log("isWindowActive status:", isWindowActive);
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "BALTAODIS";
  document.getElementById("textvirsA1").textContent = "ARBA";
  document.getElementById("textvirsA2").textContent = "MALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "JUODAODIS";
  document.getElementById("textvirsL1").textContent = "ARBA";
  document.getElementById("textvirsL2").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas baltaodis arba malonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas juodaodis arba nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("7").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET1);
  currentImagesArray = imagesSET7;
  console.log("isWindowActive status:", isWindowActive);
}
// Funkcija testo pradžiai 8
function startTest8() {
  console.log("isWindowActive status:", isWindowActive);

  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "JUODAODIS";
  document.getElementById("textvirsA1").textContent = "ARBA";
  document.getElementById("textvirsA2").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "BALTAODIS";
  document.getElementById("textvirsL1").textContent = "ARBA";
  document.getElementById("textvirsL2").textContent = "MALONUS ŽODIS";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> jei rodomas juodaodis arba nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas baltaodis arba malonus žodis"; // pridejau 2024 02 05
  document.getElementById("8").style.display = "none";
  document.getElementById("test").style.display = "flex";
  showNextImage(imagesSET2);
  currentImagesArray = imagesSET8;
  console.log("isWindowActive status:", isWindowActive);
}

// Funkcija, kuri rodo kitą paveiksliuką arba rezultatus, jei visi paveiksliukai buvo parodyti
function showNextImage(imagesArray) {
  startTime = new Date();
  if (currentImageIndex < imagesArray.length) {
    var imageElement = document.getElementById("testImage");
    imageElement.src = imagesArray[currentImageIndex].url;
    currentImageIndex++;
  } else {
    currentImageIndex = 0; // Jei norite pradėti iš naujo
    i++;
    instrukction(i);
  }
}

function recordAnswer(answer, imagesArray) {
  const timeTaken = (new Date() - startTime) / 1000;
  const correctAnswer = imagesArray[imageIndex].value;
  const imageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 0;
  checkAnswer(answer, correctAnswer); // Čia patikrinkite atsakymą
  const result = {
    title: imagesArray[imageIndex].title,
    answer: answer,
    timeTaken: timeTaken,
  };

  answersRecord.push(result);

  // Išspausdinkite naują įrašą konsolėje
  console.log("Naujas įrašas:", result);
}

// Funkcija Tyrimo INSTRUKCIJOS2/8
function instrukction(div) {
  isWindowActive = "instruction";
  document.getElementById(div).style.display = "grid";
  document.getElementById("test").style.display = "none";
}

// Funkcija, kuri rodo testo rezultatus
/*
function showResults() {
    console.log('Rezultatai:');
    answersRecord.forEach(result => {
        console.log(`${result.title}: ${result.answer ? 'Teisingai' : 'Neteisingai'} (Laikas: ${result.timeTaken}s)`);
    });
}
*/

// Eventas, kuris kviečia funkciją recordAnswer su reikšme "true" paspaudus mygtuką
document.getElementById("trueButton").addEventListener("click", function () {
  console.log("True button clicked");
  recordAnswer(true, currentImagesArray);
  showNextImage(currentImagesArray);
});

document.getElementById("falseButton").addEventListener("click", function () {
  console.log("False button clicked");
  recordAnswer(false, currentImagesArray);
  showNextImage(currentImagesArray);
});

function resetCurrentImageIndex() {
  currentImageIndex = 0;
}

function checkAnswer(userAnswer, correctAnswer) {
  const isCorrect =
    (userAnswer === "Teisingas" && correctAnswer === true) ||
    (userAnswer !== "Teisingas" && correctAnswer === false);

  if (!isCorrect) {
    showTemporaryMessage("Neteisingas atsakymas!", "error");
  } else {
    showTemporaryMessage("Teisingas atsakymas!", "success");
  }
}

function showTemporaryMessage(message, messageType) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("temporary-message");

  if (messageType === "error") {
    messageElement.style.backgroundColor = "red";
  } else if (messageType === "success") {
    messageElement.style.backgroundColor = "green";
  }

  messageElement.textContent = message;
  document.body.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 3000); // Pranešimas išnyks po 3 sekundžių
}

function closeWindowOrExitMode() {
  isWindowActive = ""; // Deaktyvuoja visus režimus
  // Kitas langų uždarymo ar režimo pabaigos logika
}
