const questions = [
  { name: "Fuehlen Sie sich haeufig muede und erschoepft", text: "Fühlen Sie sich häufig müde und erschöpft?" },
  { name: "Faellt es Ihnen schwer sich ueber laengere Zeit zu konzentrieren", text: "Fällt es Ihnen schwer, sich über längere Zeit zu konzentrieren?" },
  { name: "Fuehlen Sie sich haeufig gestresst", text: "Fühlen Sie sich häufig gestresst?" },
  { name: "Haben Sie haeufiger Kopfschmerzen", text: "Haben Sie häufiger Kopfschmerzen?", type: "headache" },
  { name: "Sind Sie anfaellig fuer Erkaeltungen oder Infektionen", text: "Sind Sie anfällig für Erkältungen oder Infektionen?" },
  { name: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion", text: "Haben Sie Probleme mit Ihrer Verdauung oder Darmfunktion?" },
  { name: "Haben Sie Probleme durchzuschlafen", text: "Haben Sie Probleme durchzuschlafen?", type: "frequency" },
  { name: "Wachen Sie morgens haeufig auf ohne richtig erholt zu sein", text: "Wachen Sie morgens häufig auf, ohne richtig erholt zu sein?", type: "frequency" },
  { name: "Haben Sie haeufig Wadenkraempfe oder Morgensteifigkeit", text: "Haben Sie häufig Wadenkrämpfe oder Morgensteifigkeit?" },
  { name: "Sind Sie mit Ihrer Haut Ihren Haaren oder Ihren Naegeln unzufrieden", text: "Sind Sie mit Ihrer Haut, Ihren Haaren oder Ihren Nägeln unzufrieden?", type: "appearance" },
  { name: "Leiden Sie unter Arthrose oder Arthritis", text: "Leiden Sie unter Arthrose oder Arthritis?" },
  { name: "Treiben Sie regelmaessig Sport", text: "Treiben Sie regelmäßig Sport?", type: "sport" },
  { name: "Essen Sie zwei bis dreimal pro Woche frischen Lachs Makrele oder Thunfisch", text: "Essen Sie zwei- bis dreimal pro Woche frischen Lachs, Makrele oder Thunfisch?" },
  { name: "Geschlecht", text: "Welches Geschlecht haben Sie?", type: "gender", options: [
    { value: "männlich", label: "Männlich" },
    { value: "weiblich", label: "Weiblich" }
  ] },
  { name: "Leiden Sie als Frau unter typischen peri oder menopausalen Beschwerden", text: "Leiden Sie unter typischen peri- oder menopausalen Beschwerden?", type: "menopause", gender: "weiblich" },
  { name: "Haben Sie regelmaessig Menstruationsbeschwerden", text: "Haben Sie regelmäßig Menstruationsbeschwerden?", type: "menstruation", gender: "weiblich" },
  { name: "Moechten Sie als Mann Ihren Testosteronspiegel verbessern", text: "Möchten Sie Ihren Testosteronspiegel verbessern?", gender: "männlich", options: [
    { value: "Ja", label: "Ja" },
    { value: "Nein", label: "Nein" }
  ] },
  { name: "Moechten Sie Ihr Gewicht optimieren", text: "Möchten Sie Ihr Gewicht optimieren?", type: "weight" },
  { name: "Gibt es Lebensmittel die Sie nicht vertragen oder aufgrund Ihrer Ernaehrungsform nicht essen", text: "Gibt es Lebensmittel, die Sie nicht vertragen oder aufgrund Ihrer Ernährungsform nicht essen?", type: "intolerance" },
  { name: "Haben Sie Kinder", text: "Haben Sie Kinder?", type: "children" },
  { name: "Haben Sie ein Kind mit Konzentrations oder Aufmerksamkeitsstoerungen", text: "Haben Sie ein Kind mit Konzentrations- oder Aufmerksamkeitsstörungen?", type: "child-attention" },
  { name: "Sind Ihre Augen im Alltag stark beansprucht oder haben Sie Beschwerden beim Sehen", text: "Sind Ihre Augen im Alltag stark beansprucht oder haben Sie Beschwerden beim Sehen?", type: "eyes" },
  { name: "Essen Sie taeglich weniger als fuenf Portionen Obst und Gemuese", text: "Essen Sie täglich weniger als fünf Portionen Obst und Gemüse?" },
  { name: "Essen Sie mehrfach in der Woche Fast Food", text: "Essen Sie mehrfach in der Woche Fast Food?" },
  { name: "Wuerden Sie gerne Ihre Altersflecken reduzieren", text: "Würden Sie gerne Ihre Altersflecken reduzieren?", type: "age-spots" }
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

const FREQUENCY_OPTIONS = [
  { value: "Ja", label: "Ja" },
  { value: "Öfter", label: "Öfter" },
  { value: "Gelegentlich", label: "Gelegentlich" },
  { value: "Nein", label: "Nein" }
];

const PAL_OPTIONS = [
  {
    value: "1,2",
    label: "Wenig oder keine Bewegung bei der Arbeit und beim Sport"
  },
  {
    value: "1,375",
    label: "Leichte Bewegung bei der Arbeit und 1–3× leichtem Freizeitsport pro Woche"
  },
  {
    value: "1,55",
    label: "Körperliche Arbeit und/oder 3–4 sportliche Aktivitäten pro Woche"
  },
  {
    value: "1,8",
    label: "Schwere körperliche Arbeit und/oder 6–7 sportliche Aktivitäten pro Woche"
  }
];

const SPORT_FREQUENCY_OPTIONS = Array.from({ length: 7 }, (_, index) => ({
  value: String(index + 1),
  label: `${index + 1}× pro Woche`
}));

function createOptionCard(questionName, option, required = false) {
  return `
    <label class="option-card">
      <input
        type="radio"
        name="${questionName}"
        value="${option.value}"
        ${required ? "required" : ""}
        ${required ? "data-conditional-required" : ""}
      >
      <span>${option.label}</span>
    </label>
  `;
}

function createCheckboxCard(name, value, label) {
  return `
    <label class="option-card">
      <input type="checkbox" name="${name}" value="${value}">
      <span>${label}</span>
    </label>
  `;
}

function createStepKicker(index) {
  return `<p class="step-kicker">Gesundheitsfrage ${index + 1} von ${questions.length}</p>`;
}

function createStandardQuestion(question, index) {
  const options = question.options || DEFAULT_OPTIONS;
  const genderAttribute = question.gender ? ` data-gender="${question.gender}"` : "";

  return `
    <section
      class="step health-question"
      data-question-type="standard"
      data-auto-advance="true"
      ${genderAttribute}
    >
      ${createStepKicker(index)}

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

function createFrequencyQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="frequency" data-auto-advance="true">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid ${FREQUENCY_OPTIONS.length > 2 ? "frequency-grid" : ""}">
        ${FREQUENCY_OPTIONS.map((option, optionIndex) => createOptionCard(question.name, option, optionIndex === 0)).join("")}
      </div>
    </section>
  `;
}

function createHeadacheQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="headache" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>
      <div class="conditional-box" data-headache-box hidden>
        <p class="conditional-title">Welche Beschreibung passt?</p>
        <div class="choice-grid two">
          ${createOptionCard("Kopfschmerzart", { value: "Migräneartig", label: "Migräneartig" }, true)}
          ${createOptionCard("Kopfschmerzart", { value: "Andere", label: "Andere Kopfschmerzen" })}
        </div>
        <div class="conditional-box nested-box" data-migraine-box hidden>
          <p class="conditional-title">Welche Begleiterscheinungen treten auf?</p>
          <div class="choice-grid two">
            ${createCheckboxCard("Kopfschmerz Begleiterscheinung", "Aura", "Aura")}
            ${createCheckboxCard("Kopfschmerz Begleiterscheinung", "Übelkeit", "Übelkeit")}
            ${createCheckboxCard("Kopfschmerz Begleiterscheinung", "Lichtempfindlichkeit", "Lichtempfindlichkeit")}
          </div>
        </div>
        <div class="nested-box" data-other-headache-box hidden>
          <label>
            Andere Beschreibung
            <input type="text" name="Andere Kopfschmerzen" data-conditional-required>
          </label>
        </div>
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
      ${createStepKicker(index)}

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
              ${PAL_OPTIONS.map(option => `<option value="${option.value}">${option.label}</option>`).join("")}
            </select>
          </label>
        </div>
      </div>
    </section>
  `;
}

function createAppearanceQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="appearance" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>
      <div class="conditional-box" data-appearance-box hidden>
        <p class="conditional-title">Womit sind Sie unzufrieden? Mehrfachauswahl möglich.</p>
        <div class="choice-grid three-choice" data-min-checked="1">
          ${createCheckboxCard("Haut Haare Naegel", "Haare", "Haare")}
          ${createCheckboxCard("Haut Haare Naegel", "Nägel", "Nägel")}
          ${createCheckboxCard("Haut Haare Naegel", "Haut", "Haut")}
        </div>
      </div>
    </section>
  `;
}

function createSportQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="sport" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>
      <div class="conditional-box" data-sport-box hidden>
        <label>
          Wie oft pro Woche?
          <select name="Sporthaeufigkeit" data-conditional-required>
            <option value="">Bitte auswählen</option>
            ${SPORT_FREQUENCY_OPTIONS.map(option => `<option value="${option.value}">${option.label}</option>`).join("")}
          </select>
        </label>
      </div>
    </section>
  `;
}

function createMenopauseQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="menopause" data-auto-advance="conditional" data-gender="weiblich">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid frequency-grid">
        ${FREQUENCY_OPTIONS.map((option, optionIndex) => createOptionCard(question.name, option, optionIndex === 0)).join("")}
      </div>
      <div class="conditional-box" data-menopause-box hidden>
        <p class="conditional-title">Welche Beschwerden bestehen?</p>
        <div class="choice-grid two">
          ${createCheckboxCard("Menopause Beschwerden", "Brain fog", "Brain fog")}
          ${createCheckboxCard("Menopause Beschwerden", "Hitzewallungen", "Hitzewallungen")}
          ${createCheckboxCard("Menopause Beschwerden", "Schlafstörung", "Schlafstörung")}
          ${createCheckboxCard("Menopause Beschwerden", "Haut", "Haut")}
        </div>
        <label>
          Andere Beschwerden
          <input type="text" name="Andere Menopause Beschwerden">
        </label>
      </div>
    </section>
  `;
}

function createMenstruationQuestion(question, index) {
  const options = [
    { value: "Ja", label: "Ja" },
    { value: "Öfter", label: "Öfter" },
    { value: "Gelegentlich", label: "Gelegentlich" },
    { value: "Nein", label: "Nein" }
  ];

  return `
    <section class="step health-question" data-question-type="standard" data-auto-advance="true" data-gender="weiblich">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid frequency-grid">
        ${options.map((option, optionIndex) => createOptionCard(question.name, option, optionIndex === 0)).join("")}
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
      ${createStepKicker(index)}

      <h2>${question.text}</h2>

      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>

      <div class="conditional-box" data-intolerance-box hidden>
        <p class="conditional-title">Welche Ernährungsform oder Unverträglichkeit liegt vor?</p>
        <div class="choice-grid two" data-require-option-or-text>
          ${createCheckboxCard("Ernaehrungsform oder Unvertraeglichkeit", "Vegan", "Vegan")}
          ${createCheckboxCard("Ernaehrungsform oder Unvertraeglichkeit", "Vegetarisch", "Vegetarisch")}
          ${createCheckboxCard("Ernaehrungsform oder Unvertraeglichkeit", "Lactovegetarisch", "Lactovegetarisch")}
          ${createCheckboxCard("Ernaehrungsform oder Unvertraeglichkeit", "Pesco-vegetarisch", "Pesco-vegetarisch")}
        </div>
        <label>
          Andere Angabe oder Allergie
          <input type="text" name="Lebensmittel Unvertraeglichkeiten" data-intolerance-other>
        </label>
      </div>
    </section>
  `;
}

function createChildrenQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="children" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>
      <div class="conditional-box" data-children-box hidden>
        <div class="grid">
          <label>
            Kinder bis 12 Jahre
            <input type="number" name="Kinder bis 12 Jahre" min="0" max="20" step="1">
          </label>
          <label>
            Kinder über 12 Jahre
            <input type="number" name="Kinder ueber 12 Jahre" min="0" max="20" step="1">
          </label>
        </div>
        <p class="conditional-title">Treiben die Kinder Sport?</p>
        <div class="choice-grid two">
          ${createOptionCard("Kinder treiben Sport", { value: "Ja", label: "Ja" }, true)}
          ${createOptionCard("Kinder treiben Sport", { value: "Nein", label: "Nein" })}
        </div>
        <div class="nested-box" data-children-sport-box hidden>
          <label>
            Wie oft pro Woche?
            <select name="Kinder Sporthaeufigkeit" data-conditional-required>
              <option value="">Bitte auswählen</option>
              ${SPORT_FREQUENCY_OPTIONS.map(option => `<option value="${option.value}">${option.label}</option>`).join("")}
              <option value="Mehr als 7× pro Woche">Mehr als 7× pro Woche</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  `;
}

function createChildAttentionQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="child-attention" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid two">
        ${createOptionCard(question.name, { value: "Ja", label: "Ja" }, true)}
        ${createOptionCard(question.name, { value: "Nein", label: "Nein" })}
      </div>
      <div class="conditional-box" data-child-attention-box hidden>
        <div class="grid">
          <label>
            Betroffene Kinder bis 12 Jahre
            <input type="number" name="ADHS Kinder bis 12 Jahre" min="0" max="20" step="1" data-conditional-required>
          </label>
          <label>
            Betroffene Kinder über 12 Jahre
            <input type="number" name="ADHS Kinder ueber 12 Jahre" min="0" max="20" step="1" data-conditional-required>
          </label>
        </div>
      </div>
    </section>
  `;
}

function createEyesQuestion(question, index) {
  return `
    <section class="step health-question" data-question-type="eyes" data-auto-advance="conditional">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid frequency-grid">
        ${FREQUENCY_OPTIONS.map((option, optionIndex) => createOptionCard(question.name, option, optionIndex === 0)).join("")}
      </div>
      <div class="conditional-box" data-eyes-box hidden>
        <p class="conditional-title">Welche Beschwerden bestehen?</p>
        <label class="consent"><input type="checkbox" name="Augen Beschwerden" value="Müde, trockene oder brennende Augen"><span>Müde, trockene oder brennende Augen</span></label>
        <label class="consent"><input type="checkbox" name="Augen Beschwerden" value="Schwierigkeiten bei Dämmerung oder Dunkelheit"><span>Schwierigkeiten bei Dämmerung oder Dunkelheit</span></label>
        <label class="consent"><input type="checkbox" name="Augen Beschwerden" value="Starke Blendempfindlichkeit"><span>Starke Blendempfindlichkeit</span></label>
      </div>
    </section>
  `;
}

function createAgeSpotsQuestion(question, index) {
  const options = [
    { value: "Ja", label: "Ja" },
    { value: "Nein", label: "Nein" },
    { value: "Habe keine Altersflecken", label: "Ich habe keine Altersflecken" }
  ];

  return `
    <section class="step health-question" data-question-type="standard" data-auto-advance="true">
      ${createStepKicker(index)}
      <h2>${question.text}</h2>
      <div class="choice-grid ${options.length > 2 ? "frequency-grid" : ""}">
        ${options.map((option, optionIndex) => createOptionCard(question.name, option, optionIndex === 0)).join("")}
      </div>
    </section>
  `;
}

function renderQuestions() {
  questionSteps.innerHTML = questions
    .map((question, index) => {
      const renderers = {
        weight: createWeightQuestion,
        intolerance: createIntoleranceQuestion,
        frequency: createFrequencyQuestion,
        headache: createHeadacheQuestion,
        appearance: createAppearanceQuestion,
        sport: createSportQuestion,
        menopause: createMenopauseQuestion,
        menstruation: createMenstruationQuestion,
        children: createChildrenQuestion,
        "child-attention": createChildAttentionQuestion,
        eyes: createEyesQuestion,
        "age-spots": createAgeSpotsQuestion
      };

      return (renderers[question.type] || createStandardQuestion)(question, index);
    })
    .join("");
}

renderQuestions();

const steps = [...document.querySelectorAll(".step")];
let currentStep = 0;
let autoAdvanceTimer = null;

function getSelectedGender() {
  return form.elements["Geschlecht"]?.value || "";
}

function updateGenderVisibility() {
  const gender = getSelectedGender();

  steps.forEach(step => {
    const requiredGender = step.dataset.gender;

    if (!requiredGender) {
      return;
    }

    const visible = requiredGender === gender;
    step.hidden = !visible;
    updateConditionalRequirement(step, visible);

    if (!visible) {
      step.querySelectorAll("input, select, textarea").forEach(field => {
        if (field.type === "radio" || field.type === "checkbox") {
          field.checked = false;
        } else {
          field.value = "";
        }
      });
    }
  });

  updateHealthQuestionLabels();
}

function updateChildrenVisibility() {
  const hasChildren = form.elements["Haben Sie Kinder"]?.value === "Ja";
  const attentionStep = steps.find(
    step => step.dataset.questionType === "child-attention"
  );

  if (!attentionStep) {
    return;
  }

  attentionStep.hidden = !hasChildren;

  if (!hasChildren) {
    resetConditionalFields(attentionStep);
  }

  updateHealthQuestionLabels();
}

function updateHealthQuestionLabels() {
  const visibleHealthSteps = steps.filter(
    step => step.classList.contains("health-question") && !step.hidden
  );

  visibleHealthSteps.forEach((step, index) => {
    const kicker = step.querySelector(".step-kicker");

    if (kicker) {
      kicker.textContent = `Gesundheitsfrage ${index + 1} von ${visibleHealthSteps.length}`;
    }
  });
}

function findVisibleStep(start, direction) {
  let index = start;

  while (index >= 0 && index < steps.length && steps[index].hidden) {
    index += direction;
  }

  return index;
}

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

function clearHiddenConditionalRequirements() {
  document
    .querySelectorAll(".conditional-box[hidden], .nested-box[hidden]")
    .forEach(resetConditionalFields);
}

function getInvalidFieldDescription(field) {
  const heading = field
    .closest(".step")
    ?.querySelector("h2")
    ?.textContent.replace(/\s+/g, " ")
    .trim();

  return heading || field.name || "Pflichtfeld";
}

function validateMinimumSelections(step) {
  const containers = [...step.querySelectorAll("[data-min-checked]")]
    .filter(container => !container.closest("[hidden]"));

  for (const container of containers) {
    const minimum = Number(container.dataset.minChecked || 1);
    const selected = container.querySelectorAll('input[type="checkbox"]:checked').length;

    if (selected < minimum) {
      showError("Bitte wählen Sie mindestens eine passende Antwort aus.");
      return false;
    }
  }

  const flexibleChoices = [...step.querySelectorAll("[data-require-option-or-text]")]
    .filter(container => !container.closest("[hidden]"));

  for (const container of flexibleChoices) {
    const selected = container.querySelectorAll('input[type="checkbox"]:checked').length;
    const other = step.querySelector("[data-intolerance-other]")?.value.trim();

    if (selected === 0 && !other) {
      showError("Bitte wählen Sie mindestens eine passende Antwort aus oder tragen Sie eine Angabe ein.");
      return false;
    }
  }

  return true;
}

function validateChildrenAgeCounts(step) {
  if (step.dataset.questionType !== "children") {
    return true;
  }

  if (form.elements["Haben Sie Kinder"]?.value !== "Ja") {
    return true;
  }

  const ageFields = [
    step.querySelector('[name="Kinder bis 12 Jahre"]'),
    step.querySelector('[name="Kinder ueber 12 Jahre"]')
  ].filter(Boolean);

  if (ageFields.some(field => field.value.trim() !== "")) {
    return true;
  }

  showError("Bitte geben Sie bei mindestens einer Altersgruppe die Kinderzahl an.");
  ageFields[0]?.focus();
  return false;
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

  if (!validateMinimumSelections(step)) {
    return false;
  }

  if (!validateChildrenAgeCounts(step)) {
    return false;
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
    step.classList.toggle("active", index === currentStep && !step.hidden);
  });

  const visibleSteps = steps.filter(step => !step.hidden);
  const visiblePosition = Math.max(0, visibleSteps.indexOf(steps[currentStep]));
  const total = visibleSteps.length;
  const percent =
    total > 1 ? Math.round((visiblePosition / (total - 1)) * 100) : 100;

  stepText.textContent = `Schritt ${visiblePosition + 1} von ${total}`;
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

  const next = findVisibleStep(currentStep + 1, 1);

  if (next < steps.length) {
    currentStep = next;
    updateWizard();
  }
}

function prevStep() {
  const previous = findVisibleStep(currentStep - 1, -1);

  if (previous >= 0) {
    currentStep = previous;
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
  if (field.name !== "Gibt es Lebensmittel die Sie nicht vertragen oder aufgrund Ihrer Ernaehrungsform nicht essen") {
    return false;
  }

  const intoleranceBox = step.querySelector("[data-intolerance-box]");
  const isYes = field.value === "Ja";

  intoleranceBox.hidden = !isYes;
  updateConditionalRequirement(intoleranceBox, isYes);

  if (isYes) {
    clearError();
    return true;
  }

  resetConditionalFields(intoleranceBox);
  scheduleNextStep();
  return true;
}

function toggleConditionalBox(box, active) {
  if (!box) return;
  box.hidden = !active;
  updateConditionalRequirement(box, active);
}

function handleHeadacheQuestion(field, step) {
  const box = step.querySelector("[data-headache-box]");
  if (!box) return false;

  if (field.name === "Haben Sie haeufiger Kopfschmerzen") {
    const active = field.value === "Ja";
    toggleConditionalBox(box, active);
    if (active) {
      clearError();
    } else {
      resetConditionalFields(box);
      scheduleNextStep();
    }
    return true;
  }

  if (field.name === "Kopfschmerzart") {
    const migraine = step.querySelector("[data-migraine-box]");
    const other = step.querySelector("[data-other-headache-box]");
    const isMigraine = field.value === "Migräneartig";
    toggleConditionalBox(migraine, isMigraine);
    toggleConditionalBox(other, !isMigraine);
    if (isMigraine) resetConditionalFields(other);
    if (!isMigraine) resetConditionalFields(migraine);
    return true;
  }

  return false;
}

function handleAppearanceQuestion(field, step) {
  if (field.name !== "Sind Sie mit Ihrer Haut Ihren Haaren oder Ihren Naegeln unzufrieden") {
    return false;
  }

  const box = step.querySelector("[data-appearance-box]");
  const active = field.value === "Ja";
  toggleConditionalBox(box, active);

  if (!active) {
    resetConditionalFields(box);
    scheduleNextStep();
  } else {
    clearError();
  }

  return true;
}

function handleSportQuestion(field, step) {
  if (field.name !== "Treiben Sie regelmaessig Sport") {
    return false;
  }

  const box = step.querySelector("[data-sport-box]");
  const active = field.value === "Ja";
  toggleConditionalBox(box, active);

  if (!active) {
    resetConditionalFields(box);
    scheduleNextStep();
  } else {
    clearError();
  }

  return true;
}

function handleMenopauseQuestion(field, step) {
  if (field.name !== "Leiden Sie als Frau unter typischen peri oder menopausalen Beschwerden") {
    return false;
  }

  const box = step.querySelector("[data-menopause-box]");
  const active = field.value === "Ja" || field.value === "Öfter";
  toggleConditionalBox(box, active);

  if (!active) {
    resetConditionalFields(box);
    scheduleNextStep();
  } else {
    clearError();
  }

  return true;
}

function handleChildrenQuestion(field, step) {
  const box = step.querySelector("[data-children-box]");
  if (!box) return false;

  if (field.name === "Haben Sie Kinder") {
    const active = field.value === "Ja";
    toggleConditionalBox(box, active);
    updateChildrenVisibility();

    if (!active) {
      resetConditionalFields(box);
      scheduleNextStep();
    } else {
      clearError();
    }
    return true;
  }

  if (field.name === "Kinder treiben Sport") {
    const sportBox = step.querySelector("[data-children-sport-box]");
    const active = field.value === "Ja";
    toggleConditionalBox(sportBox, active);
    if (!active) {
      resetConditionalFields(sportBox);
      scheduleNextStep();
    }
    return true;
  }

  return false;
}

function handleChildAttentionQuestion(field, step) {
  if (field.name !== "Haben Sie ein Kind mit Konzentrations oder Aufmerksamkeitsstoerungen") {
    return false;
  }

  const box = step.querySelector("[data-child-attention-box]");
  const active = field.value === "Ja";
  toggleConditionalBox(box, active);

  if (!active) {
    resetConditionalFields(box);
    scheduleNextStep();
  }

  return true;
}

function handleEyesQuestion(field, step) {
  if (field.name !== "Sind Ihre Augen im Alltag stark beansprucht oder haben Sie Beschwerden beim Sehen") {
    return false;
  }

  const box = step.querySelector("[data-eyes-box]");
  const active = field.value === "Ja" || field.value === "Öfter";
  toggleConditionalBox(box, active);

  if (!active) {
    resetConditionalFields(box);
    scheduleNextStep();
  }

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

  if (field.name === "Gutscheincode") {
    field.value = field.value.replace(/\D/g, "").slice(0, 6);
  }
});

form.addEventListener("change", event => {
  const field = event.target;
  const step = field.closest(".step");

  if (!step) {
    return;
  }

  if (field.name === "Wohlbefinden pro Tag") {
    const otherField = step.querySelector(".investment-other");
    const input = step.querySelector("[data-investment-other-field]");
    const active = field.value === "Anderer Betrag";

    if (otherField && input) {
      otherField.hidden = !active;
      input.required = active;
      if (active) {
        input.focus();
      } else {
        input.value = "";
      }
    }

    return;
  }

  if (field.name === "Geschlecht") {
    updateGenderVisibility();
    scheduleNextStep();
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

  if (questionType === "headache" && handleHeadacheQuestion(field, step)) {
    return;
  }

  if (questionType === "appearance" && handleAppearanceQuestion(field, step)) {
    return;
  }

  if (questionType === "sport" && handleSportQuestion(field, step)) {
    return;
  }

  if (questionType === "menopause" && handleMenopauseQuestion(field, step)) {
    return;
  }

  if (questionType === "children" && handleChildrenQuestion(field, step)) {
    return;
  }

  if (
    questionType === "child-attention" &&
    handleChildAttentionQuestion(field, step)
  ) {
    return;
  }

  if (questionType === "eyes" && handleEyesQuestion(field, step)) {
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
  [0, 4999, "Christian Kühne", "Berater"],
  [5000, 9999, "Ernährungsberatung.Kuehne", "Berater"],
  [10000, 14999, "Marcel Lorenz", "Berater"],
  [15000, 19999, "Christopher Reis", "Berater"],
  [20000, 24999, "Giulia Kümmel", "Berater"],
  [25000, 29999, "Christoph Mettler", "Berater"],
  [30000, 34999, "Petra Schreiber", "Berater"],
  [35000, 39999, "Andre Nelamischkies", "Berater"],
  [40000, 44999, "Klaus Altersberger", "Berater"],
  [50000, 54999, "Johannes Klein", "Berater"],
  [55000, 59999, "Adriana Erz", "Berater"],
  [60000, 64999, "Martin Hoffmann", "Berater"],
  [65000, 69999, "Christiane Decker-Kümmel", "Berater"],
  [70000, 74999, "Christoph Klein", "Berater"],
  [75000, 79999, "Lutz Lorenz", "Berater"],
  [80000, 84999, "Florian Lorenz", "Berater"],
  [85000, 89999, "Tim Lorenz", "Berater"],
  [90000, 94999, "Julien Lorenz", "Berater"],
  [95000, 99999, "Brigitte Lorenz", "Berater"],
  [100000, 104999, "Brigitte Hänle", "Berater"],
  [105000, 109999, "Hana Neubauer", "Berater"],
  [110000, 114999, "Marco Ahlgrimm", "Berater"],
  [115000, 119999, "Andrea Diehl", "Berater"],
  [120000, 124999, "Manuel Erdmann", "Berater"],
  [125000, 129999, "Kevin Kralj", "Berater"],
  [130000, 134999, "Carsten Borstel", "Berater"],
  [135000, 139999, "Anja Ihme", "Berater"],
  [140000, 144999, "Elisa Ihme", "Berater"],
  [145000, 149999, "Mirko Soltau", "Berater"]
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
  if (form.elements["Geschlecht"]?.value === "männlich") {
    return "Herr";
  }

  if (form.elements["Geschlecht"]?.value === "weiblich") {
    return "Frau";
  }

  return "Frau/Herr";
}

async function sendConfirmationEmail(form) {
  const partner = getVoucherPartner(form.elements["Gutscheincode"]?.value);
  const data = new FormData();

  data.set("access_key", confirmationAccessKey);
  data.set("email", form.elements.email?.value?.trim() || "");
  data.set("Anrede", getCustomerSalutation(form));
  data.set("Kundenname", form.elements["Nachname"]?.value?.trim() || "");
  data.set(
    "Beratertext",
    partner
      ? `Ihr zuständiger Vitalcheck-Berater ${partner.name} wird Ihnen die Auswertung in Ruhe in einem persönlichen Gespräch erklären und Sie beraten.`
      : "Ihr zuständiger Vitalcheck-Berater wird Ihnen die Auswertung in Ruhe in einem persönlichen Gespräch erklären und Sie beraten."
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

  clearHiddenConditionalRequirements();

  if (!form.checkValidity()) {
    const invalidField = [...form.querySelectorAll("input, select, textarea")].find(
      field => !field.checkValidity() && !field.closest("[hidden]")
    );

    if (invalidField) {
      showError(`Bitte prüfen Sie Ihre Angabe bei: ${getInvalidFieldDescription(invalidField)}.`);
      invalidField.focus();
      invalidField.reportValidity();
    } else {
      showError("Bitte prüfen Sie Ihre Angaben.");
      form.reportValidity();
    }
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
  updateGenderVisibility();
  updateChildrenVisibility();
  clearHiddenConditionalRequirements();
  updateWizard();

  window.setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, 10);
});
