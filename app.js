const STORAGE_KEY = "finance-dashboard-ui-state-v1";
const STARTING_BALANCE = 12840;
const CURRENCY = "USD";

const CATEGORY_COLORS = {
  Housing: "#C98D2D",
  Groceries: "#0D7C7A",
  Utilities: "#5885AF",
  Transport: "#D97757",
  Entertainment: "#B76D68",
  Healthcare: "#7B9E5F",
  Salary: "#1E8D57",
  Freelance: "#5D9CEC",
  Insurance: "#8B7AA8",
};

const SEED_TRANSACTIONS = [
  { id: "tx-001", date: "2026-01-03", title: "Salary deposit", amount: 5200, category: "Salary", type: "income", account: "Main checking" },
  { id: "tx-002", date: "2026-01-05", title: "January rent", amount: 1600, category: "Housing", type: "expense", account: "Home transfer" },
  { id: "tx-003", date: "2026-01-09", title: "FreshMart grocery run", amount: 342.58, category: "Groceries", type: "expense", account: "Visa ending 4821" },
  { id: "tx-004", date: "2026-01-12", title: "Power and internet", amount: 118.64, category: "Utilities", type: "expense", account: "Autopay bundle" },
  { id: "tx-005", date: "2026-01-16", title: "Freelance product audit", amount: 860, category: "Freelance", type: "income", account: "Client transfer" },
  { id: "tx-006", date: "2026-01-22", title: "Metro and rideshare", amount: 96.25, category: "Transport", type: "expense", account: "Transit wallet" },
  { id: "tx-007", date: "2026-01-28", title: "Team dinner", amount: 145.1, category: "Entertainment", type: "expense", account: "Visa ending 4821" },
  { id: "tx-008", date: "2026-02-03", title: "Salary deposit", amount: 5200, category: "Salary", type: "income", account: "Main checking" },
  { id: "tx-009", date: "2026-02-05", title: "February rent", amount: 1600, category: "Housing", type: "expense", account: "Home transfer" },
  { id: "tx-010", date: "2026-02-11", title: "FreshMart grocery run", amount: 358.92, category: "Groceries", type: "expense", account: "Visa ending 4821" },
  { id: "tx-011", date: "2026-02-17", title: "Health insurance premium", amount: 91.25, category: "Insurance", type: "expense", account: "Autopay" },
  { id: "tx-012", date: "2026-02-24", title: "Clinic visit", amount: 88.4, category: "Healthcare", type: "expense", account: "HSA card" },
  { id: "tx-013", date: "2026-03-03", title: "Salary deposit", amount: 5200, category: "Salary", type: "income", account: "Main checking" },
  { id: "tx-014", date: "2026-03-05", title: "March rent", amount: 1600, category: "Housing", type: "expense", account: "Home transfer" },
  { id: "tx-015", date: "2026-03-09", title: "FreshMart grocery run", amount: 411.36, category: "Groceries", type: "expense", account: "Visa ending 4821" },
  { id: "tx-016", date: "2026-03-15", title: "Freelance design sprint", amount: 640, category: "Freelance", type: "income", account: "Client transfer" },
  { id: "tx-017", date: "2026-03-18", title: "Weekend trip tickets", amount: 281.2, category: "Entertainment", type: "expense", account: "Travel wallet" },
  { id: "tx-018", date: "2026-03-23", title: "Utilities bundle", amount: 132.18, category: "Utilities", type: "expense", account: "Autopay bundle" },
  { id: "tx-019", date: "2026-04-03", title: "Salary deposit", amount: 5200, category: "Salary", type: "income", account: "Main checking" },
  { id: "tx-020", date: "2026-04-05", title: "April rent", amount: 1600, category: "Housing", type: "expense", account: "Home transfer" },
  { id: "tx-021", date: "2026-04-08", title: "FreshMart grocery run", amount: 387.14, category: "Groceries", type: "expense", account: "Visa ending 4821" },
  { id: "tx-022", date: "2026-04-11", title: "Metro and parking", amount: 112.74, category: "Transport", type: "expense", account: "Transit wallet" },
  { id: "tx-023", date: "2026-04-18", title: "Mobile and internet", amount: 124.86, category: "Utilities", type: "expense", account: "Autopay bundle" },
  { id: "tx-024", date: "2026-04-20", title: "Dental checkup", amount: 148.9, category: "Healthcare", type: "expense", account: "HSA card" },
];

const defaultState = () => ({
  role: "viewer",
  theme: "light",
  filters: {
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sort: "date-desc",
  },
  modal: {
    isOpen: false,
    mode: "add",
    transactionId: null,
  },
  transactions: cloneTransactions(SEED_TRANSACTIONS),
});

let state = loadState();

const elements = {
  summaryCards: document.getElementById("summaryCards"),
  trendChart: document.getElementById("trendChart"),
  trendMeta: document.getElementById("trendMeta"),
  breakdownChart: document.getElementById("breakdownChart"),
  insightsCards: document.getElementById("insightsCards"),
  transactionMeta: document.getElementById("transactionMeta"),
  transactionsBody: document.getElementById("transactionsBody"),
  roleBanner: document.getElementById("roleBanner"),
  appliedFilters: document.getElementById("appliedFilters"),
  emptyState: document.getElementById("emptyState"),
  tableShell: document.getElementById("tableShell"),
  roleSelect: document.getElementById("roleSelect"),
  themeToggle: document.getElementById("themeToggle"),
  exportButton: document.getElementById("exportButton"),
  resetButton: document.getElementById("resetButton"),
  addTransactionButton: document.getElementById("addTransactionButton"),
  searchInput: document.getElementById("searchInput"),
  typeFilter: document.getElementById("typeFilter"),
  categoryFilter: document.getElementById("categoryFilter"),
  monthFilter: document.getElementById("monthFilter"),
  sortFilter: document.getElementById("sortFilter"),
  clearFiltersButton: document.getElementById("clearFiltersButton"),
  emptyStateReset: document.getElementById("emptyStateReset"),
  transactionModal: document.getElementById("transactionModal"),
  modalTitle: document.getElementById("modalTitle"),
  closeModalButton: document.getElementById("closeModalButton"),
  cancelModalButton: document.getElementById("cancelModalButton"),
  transactionForm: document.getElementById("transactionForm"),
  transactionId: document.getElementById("transactionId"),
  titleInput: document.getElementById("titleInput"),
  dateInput: document.getElementById("dateInput"),
  amountInput: document.getElementById("amountInput"),
  categoryInput: document.getElementById("categoryInput"),
  typeInput: document.getElementById("typeInput"),
  accountInput: document.getElementById("accountInput"),
};

initialize();

function initialize() {
  applyTheme();
  bindEvents();
  render();
}

function bindEvents() {
  elements.roleSelect.addEventListener("change", (event) => {
    state.role = event.target.value;
    closeModal();
    persistState();
    render();
  });

  elements.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    persistState();
    applyTheme();
    render();
  });

  elements.exportButton.addEventListener("click", exportData);

  elements.resetButton.addEventListener("click", () => {
    if (!window.confirm("Reset the dashboard back to the original demo dataset?")) {
      return;
    }

    state = defaultState();
    persistState();
    applyTheme();
    render();
  });

  elements.addTransactionButton.addEventListener("click", () => {
    if (state.role !== "admin") {
      return;
    }

    openModal("add");
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value.trimStart();
    persistState();
    renderTransactions();
    renderInsights();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    persistState();
    renderTransactions();
    renderInsights();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    state.filters.category = event.target.value;
    persistState();
    renderTransactions();
    renderInsights();
    renderBreakdown();
  });

  elements.monthFilter.addEventListener("change", (event) => {
    state.filters.month = event.target.value;
    persistState();
    renderTransactions();
    renderInsights();
  });

  elements.sortFilter.addEventListener("change", (event) => {
    state.filters.sort = event.target.value;
    persistState();
    renderTransactions();
  });

  elements.clearFiltersButton.addEventListener("click", resetFilters);
  elements.emptyStateReset.addEventListener("click", resetFilters);
  elements.closeModalButton.addEventListener("click", closeModal);
  elements.cancelModalButton.addEventListener("click", closeModal);

  elements.transactionModal.addEventListener("click", (event) => {
    if (event.target === elements.transactionModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.modal.isOpen) {
      closeModal();
    }
  });

  elements.transactionForm.addEventListener("submit", handleTransactionSubmit);

  elements.transactionsBody.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger || state.role !== "admin") {
      return;
    }

    const { action, id } = trigger.dataset;
    if (action === "edit") {
      openModal("edit", id);
    }

    if (action === "delete") {
      deleteTransaction(id);
    }
  });

  elements.breakdownChart.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category-chip]");
    if (!button) {
      return;
    }

    state.filters.category = button.dataset.categoryChip;
    persistState();
    renderTransactions();
    renderInsights();
    renderBreakdown();
  });
}

function render() {
  syncControls();
  renderSummary();
  renderTrend();
  renderBreakdown();
  renderTransactions();
  renderInsights();
  renderRoleBanner();
  renderModal();
}

function syncControls() {
  elements.roleSelect.value = state.role;
  elements.searchInput.value = state.filters.search;
  elements.typeFilter.value = state.filters.type;
  elements.sortFilter.value = state.filters.sort;
  elements.addTransactionButton.disabled = state.role !== "admin";
  elements.addTransactionButton.title =
    state.role === "admin" ? "Add a new transaction" : "Switch to Admin to add or edit transactions";
  elements.themeToggle.textContent =
    state.theme === "light" ? "Switch to Dark" : "Switch to Light";

  renderCategoryFilterOptions();
  renderMonthFilterOptions();

  elements.categoryFilter.value = state.filters.category;
  elements.monthFilter.value = state.filters.month;
}

function renderSummary() {
  const overview = getOverviewMetrics(state.transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(overview.balance),
      footnote: `${formatCurrency(overview.net)} net cash flow across ${overview.monthCount} months`,
      pillLabel: overview.net >= 0 ? "Ahead of plan" : "Needs attention",
      pillTone: overview.net >= 0 ? "positive" : "negative",
    },
    {
      label: "Income",
      value: formatCurrency(overview.income),
      footnote: `${overview.incomeCount} incoming transactions recorded`,
      pillLabel: "Cash in",
      pillTone: "positive",
    },
    {
      label: "Expenses",
      value: formatCurrency(overview.expenses),
      footnote: `${formatCurrency(overview.avgExpense)} average outgoing payment`,
      pillLabel: "Cash out",
      pillTone: "negative",
    },
    {
      label: "Savings Rate",
      value: `${overview.savingsRate}%`,
      footnote: `${overview.topExpenseCategory} remains the largest expense category`,
      pillLabel: overview.savingsRate >= 35 ? "Healthy buffer" : "Tighter month",
      pillTone: overview.savingsRate >= 35 ? "positive" : "neutral",
    },
  ];

  elements.summaryCards.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <p class="metric-label">${escapeHtml(card.label)}</p>
          <p class="metric-value">${escapeHtml(card.value)}</p>
          <span class="metric-pill ${card.pillTone}">${escapeHtml(card.pillLabel)}</span>
          <p class="metric-footnote">${escapeHtml(card.footnote)}</p>
        </article>
      `
    )
    .join("");
}

function renderTrend() {
  const monthlyTrend = getMonthlyTrend(state.transactions);

  if (monthlyTrend.length === 0) {
    elements.trendMeta.textContent = "No monthly data available yet.";
    elements.trendChart.innerHTML = renderChartEmptyState("Add transactions to see a balance trend.");
    return;
  }

  elements.trendMeta.textContent = `${monthlyTrend[0].fullLabel} to ${monthlyTrend.at(-1).fullLabel}`;

  const width = 640;
  const height = 280;
  const padding = 36;
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const balances = monthlyTrend.map((entry) => entry.balance);
  const minBalance = Math.min(...balances);
  const maxBalance = Math.max(...balances);
  const range = Math.max(maxBalance - minBalance, 1);

  const points = monthlyTrend.map((entry, index) => {
    const x = padding + (index * innerWidth) / Math.max(monthlyTrend.length - 1, 1);
    const y = height - padding - ((entry.balance - minBalance) / range) * innerHeight;
    return { ...entry, x, y };
  });

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points.at(-1).x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  const guideValues = Array.from({ length: 4 }, (_, index) => minBalance + (range / 3) * index).reverse();

  elements.trendChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart of balance trend by month">
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.35"></stop>
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.02"></stop>
        </linearGradient>
      </defs>

      ${guideValues
        .map((value) => {
          const y = height - padding - ((value - minBalance) / range) * innerHeight;
          return `
            <line class="grid-line" x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}"></line>
            <text class="grid-label" x="${padding}" y="${y - 8}">${formatCurrency(value, 0)}</text>
          `;
        })
        .join("")}

      <path class="trend-area" d="${areaPath}"></path>
      <path class="trend-path" d="${linePath}"></path>

      ${points
        .map(
          (point) => `
            <circle class="trend-dot" cx="${point.x}" cy="${point.y}" r="5.5">
              <title>${point.fullLabel}: ${formatCurrency(point.balance)}</title>
            </circle>
            <text class="axis-label" x="${point.x}" y="${height - 10}" text-anchor="middle">${point.shortLabel}</text>
          `
        )
        .join("")}
    </svg>
    <div class="trend-stats">
      ${monthlyTrend
        .map(
          (entry) => `
            <div class="mini-stat">
              <span class="metric-label">${entry.shortLabel}</span>
              <strong>${formatCurrency(entry.balance)}</strong>
              <span class="metric-label">${entry.net >= 0 ? "+" : ""}${formatCurrency(entry.net)}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderBreakdown() {
  const breakdown = getExpenseBreakdown(state.transactions);

  if (breakdown.length === 0) {
    elements.breakdownChart.innerHTML = renderChartEmptyState("Expense categories will appear here once data is available.");
    return;
  }

  const totalExpenses = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  const segments = breakdown
    .map((item) => {
      const segmentLength = (item.amount / totalExpenses) * circumference;
      const segment = `
        <circle
          cx="90"
          cy="90"
          r="${radius}"
          fill="none"
          stroke="${item.color}"
          stroke-width="22"
          stroke-linecap="round"
          stroke-dasharray="${segmentLength} ${circumference}"
          stroke-dashoffset="${-offset}"
          transform="rotate(-90 90 90)"
        >
          <title>${item.category}: ${formatCurrency(item.amount)}</title>
        </circle>
      `;
      offset += segmentLength;
      return segment;
    })
    .join("");

  elements.breakdownChart.innerHTML = `
    <div class="donut-shell">
      <svg viewBox="0 0 180 180" role="img" aria-label="Donut chart showing expense categories">
        <circle cx="90" cy="90" r="${radius}" fill="none" stroke="var(--line)" stroke-width="22"></circle>
        ${segments}
        <text class="donut-center donut-total" x="90" y="84">Total Spend</text>
        <text class="donut-center donut-amount" x="90" y="106">${formatCurrency(totalExpenses, 0)}</text>
      </svg>
    </div>

    <div class="breakdown-list">
      ${breakdown
        .map(
          (item) => `
            <button
              class="breakdown-button ${state.filters.category === item.category ? "is-active" : ""}"
              data-category-chip="${escapeHtml(item.category)}"
              type="button"
            >
              <span class="swatch" style="background:${item.color}"></span>
              <span>
                <span class="breakdown-name">${escapeHtml(item.category)}</span>
                <span class="breakdown-meta">${escapeHtml(`${item.share}% of expense volume`)}</span>
              </span>
              <span class="breakdown-amount">${escapeHtml(formatCurrency(item.amount))}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTransactions() {
  const filteredTransactions = getFilteredTransactions();
  const visibleExpenses = filteredTransactions.filter((transaction) => transaction.type === "expense");
  const visibleTotal = filteredTransactions.reduce(
    (sum, transaction) => sum + (transaction.type === "income" ? transaction.amount : -transaction.amount),
    0
  );

  elements.transactionMeta.textContent = `${filteredTransactions.length} transactions in view • ${formatCurrency(visibleTotal)} net`;

  renderAppliedFilters();

  if (filteredTransactions.length === 0) {
    elements.tableShell.classList.add("hidden");
    elements.emptyState.classList.remove("hidden");
    return;
  }

  elements.tableShell.classList.remove("hidden");
  elements.emptyState.classList.add("hidden");

  elements.transactionsBody.innerHTML = filteredTransactions
    .map(
      (transaction) => `
        <tr>
          <td>${formatDate(transaction.date)}</td>
          <td>
            <p class="transaction-title">${escapeHtml(transaction.title)}</p>
            <p class="transaction-note">${escapeHtml(transaction.account)}</p>
          </td>
          <td>${escapeHtml(transaction.category)}</td>
          <td>
            <span class="type-pill ${transaction.type}">${capitalize(transaction.type)}</span>
          </td>
          <td class="align-right amount-cell ${transaction.type}">
            ${transaction.type === "income" ? "+" : "-"}${formatCurrency(transaction.amount)}
          </td>
          <td class="align-right">
            ${
              state.role === "admin"
                ? `
                  <div class="row-actions">
                    <button class="row-button" data-action="edit" data-id="${transaction.id}" type="button">Edit</button>
                    <button class="row-button danger" data-action="delete" data-id="${transaction.id}" type="button">Delete</button>
                  </div>
                `
                : `<span class="role-pill viewer">View only</span>`
            }
          </td>
        </tr>
      `
    )
    .join("");

  if (visibleExpenses.length === 0 && filteredTransactions.length > 0) {
    elements.transactionMeta.textContent += " • No expenses in this slice";
  }
}

function renderInsights() {
  const transactions = getFilteredTransactions();
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const income = transactions.filter((transaction) => transaction.type === "income");

  if (transactions.length === 0) {
    elements.insightsCards.innerHTML = `
      <article class="insight-card">
        <p class="insight-label">Filtered View</p>
        <h3>Nothing to analyze yet</h3>
        <p class="insight-note">Adjust the transaction filters to bring data back into view.</p>
      </article>
    `;
    return;
  }

  const topCategory = getTopExpenseCategory(expenses);
  const comparison = getMonthlyComparison(transactions);
  const coverageRatio = income.length > 0 && expenses.length > 0 ? incomeSum(income) / expenseSum(expenses) : null;
  const largestExpense = expenses.slice().sort((a, b) => b.amount - a.amount)[0];

  const cards = [
    {
      label: "Highest Spending Category",
      title: topCategory
        ? `${topCategory.category} leads this view`
        : "No expense category in the current slice",
      note: topCategory
        ? `${formatCurrency(topCategory.amount)} spent across ${topCategory.count} transaction${topCategory.count === 1 ? "" : "s"}`
        : "Filter includes only income, or no expense records are available.",
    },
    {
      label: "Monthly Comparison",
      title: comparison.title,
      note: comparison.note,
    },
    {
      label: "Useful Observation",
      title: coverageRatio
        ? `Income covers expenses ${coverageRatio.toFixed(1)}x`
        : largestExpense
          ? `${largestExpense.title} is the largest outgoing payment`
          : "This view is income-only",
      note: coverageRatio
        ? `${formatCurrency(incomeSum(income) - expenseSum(expenses))} net after expenses in the filtered range`
        : largestExpense
          ? `${formatCurrency(largestExpense.amount)} spent on ${formatDate(largestExpense.date)}`
          : "Add or reveal expense transactions for a richer insight set.",
    },
  ];

  elements.insightsCards.innerHTML = cards
    .map(
      (card) => `
        <article class="insight-card">
          <p class="insight-label">${escapeHtml(card.label)}</p>
          <h3>${escapeHtml(card.title)}</h3>
          <p class="insight-note">${escapeHtml(card.note)}</p>
        </article>
      `
    )
    .join("");
}

function renderRoleBanner() {
  if (state.role === "admin") {
    elements.roleBanner.innerHTML = `
      <p class="role-copy">
        Admin mode is active. You can add, edit, delete, and persist transaction changes directly in the browser.
      </p>
      <span class="role-pill admin">Admin access</span>
    `;
    return;
  }

  elements.roleBanner.innerHTML = `
    <p class="role-copy">
      Viewer mode is active. The dashboard remains fully explorable, but transaction creation and editing are intentionally locked.
    </p>
    <span class="role-pill viewer">Viewer access</span>
  `;
}

function renderAppliedFilters() {
  const pills = [];

  if (state.filters.search) {
    pills.push(`Search: ${escapeHtml(state.filters.search)}`);
  }
  if (state.filters.type !== "all") {
    pills.push(`Type: ${capitalize(state.filters.type)}`);
  }
  if (state.filters.category !== "all") {
    pills.push(`Category: ${escapeHtml(state.filters.category)}`);
  }
  if (state.filters.month !== "all") {
    pills.push(`Month: ${formatMonthLabel(state.filters.month)}`);
  }

  elements.appliedFilters.innerHTML = pills
    .map((pill) => `<span class="filter-pill">${pill}</span>`)
    .join("");
}

function renderCategoryFilterOptions() {
  const categories = [...new Set(state.transactions.map((transaction) => transaction.category))].sort((a, b) =>
    a.localeCompare(b)
  );

  elements.categoryFilter.innerHTML = `
    <option value="all">All categories</option>
    ${categories
      .map((category) => `<option value="${escapeHtml(category)}">${category}</option>`)
      .join("")}
  `;

  if (!categories.includes(state.filters.category) && state.filters.category !== "all") {
    state.filters.category = "all";
  }
}

function renderMonthFilterOptions() {
  const months = [...new Set(state.transactions.map((transaction) => transaction.date.slice(0, 7)))].sort().reverse();

  elements.monthFilter.innerHTML = `
    <option value="all">All months</option>
    ${months
      .map((month) => `<option value="${month}">${formatMonthLabel(month)}</option>`)
      .join("")}
  `;

  if (!months.includes(state.filters.month) && state.filters.month !== "all") {
    state.filters.month = "all";
  }
}

function renderModal() {
  if (!state.modal.isOpen) {
    elements.transactionModal.classList.add("hidden");
    elements.transactionForm.reset();
    return;
  }

  elements.transactionModal.classList.remove("hidden");
  elements.modalTitle.textContent = state.modal.mode === "edit" ? "Edit Transaction" : "Add Transaction";
}

function openModal(mode, transactionId = null) {
  const editingTransaction =
    transactionId && mode === "edit"
      ? state.transactions.find((transaction) => transaction.id === transactionId)
      : null;

  if (mode === "edit" && !editingTransaction) {
    return;
  }

  state.modal = {
    isOpen: true,
    mode,
    transactionId,
  };

  elements.transactionId.value = editingTransaction?.id ?? "";
  elements.titleInput.value = editingTransaction?.title ?? "";
  elements.dateInput.value = editingTransaction?.date ?? "2026-04-22";
  elements.amountInput.value = editingTransaction?.amount ?? "";
  elements.categoryInput.value = editingTransaction?.category ?? "";
  elements.typeInput.value = editingTransaction?.type ?? "expense";
  elements.accountInput.value = editingTransaction?.account ?? "";

  renderModal();
}

function closeModal() {
  state.modal = {
    isOpen: false,
    mode: "add",
    transactionId: null,
  };
  renderModal();
}

function handleTransactionSubmit(event) {
  event.preventDefault();

  if (state.role !== "admin") {
    return;
  }

  const payload = {
    id: elements.transactionId.value || `tx-${Date.now()}`,
    title: elements.titleInput.value.trim(),
    date: elements.dateInput.value,
    amount: Number(elements.amountInput.value),
    category: elements.categoryInput.value.trim(),
    type: elements.typeInput.value,
    account: elements.accountInput.value.trim(),
  };

  if (!payload.title || !payload.date || !payload.category || !payload.account || !payload.amount) {
    return;
  }

  if (state.modal.mode === "edit") {
    state.transactions = state.transactions.map((transaction) =>
      transaction.id === payload.id ? payload : transaction
    );
  } else {
    state.transactions = [payload, ...state.transactions];
  }

  persistState();
  closeModal();
  render();
}

function deleteTransaction(transactionId) {
  const transaction = state.transactions.find((item) => item.id === transactionId);
  if (!transaction) {
    return;
  }

  const confirmed = window.confirm(`Delete "${transaction.title}" from the demo ledger?`);
  if (!confirmed) {
    return;
  }

  state.transactions = state.transactions.filter((item) => item.id !== transactionId);
  persistState();
  render();
}

function resetFilters() {
  state.filters = {
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sort: "date-desc",
  };
  persistState();
  render();
}

function getFilteredTransactions() {
  let transactions = cloneTransactions(state.transactions);

  if (state.filters.search) {
    const query = state.filters.search.toLowerCase();
    transactions = transactions.filter((transaction) =>
      [transaction.title, transaction.category, transaction.type, transaction.account].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }

  if (state.filters.type !== "all") {
    transactions = transactions.filter((transaction) => transaction.type === state.filters.type);
  }

  if (state.filters.category !== "all") {
    transactions = transactions.filter((transaction) => transaction.category === state.filters.category);
  }

  if (state.filters.month !== "all") {
    transactions = transactions.filter((transaction) => transaction.date.startsWith(state.filters.month));
  }

  transactions.sort((left, right) => {
    if (state.filters.sort === "date-asc") {
      return new Date(left.date) - new Date(right.date);
    }
    if (state.filters.sort === "amount-desc") {
      return right.amount - left.amount;
    }
    if (state.filters.sort === "amount-asc") {
      return left.amount - right.amount;
    }

    return new Date(right.date) - new Date(left.date);
  });

  return transactions;
}

function getOverviewMetrics(transactions) {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
  const income = incomeSum(incomeTransactions);
  const expenses = expenseSum(expenseTransactions);
  const net = income - expenses;
  const breakdown = getExpenseBreakdown(transactions);

  return {
    balance: STARTING_BALANCE + net,
    income,
    expenses,
    net,
    savingsRate: income === 0 ? 0 : Math.round((net / income) * 100),
    avgExpense: expenseTransactions.length === 0 ? 0 : expenses / expenseTransactions.length,
    monthCount: getMonthlyTrend(transactions).length,
    incomeCount: incomeTransactions.length,
    topExpenseCategory: breakdown[0]?.category ?? "No category yet",
  };
}

function getMonthlyTrend(transactions) {
  const grouped = new Map();

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);
    const current = grouped.get(month) ?? { income: 0, expenses: 0 };

    if (transaction.type === "income") {
      current.income += transaction.amount;
    } else {
      current.expenses += transaction.amount;
    }

    grouped.set(month, current);
  });

  let runningBalance = STARTING_BALANCE;

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, totals]) => {
      const net = totals.income - totals.expenses;
      runningBalance += net;

      return {
        month,
        shortLabel: formatMonthShort(month),
        fullLabel: formatMonthLabel(month),
        income: totals.income,
        expenses: totals.expenses,
        net,
        balance: runningBalance,
      };
    });
}

function getExpenseBreakdown(transactions) {
  const grouped = new Map();
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const total = expenseSum(expenses);

  expenses.forEach((transaction) => {
    grouped.set(transaction.category, (grouped.get(transaction.category) ?? 0) + transaction.amount);
  });

  return [...grouped.entries()]
    .sort(([, leftAmount], [, rightAmount]) => rightAmount - leftAmount)
    .map(([category, amount]) => ({
      category,
      amount,
      share: total === 0 ? 0 : Math.round((amount / total) * 100),
      color: CATEGORY_COLORS[category] ?? "#7D8A99",
    }));
}

function getTopExpenseCategory(expenses) {
  if (expenses.length === 0) {
    return null;
  }

  const grouped = new Map();
  expenses.forEach((transaction) => {
    const current = grouped.get(transaction.category) ?? { amount: 0, count: 0 };
    current.amount += transaction.amount;
    current.count += 1;
    grouped.set(transaction.category, current);
  });

  const [category, stats] = [...grouped.entries()].sort((left, right) => right[1].amount - left[1].amount)[0];
  return {
    category,
    amount: stats.amount,
    count: stats.count,
  };
}

function getMonthlyComparison(transactions) {
  const monthly = new Map();

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);
    const current = monthly.get(month) ?? { income: 0, expenses: 0 };
    if (transaction.type === "income") {
      current.income += transaction.amount;
    } else {
      current.expenses += transaction.amount;
    }
    monthly.set(month, current);
  });

  const sorted = [...monthly.entries()].sort(([left], [right]) => left.localeCompare(right));

  if (sorted.length < 2) {
    return {
      title: "Not enough monthly history",
      note: "Keep at least two months in the current filter to compare momentum.",
    };
  }

  const [previousMonth, previousTotals] = sorted.at(-2);
  const [currentMonth, currentTotals] = sorted.at(-1);
  const difference = currentTotals.expenses - previousTotals.expenses;
  const direction = difference > 0 ? "rose" : difference < 0 ? "fell" : "held steady";
  const percent =
    previousTotals.expenses === 0 ? 0 : Math.round((Math.abs(difference) / previousTotals.expenses) * 100);

  return {
    title:
      direction === "held steady"
        ? `${formatMonthShort(currentMonth)} expenses were flat`
        : `${formatMonthShort(currentMonth)} expenses ${direction} by ${formatCurrency(Math.abs(difference))}`,
    note:
      direction === "held steady"
        ? `Spending matched ${formatMonthShort(previousMonth)} almost exactly in the current view.`
        : `${percent}% change versus ${formatMonthLabel(previousMonth)}.`,
  };
}

function incomeSum(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

function expenseSum(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state.transactions, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "finance-dashboard-transactions.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "");
    if (!saved || typeof saved !== "object") {
      return defaultState();
    }

    return {
      ...defaultState(),
      ...saved,
      filters: {
        ...defaultState().filters,
        ...(saved.filters ?? {}),
      },
      modal: {
        ...defaultState().modal,
      },
      transactions:
        Array.isArray(saved.transactions) && saved.transactions.length > 0
          ? saved.transactions
          : cloneTransactions(SEED_TRANSACTIONS),
    };
  } catch (error) {
    return defaultState();
  }
}

function persistState() {
  const persistentState = {
    role: state.role,
    theme: state.theme,
    filters: state.filters,
    transactions: state.transactions,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
}

function cloneTransactions(transactions) {
  return transactions.map((transaction) => ({ ...transaction }));
}

function formatCurrency(amount, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

function formatMonthLabel(monthString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(`${monthString}-01T00:00:00`));
}

function formatMonthShort(monthString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(new Date(`${monthString}-01T00:00:00`));
}

function renderChartEmptyState(message) {
  return `
    <div class="empty-state">
      <h3>No chart data</h3>
      <p>${message}</p>
    </div>
  `;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}