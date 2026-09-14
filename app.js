const questions = [
  {
    name: "Fuehlen Sie sich haeufig muede und erschoepft",
    text: "Fühlen Sie sich häufig müde und erschöpft?"
  },
  {
    name: "Faellt es Ihnen schwer sich ueber laengere Zeit zu konzentrieren",
    text: "Fällt es Ihnen schwer, sich über längere Zeit zu konzentrieren?"
  },
  {
    name: "Fuehlen Sie sich haeufig gestresst",
    text: "Fühlen Sie sich häufig gestresst?"
  },
  {
    name: "Sind Sie anfaellig fuer Erkaeltungen oder Infektionen",
    text: "Sind Sie anfällig für Erkältungen oder Infektionen?"
  },
  {
    name: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion",
    text: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion?"
  },
  {
    name: "Haben Sie Probleme durchzuschlafen",
    text: "Haben Sie Probleme durchzuschlafen?"
  },
  {
    name: "Wachen Sie morgens haeufig auf ohne richtig erholt zu sein",
    text: "Wachen Sie morgens häufig auf, ohne richtig erholt zu sein?"
  },
  {
    name: "Haben Sie haeufig Wadenkraempfe oder Morgensteifigkeit",
    text: "Haben Sie häufig Wadenkrämpfe oder Morgensteifigkeit?"
  },
  {
    name: "Sind Sie mit Ihrer Haut Ihren Haaren oder Ihren Naegeln unzufrieden",
    text: "Sind Sie mit Ihrer Haut, Ihren Haaren oder Ihren Nägeln unzufrieden?"
  },
  {
    name: "Leiden Sie unter Arthrose oder Arthritis",
    text: "Leiden Sie unter Arthrose oder Arthritis?"
  },
  {
    name: "Treiben Sie regelmaessig Sport",
    text: "Treiben Sie regelmäßig Sport?"
  },
  {
    name: "Essen Sie zwei bis dreimal pro Woche frischen Lachs Makrele oder Thunfisch",
    text: "Essen Sie zwei- bis dreimal pro Woche frischen Lachs, Makrele oder Thunfisch?"
  },
  {
    name: "Leiden Sie als Frau unter typischen peri oder menopausalen Beschwerden",
    text: "Leiden Sie als Frau unter typischen peri- oder menopausalen Beschwerden?",
    options: [
      { value: "Ja", label: "Ja" },
      { value: "Nein", label: "Nein" },
      { value: "Ich bin maennlich", label: "Ich bin männlich" }
    ]
  },
  {
    name: "Moechten Sie als Mann Ihren Testosteronspiegel verbessern",
    text: "Möchten Sie als Mann Ihren Testosteronspiegel verbessern?",
    options: [
      { value: "Ja", label: "Ja" },
      { value: "Nein", label: "Nein" },
      { value: "Ich bin weiblich", label: "Ich bin weiblich" }
    ]
  },
  {
    name: "Moechten Sie Ihr Gewicht optimieren",
    text: "Möchten Sie Ihr Gewicht optimieren?",
    type: "weight"
  },
  {
    name: "Gibt es Lebensmittel die Sie nicht vertragen",
    text: "Gibt es Lebensmittel, die Sie nicht vertragen?",
    type: "intolerance"
  },
  {
    name: "Treiben Ihre Kinder Sport",
    text: "Treiben Ihre Kinder Sport?"
  },
  {
    name: "Haben Sie ein Kind mit Konzentrations oder Aufmerksamkeitsstoerungen",
    text: "Haben Sie ein Kind mit Konzentrations- oder Aufmerksamkeitsstörungen?"
  },
  {
    name: "Essen Sie taeglich weniger als fuenf Portionen Obst und Gemuese",
    text: "Essen Sie täglich weniger als fünf Portionen Obst und Gemüse?"
  },
  {
    name: "Essen Sie mehrfach in der Woche Fast Food",
    text: "Essen Sie mehrfach in der Woche Fast Food ?"
  }
];

const form = document.getElementById("contactForm");
const questionSteps = document.getElementById("questionSteps");
const formError = document.getElementById("formError");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const stepText = document.getElementById("stepText");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const successMessage = document.getElementById("successMessage");
const startButton = document.getElementById("startButton");

const DEFAULT_OPTIONS = [
  { value: "Ja", label: "Ja" },
  { value: "Nein", label: "Nein" }
];

const PAL_OPTIONS = [
  {
    value: "1,2–1,3",
    label: "Ausschließlich sitzend oder liegend"
  },
  {
    value: "1,4–1,5",
    label: "Fast ausschließlich sitzende Tätigkeit"
  },
  {
    value: "1,6–1,7",
    label: "Sitzende Tätigkeit mit zeitweiligem Stehen oder Gehen"
  },
  {
    value: "1,8–1,9",
    label: "Überwiegend stehende oder gehende Tätigkeit"
  }
];

function createOptionCard(questionName, option, required = false) {
  return `
    <label class="option-card">
      <input
        type="radio"
        name="${questionName}"
        value="${option.value}"
        ${required ? "required" : ""}
      >
      <span>${option.label}</span>
    </label>
  `;
}

function createStandardQuestion(question, index) {
  const options = question.options || DEFAULT_OPTIONS;

  return `
    <section
      class="step health-question"
      data-question-type="standard"
      data-auto-advance="true"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid ${options.length === 2 ? "two" : ""}">
        ${options
          .map((option, optionIndex) =>
            createOptionCard(question.name, option, optionIndex === 0)
          )
          .join("")}
      </div>
    </section>
  `;
}

function createWeightQuestion(question, index) {
  return `
    <section
      class="step health-question"
      data-question-type="weight"
      data-auto-advance="conditional"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>

      <div class="conditional-box" data-weight-box hidden>
        <p class="conditional-title">Was möchten Sie erreichen?</p>

        <div class="choice-grid two">
          <label class="option-card">
            <input
              type="radio"
              name="Gewichtsziel"
              value="Abnehmen"
              data-conditional-required
            >
            <span>Abnehmen</span>
          </label>

          <label class="option-card">
            <input
              type="radio"
              name="Gewichtsziel"
              value="Zunehmen"
              data-conditional-required
            >
            <span>Zunehmen</span>
          </label>
        </div>

        <div class="grid">
          <label>
            Größe (cm) *
            <input
              type="number"
              name="Groesse"
              min="50"
              max="250"
              step="1"
              inputmode="numeric"
              data-conditional-required
            >
          </label>

          <label>
            Gewicht (kg) *
            <input
              type="number"
              name="Gewicht"
              min="20"
              max="400"
              step="0.1"
              inputmode="decimal"
              data-conditional-required
            >
          </label>
          <label class="full">
            Welche Beschreibung passt zu Ihrem typischen Alltag? *
            <select
              name="Koerperliche Aktivitaet"
              data-conditional-required
            >
              <option value="">Bitte auswählen</option>
              ${PAL_OPTIONS
                .map(option => `<option value="${option.value}">${option.label}</option>`)
                .join("")}
            </select>
          </label>
        </div>
      </div>
    </section>
  `;
}

function createIntoleranceQuestion(question, index) {
  return `
    <section
      class="step health-question"
      data-question-type="intolerance"
      data-auto-advance="conditional"
    >
      <p class="step-kicker">
        Gesundheitsfrage ${index + 1} von ${questions.length}
      </p>

      <h2>${question.text}</h2>

      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>

      <div class="conditional-box" data-intolerance-box hidden>
        <label>
          Welche Unverträglichkeiten liegen vor?
          <input
            type="text"
            name="Lebensmittel Unvertraeglichkeiten"
            placeholder="z. B. Gluten, Laktose, Fruktose"
            data-conditional-required
          >
        </label>
      </div>
    </section>
  `;
}

function renderQuestions() {
  questionSteps.innerHTML = questions
    .map((question, index) => {
      if (question.type === "weight") {
        return createWeightQuestion(question, index);
      }

      if (question.type === "intolerance") {
        return createIntoleranceQuestion(question, index);
      }

      return createStandardQuestion(question, index);
    })
    .join("");
}

renderQuestions();

const steps = [...document.querySelectorAll(".step")];
let currentStep = 0;
let autoAdvanceTimer = null;

function showError(message) {
  formError.textContent = message;
}

function clearError() {
  formError.textContent = "";
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function scheduleNextStep(delay = 180) {
  clearAutoAdvanceTimer();

  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    nextStep();
  }, delay);
}

function getFields(step) {
  return [...step.querySelectorAll("input, select, textarea")].filter(
    field => field.name !== "botcheck" && !field.disabled
  );
}

function updateConditionalRequirement(container, active) {
  if (!container) return;

  container.querySelectorAll("[data-conditional-required]").forEach(field => {
    field.required = active;
  });
}

function resetConditionalFields(container) {
  if (!container) return;

  container.querySelectorAll("input, select, textarea").forEach(field => {
    if (field.type === "radio" || field.type === "checkbox") {
      field.checked = false;
    } else if (field.tagName === "SELECT") {
      field.selectedIndex = 0;
    } else {
      field.value = "";
    }

    field.required = false;
  });
}

function validateCurrentStep() {
  const step = steps[currentStep];

  if (!step) {
    return false;
  }

  if (step.classList.contains("priority-step")) {
    const selected = step.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;

    if (selected === 0) {
      showError("Bitte wählen Sie mindestens eine Antwort aus.");
      return false;
    }

    if (selected > 3) {
      showError("Bitte wählen Sie maximal drei Antworten aus.");
      return false;
    }

    return true;
  }

  const fields = getFields(step);

  for (const field of fields) {
    if (!field.checkValidity()) {
      showError(
        "Bitte beantworten Sie diese Frage bzw. füllen Sie alle Pflichtfelder korrekt aus."
      );
      field.reportValidity();
      return false;
    }
  }

  return true;
}

function updateWizard() {
  clearAutoAdvanceTimer();

  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  const total = steps.length;
  const percent =
    total > 1 ? Math.round((currentStep / (total - 1)) * 100) : 100;

  stepText.textContent = `Schritt ${currentStep + 1} von ${total}`;
  progressText.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.style.display =
    currentStep === total - 1 ? "none" : "inline-flex";
  submitBtn.style.display =
    currentStep === total - 1 ? "inline-flex" : "none";

  clearError();

  const cardTop = form.getBoundingClientRect().top + window.scrollY - 12;

  window.scrollTo({
    top: cardTop,
    behavior: "smooth"
  });
}

function nextStep() {
  if (!validateCurrentStep()) {
    return;
  }

  if (currentStep < steps.length - 1) {
    currentStep += 1;
    updateWizard();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep -= 1;
    updateWizard();
  }
}

function handlePrioritySelection(field) {
  const step = field.closest(".priority-step");

  if (!step) {
    return false;
  }

  const selected = [
    ...step.querySelectorAll('input[type="checkbox"]:checked')
  ];

  if (selected.length > 3) {
    field.checked = false;
    showError("Bitte wählen Sie maximal drei Antworten aus.");
  } else {
    clearError();
  }

  return true;
}

function handleWeightQuestion(field, step) {
  const weightBox = step.querySelector("[data-weight-box]");

  if (field.name === "Moechten Sie Ihr Gewicht optimieren") {
    const isYes = field.value === "Ja";

    weightBox.hidden = !isYes;
    updateConditionalRequirement(weightBox, isYes);

    if (isYes) {
      clearError();
      return true;
    }

    resetConditionalFields(weightBox);
    scheduleNextStep();
    return true;
  }

  if (field.name === "Gewichtsziel") {
    return true;
  }

  if (field.name === "Koerperliche Aktivitaet") {
    clearError();
    return true;
  }

  return false;
}

function handleIntoleranceQuestion(field, step) {
  if (field.name !== "Gibt es Lebensmittel die Sie nicht vertragen") {
    return false;
  }

  const intoleranceBox = step.querySelector("[data-intolerance-box]");
  const isYes = field.value === "Ja";

  intoleranceBox.hidden = !isYes;
  updateConditionalRequirement(intoleranceBox, isYes);

  if (isYes) {
    clearError();

    const textField = intoleranceBox.querySelector('input[type="text"]');

    window.setTimeout(() => {
      textField?.focus();
    }, 50);

    return true;
  }

  resetConditionalFields(intoleranceBox);
  scheduleNextStep();
  return true;
}

function handleConsultationQuestion(field, step) {
  const followup = step.querySelector("[data-consultation-followup]");

  if (!followup) {
    return false;
  }

  if (field.name === "Auswertung angefordert") {
    clearAutoAdvanceTimer();

    const wantsConsultation = field.value === "Ja";

    if (wantsConsultation) {
      resetConditionalFields(followup);
      followup.hidden = true;
      scheduleNextStep();
    } else {
      followup.hidden = false;
      updateConditionalRequirement(followup, true);
      clearError();

      window.setTimeout(() => {
        followup.querySelector('input[type="radio"]')?.focus();
      }, 50);
    }

    return true;
  }

  if (field.name === "Beraterkontakt bestaetigt") {
    clearError();
    scheduleNextStep();
    return true;
  }

  return false;
}

nextBtn.addEventListener("click", nextStep);
prevBtn.addEventListener("click", prevStep);

form.addEventListener("keydown", event => {
  if (event.key !== "Enter" || event.target.tagName === "TEXTAREA") {
    return;
  }

  if (
    event.target.name === "Lebensmittel Unvertraeglichkeiten" ||
    event.target.type === "text" ||
    event.target.type === "email" ||
    event.target.type === "tel" ||
    event.target.type === "number"
  ) {
    return;
  }

  event.preventDefault();

  if (currentStep < steps.length - 1) {
    nextStep();
  }
});

form.addEventListener("input", event => {
  const field = event.target;

  if (field.name === "Vouchernummer") {
    field.value = field.value.replace(/\D/g, "").slice(0, 6);
  }
});

form.addEventListener("change", event => {
  const field = event.target;
  const step = field.closest(".step");

  if (!step) {
    return;
  }

  if (handlePrioritySelection(field)) {
    return;
  }

  const questionType = step.dataset.questionType;

  if (questionType === "weight" && handleWeightQuestion(field, step)) {
    return;
  }

  if (
    questionType === "intolerance" &&
    handleIntoleranceQuestion(field, step)
  ) {
    return;
  }

  if (
    questionType === "consultation" &&
    handleConsultationQuestion(field, step)
  ) {
    return;
  }

  if (
    field.type === "radio" &&
    step.dataset.autoAdvance === "true"
  ) {
    scheduleNextStep();
  }
});

const confirmationAccessKey = "d3f3b6a0-df24-4fb8-b3af-ee29e08d88d2";
const voucherPartners = [
  [0, 200, "Zuständiges Vitalcheck-Team", "Berater"],
  [201, 400, "Herr Marcel Lorenz", "Berater"],
  [401, 600, "Herr Christopher Reis", "Berater"],
  [601, 800, "Frau Giulia Kümmel", "Beraterin"],
  [801, 1000, "Frau Jana Mettler", "Beraterin"],
  [1001, 1200, "Frau Petra Schreiber", "Beraterin"],
  [1201, 1400, "Herr Andre Nelamischkies", "Berater"],
  [1401, 1600, "Herr Klaus Altersberger", "Berater"],
  [1601, 1800, "Herr Johannes Klein", "Berater"],
  [1801, 2000, "Frau Adriana Erz", "Beraterin"],
  [2001, 2200, "Herr Martin Hoffmann", "Berater"]
];

function getVoucherPartner(voucherValue) {
  const voucher = Number(voucherValue);

  if (!Number.isInteger(voucher)) {
    return null;
  }

  const partner = voucherPartners.find(([from, to]) => voucher >= from && voucher <= to);

  return partner ? { name: partner[2], role: partner[3] } : null;
}

function getCustomerSalutation(form) {
  const selectedValues = Array.from(
    form.querySelectorAll('input[type="radio"]:checked')
  ).map(field => field.value);

  if (selectedValues.some(value => /Ich bin maennlich|Ich bin männlich/i.test(value))) {
    return "Herr";
  }

  if (selectedValues.some(value => /Ich bin weiblich/i.test(value))) {
    return "Frau";
  }

  return "Frau/Herr";
}

async function sendConfirmationEmail(form) {
  const partner = getVoucherPartner(form.elements["Vouchernummer"]?.value);
  const data = new FormData();

  data.set("access_key", confirmationAccessKey);
  data.set("email", form.elements.email?.value?.trim() || "");
  data.set("Anrede", getCustomerSalutation(form));
  data.set("Kundenname", form.elements["Nachname"]?.value?.trim() || "");
  data.set(
    "Beratertext",
    partner
      ? `${partner.role === "Beraterin" ? "Ihre zuständige" : "Ihr zuständiger"} ${partner.name} wird Ihnen die Auswertung in Ruhe in einem persönlichen Gespräch erklären und Sie beraten.`
      : "Ihr zuständiger Berater wird Ihnen die Auswertung in Ruhe in einem persönlichen Gespräch erklären und Sie beraten."
  );

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Bestätigungsmail konnte nicht gesendet werden");
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  clearError();

  if (!validateCurrentStep()) {
    return;
  }

  if (!form.checkValidity()) {
    showError("Bitte prüfen Sie Ihre Angaben.");
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Wird gesendet...";

  try {
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Fehler bei der Übermittlung");
    }

    try {
      await sendConfirmationEmail(form);
    } catch (confirmationError) {
      console.error(confirmationError);
    }

    form.hidden = true;
    successMessage.hidden = false;
    successMessage.focus();

    window.scrollTo({
      top: successMessage.offsetTop - 40,
      behavior: "smooth"
    });
  } catch (error) {
    console.error(error);

    showError(
      "Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
    );

    submitBtn.disabled = false;
    submitBtn.textContent = "Fitness-Check absenden";
  }
});

startButton.addEventListener("click", () => {
  window.setTimeout(updateWizard, 250);
});

window.history.scrollRestoration = "manual";

document.addEventListener("DOMContentLoaded", () => {
  updateWizard();

  window.setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, 10);
});
