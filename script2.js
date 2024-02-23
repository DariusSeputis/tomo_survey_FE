let currentImageIndex = 1; // Kintamasis, kuris laikys dabartinio paveiksliuko indeksą
let startTime; // Kintamasis, kuriame bus saugomas laikas, kai buvo pradėtas rodyti paveiksliukas
let results = []; // Masyvas, kuriame bus saugomi testo rezultatai
let answersRecord = [];
let i = 1;
let currentTest = 1;
let isWindowActive = "instruction"; // Galimos reikšmės: '', 'test', 'instruction'
var currentState = 0;

// paskutinio batono paemimas ir funcija
const button = document.getElementById('pateikti');
button.addEventListener('click', function() {
    // CIA SIUNCIAMA I BACKENDA
    fetch(`https://tomowebappasbe.azurewebsites.net/sendData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ testo_duomenys: answersRecord }),
    })
      .then((res) => res.json())
      .then((data) => console.log("ATSAKYMAS IS BE:", data))
      .catch((error) => console.log("ATSAKYMAS IS BE ERRORAS:", error));

      document.getElementById("10").style.display = "none";
      document.getElementById("11").style.display = "block";
  
});

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
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('KvietimasButton').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(1); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('AprasasButton').addEventListener('click', function() {
		performAction(); // Atnaujina būseną
		updateState(2); // Iškviečia funkciją 'startAprasas',
	});
	document.getElementById('1is8Button').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(3); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('2is8Button').addEventListener('click', function() {
		performAction();
		updateState(4); // Iškviečia funkcijąkur 'startAprasas'

	});
	document.getElementById('3is8Button').addEventListener('click', function() {
		performAction();
		updateState(5); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('4is8Button').addEventListener('click', function() {
		performAction();
		updateState(6); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('5is8Button').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(7); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('6is8Button').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(8); // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('7is8Button').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(9);; // Iškviečia funkciją 'startAprasas'

	});
	document.getElementById('8is8Button').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(10);; // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('kitas').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(11);; // Iškviečia funkciją 'startAprasas'
	});
	document.getElementById('pateikti').addEventListener('click', function() {
		performAction(); // Atnaujina būseną,
		updateState(12);; // Iškviečia funkciją 'startAprasas'
	});
	
document.addEventListener('keydown', function(event) {
    // Instrukcijų režimas: reaguoja tik į 'Space' klavišą
    if (event.key === ' ' & isWindowActive === 'instruction') {
        performAction(); // Atlikti veiksmą pagal esamą būseną
        updateState(currentState + 1); // Pereiti į kitą būseną
    }
    // Testo režimas: reaguoja tik į 'A' ir 'L' klavišus
    if (isWindowActive === 'test') {
        if (event.key === 'A' || event.key === 'a') {
        document.getElementById('trueButton').click();
    } else if (event.key === 'L' || event.key === 'l') {
        document.getElementById('falseButton').click();
    }
    }
});
});


function updateState(newState) {
  currentState = newState;
}

function performAction() {
  switch (currentState) {
    case 0:
      startAprasas();
      break;
    case 1:
      startInstr_1is8();
      break;
    case 2:
      startTest1();
      break;
    case 3:
      startTest2();
      break;
    case 4:
      startTest3();
      break;
    case 5:
      startTest4();
      break;
    case 6:
      startTest5();
      break;
    case 7:
      startTest6();
      break;
    case 8:
      startTest7();
      break;
    case 9:
      startTest8();
      break;
	case 10:
      instrukction(10);
      break;
	case 11:
      instrukction(11);
      break;
  }
}

// Funkcija Tyrimo Aprašymui
function startAprasas() {
  isWindowActive = "instruction";
  document.getElementById("Kvietimas").style.display = "none";
  document.getElementById("Aprasymas").style.display = "block";
  document.getElementById("Aprasymas").focus();
}
// Funkcija Tyrimo INSTRUKCIJOS1/8
function startInstr_1is8() {
  isWindowActive = "instruction";
  document.getElementById("Aprasymas").style.display = "none";
  document.getElementById("1").style.display = "grid";
  document.getElementById("2").style.display = "none";
  document.getElementById("test").style.display = "none";
}
// Funkcija testo pradžiai 1
function startTest1() {
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
  currentImagesArray = imagesSET1;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 2
function startTest2() {
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
  currentImagesArray = imagesSET2;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 3
function startTest3() {
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
  currentImagesArray = imagesSET3;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 4
function startTest4() {
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
  currentImagesArray = imagesSET4;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 5
function startTest5() {
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
  currentImagesArray = imagesSET5;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 6
function startTest6() {
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
  currentImagesArray = imagesSET6;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 7
function startTest7() {
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
  currentImagesArray = imagesSET7;
  showNextImage(null, currentImagesArray);
}
// Funkcija testo pradžiai 8
function startTest8() {
  isWindowActive = "test";
  startTime = new Date();
  document.getElementById("textvirsA").textContent = "JUODAODIS";
  document.getElementById("textvirsA1").textContent = "ARBA";
  document.getElementById("textvirsA2").textContent = "NEMALONUS ŽODIS";
  document.getElementById("textvirsL").textContent = "BALTAODIS";
  document.getElementById("textvirsL1").textContent = "ARBA";
  document.getElementById("textvirsL2").textContent = "MALONUS ŽODIS";
  document.getElementById("textasPoNuotrauka1").innerHTML =
    "<b>A</b> - jei rodomas juodaodis arba nemalonus žodis"; // pridejau 2024 02 05
  document.getElementById("textasPoNuotrauka2").innerHTML =
    "<b>L</b> - jei rodomas baltaodis arba malonus žodis"; // pridejau 2024 02 05
  document.getElementById("8").style.display = "none";
  document.getElementById("test").style.display = "flex";
  currentImagesArray = imagesSET8;
  showNextImage(null, currentImagesArray);
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
function showNextImage(userAnswer, imagesArray) {
  startTime = new Date();
  if (currentImageIndex < imagesArray.length) {
    console.log(currentImageIndex, " ", imagesArray.length);
    var correctAnswer = imagesArray[currentImageIndex].value;
    var imageElement = document.getElementById("testImage");
    imageElement.src = imagesArray[currentImageIndex].url;
    if (userAnswer == correctAnswer) {
      currentImageIndex++;
      if (currentImageIndex <= imagesArray.length) {
        // Iškviečiame funkciją vėl su nauju indeksu
        showNextImage(null, imagesArray);
      }
    }
  } else {
    currentImageIndex = 0; // Jei norite pradėti iš naujo
    i++;
    instrukction(i);
  }
}

function recordAnswer(answer, imagesArray) {
  const timeTaken = (new Date() - startTime) / 1000;
  const correctAnswer = imagesArray[currentImageIndex].value;
  const title = imagesArray[currentImageIndex].title;
  // Tikrinkite, ar rezultatas su tokiu pavadinimu jau yra masyve
  const existingResultIndex = answersRecord.findIndex(
    (result) => result.title === title
  );
  let answer2 = null;
  if (answer === correctAnswer) {
    answer2 = "Teisingai";
  } else {
    answer2 = "Neteisingai";
    var testDiv = document.getElementById("test");
    var errorMessage = document.createElement("div");
    errorMessage.textContent = "Suklydote"; // Tekstas
    errorMessage.style.position = "absolute";
    errorMessage.style.top = "50%";
    errorMessage.style.left = "50%";
    errorMessage.style.transform = "translate(-50%, -50%)";
    errorMessage.style.color = "black";
    errorMessage.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Pusiau permatomas raudonas fonas
    errorMessage.style.padding = "20px";
    errorMessage.style.borderRadius = "10px";
    errorMessage.style.zIndex = "1000"; // Užtikrina, kad būtų virš kitų elementų
    testDiv.style.position = "relative";
    testDiv.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, 1000); // Paslepia pranešimą po 2 sekundžių
    // Įtraukimas pranešimo į <div id="test">
    document.getElementById("test").style.position = "relative";
    document.getElementById("test").appendChild(errorMessage);
  }
  // Jei nėra, įrašykite naują rezultatą
  if (existingResultIndex === -1) {
    const result = {
      title: title,
      answer: answer2,
      timeTaken: timeTaken,
    };
    console.log(result); // Parodyti rezultatą konsolėje prieš įtraukiant į masyvą
    answersRecord.push(result); // Įtraukite rezultatą į masyvą
  }
}

// Funkcija Tyrimo INSTRUKCIJOS2/8
function instrukction(div) {
  isWindowActive = "instruction";
  document.getElementById(div-1).style.display = "none";
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
  showNextImage(true, currentImagesArray);
});

document.getElementById("falseButton").addEventListener("click", function () {
  console.log("False button clicked");
  recordAnswer(false, currentImagesArray);
  showNextImage(false, currentImagesArray);
});

function resetCurrentImageIndex() {
  currentImageIndex = 0;
}
/*
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
*/
function closeWindowOrExitMode() {
  isWindowActive = ""; // Deaktyvuoja visus režimus
  // Kitas langų uždarymo ar režimo pabaigos logika
}
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelector('input[name="amzius"]:checked')
    ? (document.getElementById("errorasAmzius").style.display = "none")
    : (document.getElementById("errorasAmzius").style.display = "block");

  document.querySelector('input[name="gender"]:checked')
    ? (document.getElementById("errorasLytis").style.display = "none")
    : (document.getElementById("errorasLytis").style.display = "block");

  document.querySelector('input[name="dpatirtis"]:checked')
    ? (document.getElementById("errorasDpatirtis").style.display = "none")
    : (document.getElementById("errorasDpatirtis").style.display = "block");

  document.querySelector('input[name="education"]:checked')
    ? (document.getElementById("errorasIssilavinimas").style.display = "none")
    : (document.getElementById("errorasIssilavinimas").style.display = "block");

  document.querySelector('input[name="dsritis"]:checked')
    ? (document.getElementById("errorasDsritis").style.display = "none")
    : (document.getElementById("errorasDsritis").style.display = "block");

  document.querySelector('input[name="miestas"]:checked')
    ? (document.getElementById("errorasMiestas").style.display = "none")
    : (document.getElementById("errorasMiestas").style.display = "block");

  document.querySelector('input[name="pareigos"]:checked')
    ? (document.getElementById("errorasPareigos").style.display = "none")
    : (document.getElementById("errorasPareigos").style.display = "block");

  let age = document.querySelector('input[name="amzius"]:checked').labels[0]
    .innerText;
  let gender = document.querySelector('input[name="gender"]:checked').labels[0]
    .innerText;
  let education = document.querySelector('input[name="education"]:checked')
    .labels[0].innerText;
  let workExperience = document.querySelector('input[name="dpatirtis"]:checked')
    .labels[0].innerText;
  let loc = document.querySelector('input[name="miestas"]:checked').labels[0]
    .innerText;
  let pareigos = document.querySelector('input[name="pareigos"]:checked')
    .labels[0].innerText;
  let darboSritis = document.querySelector('input[name="dsritis"]:checked')
    .labels[0].innerText;

  let result = {
    age: age,
    gender: gender,
    education: education,
    workExperience: workExperience,
    loc: loc,
    pareigos: pareigos,
    darboSritis: darboSritis,
  };

  answersRecord.push(result);
});
