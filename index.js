// =============================
// ALL VARIABLES AND DOC SELECTIONS
// =============================
let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']"
);
const fullNameInput = form.querySelector(
  "input[placeholder='Enter full name']"
);
const homeTownInput = form.querySelector(
  "input[placeholder='Enter home town']"
);
const purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']"
);
const expertiseInput = form.querySelector(
  "input[placeholder='e.g., Painter / Dancer']"
);

const categoryRadios = form.querySelectorAll("input[name='category']");

// =============================
// DEFAULT CARDS
// =============================
const defaultTasks = [
  {
    imageUrl: "https://images.unsplash.com/photo-1595523052653-b9f497845c3d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "John Doe",
    homeTown: "New York",
    purpose: "Creative Painter",
    expertise: "Painter",
    selected: "Art",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1536294738309-2fc595e788fb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "Jane Smith",
    homeTown: "London",
    purpose: "Professional Dancer",
    expertise: "Dancer",
    selected: "Dance",
  },
  {
    imageUrl: "https://plus.unsplash.com/premium_photo-1682600101311-1121bc732450?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "Mike Brown",
    homeTown: "Paris",
    purpose: "Talented Singer",
    expertise: "Singer",
    selected: "Music",
  },
  {
    imageUrl: "https://plus.unsplash.com/premium_photo-1661778091956-15dbe6e47442?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fullName: "Alice Green",
    homeTown: "Tokyo",
    purpose: "Expert Chef",
    expertise: "Chef",
    selected: "Cooking",
  },
];

// =============================
// SAVE TO LOCAL STORAGE (with duplicate prevention)
// =============================
function saveToLocalStorage(obj) {
  let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const exists = oldTasks.some(
    (t) =>
      t.fullName === obj.fullName &&
      t.expertise === obj.expertise &&
      t.homeTown === obj.homeTown &&
      t.purpose === obj.purpose &&
      t.imageUrl === obj.imageUrl
  );

  if (!exists) {
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

// =============================
// OPEN FORM
// =============================
addNote.addEventListener("click", function () {
  formContainer.style.display = "initial";
});

// =============================
// CLOSE FORM
// =============================
closeForm.addEventListener("click", function () {
  formContainer.style.display = "none";
});

// Close form on background click
window.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    formContainer.style.display = "none";
  }
});

// =============================
// FORM SUBMIT
// =============================
form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose = purposeInput.value.trim();
  const expertise = expertiseInput.value.trim();

  let selected = false;
  categoryRadios.forEach(function (cat) {
    if (cat.checked) {
      selected = cat.value;
    }
  });

  if (
    !imageUrl ||
    !fullName ||
    !homeTown ||
    !purpose ||
    !expertise ||
    !selected
  ) {
    alert("Please fill all fields and select a category.");
    return;
  }

  saveToLocalStorage({
    imageUrl,
    fullName,
    purpose,
    homeTown,
    expertise,
    selected,
  });

  form.reset();
  formContainer.style.display = "none";
  showCards();
});

// =============================
// SHOW CARDS
// =============================
function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // If no tasks, use default tasks
  if (allTasks.length === 0) {
    allTasks = defaultTasks;
  }

  allTasks = allTasks.reverse(); // latest on top

  allTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");

    const name = document.createElement("h2");
    name.textContent = task.fullName;

    const expertiseTag = document.createElement("span");
    expertiseTag.classList.add("expertise-badge");
    expertiseTag.textContent = task.expertise;

    const leftSide = document.createElement("div");
    leftSide.classList.add("left-side");
    leftSide.appendChild(avatar);
    leftSide.appendChild(name);

    cardHeader.appendChild(leftSide);
    cardHeader.appendChild(expertiseTag);

    card.appendChild(cardHeader);

    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");
    hometownInfo.innerHTML = `<span>Home town</span><span>${task.homeTown}</span>`;
    card.appendChild(hometownInfo);

    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");
    bookingsInfo.innerHTML = `<span>Purpose</span><span>${task.purpose}</span>`;
    card.appendChild(bookingsInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";

    // Only allow delete if not a default card
    if (!defaultTasks.includes(task)) {
      deleteBtn.addEventListener("click", function () {
        deleteCard(task);
      });
    } else {
      deleteBtn.disabled = true; // default cards can't be deleted
    }

    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);
    buttonsDiv.appendChild(deleteBtn);

    card.appendChild(buttonsDiv);

    stack.appendChild(card);
  });

  updateStack();
}

showCards();

// =============================
// UPDATE STACK EFFECT
// =============================
function updateStack() {
  const cards = document.querySelectorAll(".stack .card");
  if (cards.length === 0) return;

  cards.forEach((card, i) => {
    if (i < 3) {
      card.style.zIndex = 3 - i;
      card.style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
      card.style.opacity = `${1 - i * 0.02}`;
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// =============================
// STACK NAVIGATION
// =============================
upBtn.addEventListener("click", function () {
  let lastChild = stack.lastElementChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});

downBtn.addEventListener("click", function () {
  const firstChild = stack.firstElementChild;
  if (firstChild) {
    stack.appendChild(firstChild);
    updateStack();
  }
});

// =============================
// DELETE CARD
// =============================
function deleteCard(taskToDelete) {
  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  allTasks = allTasks.filter(function (t) {
    return !(
      t.fullName === taskToDelete.fullName &&
      t.homeTown === taskToDelete.homeTown &&
      t.expertise === taskToDelete.expertise &&
      t.purpose === taskToDelete.purpose &&
      t.imageUrl === taskToDelete.imageUrl
    );
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
  showCards();
}
